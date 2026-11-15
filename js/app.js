(function(){
"use strict";

var LETTERS=["A","B","C","D"];
var app=document.getElementById("app");
var active=null;

/* Rough conversion only. Real ITP forms each have their own table. */
var SCALE={40:68,39:66,38:65,37:63,36:62,35:60,34:59,33:58,32:57,31:56,30:55,29:54,28:53,27:52,26:51,25:50,24:49,23:48,22:47,21:46,20:45,19:44,18:43,17:42,16:41,15:40,14:39,13:38,12:37,11:36,10:35,9:34,8:33,7:32,6:31};
function scaled(raw){return raw>=6?SCALE[raw]:31;}
var TARGET_RAW=27;

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function segText(t){return t.replace(/\{([A-D]):([^}]+)\}/g,function(m,l,x){return '<span class="seg"><u>'+esc(x)+'</u><b>'+l+'</b></span>';});}
function fmt(sec){var m=Math.floor(sec/60),s=sec%60;return m+":"+(s<10?"0":"")+s;}
function lessonById(id){for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].id===id)return LESSONS[i];}return null;}
function lessonByTitle(t){for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].title===t)return LESSONS[i];}return null;}
function rLessonByTitle(t){for(var i=0;i<RLESSONS.length;i++){if(RLESSONS[i].title===t)return RLESSONS[i];}return null;}
function lListenByTitle(t){for(var i=0;i<LLESSONS.length;i++){if(LLESSONS[i].title===t)return LLESSONS[i];}return null;}
var TTS=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance);
var VOICES=[];
function loadVoices(){try{VOICES=window.speechSynthesis.getVoices()||[];}catch(e){VOICES=[];}}
if(TTS){loadVoices();try{window.speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}}
function pickVoice(code){
  var en=VOICES.filter(function(v){return /^en([-_]|$)/i.test(v.lang);});
  if(!en.length)return null;
  var fem=/female|zira|samantha|karen|susan|hazel|victoria|fiona|moira|tessa|serena|google us english|google uk english female/i;
  var mal=/\bmale\b|david|daniel|alex|mark|george|fred|james|oliver|google uk english male/i;
  var f=en.filter(function(v){return fem.test(v.name);}),m=en.filter(function(v){return mal.test(v.name)&&!fem.test(v.name);});
  if(code==="F")return f[0]||en[0];
  if(code==="M")return m[0]||en[Math.min(1,en.length-1)];
  return en[0];
}
var speechToken=0;
function stopSpeech(){speechToken++;if(TTS){try{window.speechSynthesis.cancel();}catch(e){}}}
function speakLines(lines,rate,onEnd){
  if(!TTS){onEnd();return;}
  var tok=++speechToken,i=0,words=0;
  try{window.speechSynthesis.cancel();}catch(e){}
  lines.forEach(function(L){words+=L.t.split(/\s+/).length;});
  setTimeout(function(){if(tok===speechToken){stopSpeech();onEnd();}},(words*0.6/rate+lines.length*2+10)*1000);
  function next(){
    if(tok!==speechToken)return;
    if(i>=lines.length){speechToken++;onEnd();return;}
    var L=lines[i++],u=new SpeechSynthesisUtterance(L.t),v=pickVoice(L.v);
    if(v){u.voice=v;u.lang=v.lang;}else{u.lang="en-US";}
    u.rate=rate;u.pitch=L.v==="M"?0.8:(L.v==="F"?1.12:1);
    u.onend=function(){setTimeout(next,250);};
    u.onerror=function(){setTimeout(next,0);};
    try{window.speechSynthesis.speak(u);}catch(e){next();}
  }
  next();
}
var WHO={M:"Man",F:"Woman",S:"Speaker",N:"Question"};
function scriptHtml(S,q){
  var h='<div class="script">';
  for(var i=0;i<S.lines.length;i++){h+='<p><b>'+WHO[S.lines[i].v]+':</b> '+esc(S.lines[i].t)+'</p>';}
  if(S.kind==="short"&&q)h+='<p><b>Question:</b> '+esc(q.stem)+'</p>';
  return h+'</div>';
}
function lessonLink(id){var l=lessonById(id);return '<a href="#lesson-'+id+'">'+esc(l.title)+'</a>';}
function prepare(qs){
  return qs.map(function(q){
    var c={};for(var k in q)c[k]=q[k];
    if(q.part==="A"||q.part==="R"||q.part==="L"){
      var order=[0,1,2,3];
      for(var i=3;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=order[i];order[i]=order[j];order[j]=t;}
      c.opts=order.map(function(o){return q.opts[o];});
      c.ans=order.indexOf(q.ans);
    }
    return c;
  });
}

/* ---------- quiz engine ---------- */
function mountQuiz(host,qsRaw,o){
  var qs=prepare(qsRaw);
  var st={idx:0,ans:qs.map(function(){return null;}),left:o.timerSec||0,tick:null,confirmed:false,played:{},playingSid:null,rate:1};
  var api={qs:qs,st:st,destroy:function(){if(st.tick){clearInterval(st.tick);st.tick=null;}if(o.stimuli)stopSpeech();}};
  function audioPanel(q){
    if(q.part!=="L"||!o.stimuli)return "";
    var S=o.stimuli[q.sid],playing=st.playingSid===q.sid,done=!!st.played[q.sid];
    var locked=o.instant&&st.ans[st.idx]!==null;
    var label,disabled=false,msg="";
    if(!TTS){label="Audio not available";disabled=true;msg="Audio is not available in this browser. Read the script below, or ask someone to read it aloud.";}
    else if(playing){label=o.instant?"Stop":"Playing...";disabled=!o.instant;}
    else if(done&&!o.instant){label="Played";disabled=true;msg="Played once, like the real test.";}
    else{label=done?"Play again":"Play audio";}
    var h='<div class="audio"><div class="atitle">'+esc(S.title)+'</div><button id="play" class="primary"'+(disabled?" disabled":"")+'>'+(label==="Play audio"||label==="Play again"?"&#9654; ":"")+label+'</button> ';
    h+='<label class="note">Speed <select id="rate"><option value="0.85"'+(st.rate===0.85?" selected":"")+'>Slower</option><option value="1"'+(st.rate===1?" selected":"")+'>Normal</option><option value="1.15"'+(st.rate===1.15?" selected":"")+'>Faster</option></select></label>';
    if(msg)h+=' <span class="note">'+msg+'</span>';
    if(S.kind==="short"&&o.instant)h+='<div class="note">The question is also spoken at the end of the audio.</div>';
    if(o.instant||!TTS)h+='<details class="scriptbox"'+((locked||!TTS)?" open":"")+'><summary>'+(locked?"Script":"Audio not working? Show the script")+'</summary>'+scriptHtml(S,q)+'</details>';
    return h+'</div>';
  }
  function playStim(q){
    var S=o.stimuli[q.sid];
    if(st.playingSid===q.sid){stopSpeech();st.playingSid=null;render();return;}
    var lines=S.lines.slice();if(S.kind==="short")lines.push({v:"N",t:q.stem});
    st.played[q.sid]=true;st.playingSid=q.sid;
    speakLines(lines,st.rate,function(){if(st.playingSid===q.sid)st.playingSid=null;render();});
    render();
  }
  function answered(){var c=0;for(var k=0;k<st.ans.length;k++){if(st.ans[k]!==null)c++;}return c;}

  function render(){
    var q=qs[st.idx],i=st.idx,sel=st.ans[i],instant=!!o.instant,locked=instant&&sel!==null;
    if(st.playingSid!==null&&q.sid!==st.playingSid){stopSpeech();st.playingSid=null;}
    var plab=q.part==="R"?("Passage "+(q.pid+1)+" of "+o.passages.length):(q.part==="L"?"Listening":("Part "+q.part));
    var h='<div class="topbar"><div><span class="pill">'+(o.label||"")+'</span> <span class="pill">'+plab+'</span></div>';
    h+=instant?'<span class="pill">'+answered()+' / '+qs.length+' answered</span>':'<span class="pill timer" id="tm" role="timer">'+fmt(st.left)+'</span>';
    h+='</div><div class="nav" role="group" aria-label="Question navigator">';
    for(var k=0;k<qs.length;k++){
      var c=(k===i?"cur ":"");
      if(st.ans[k]!==null){c+=instant?(st.ans[k]===qs[k].ans?"ok":"no"):"ans";}
      h+='<button class="'+c+'" data-k="'+k+'" aria-label="Question '+(k+1)+'">'+(k+1)+'</button>';
    }
    h+='</div>';
    var pre="";
    if(q.pid!==undefined&&o.passages){
      var PP=o.passages[q.pid];
      pre='<details class="ptxt" open><summary>'+esc(PP.title)+'</summary>'+PP.paras.map(function(t,n){return '<p><span class="pn">'+(n+1)+'</span> '+esc(t).replace(/\[\[(.+?)\]\]/g,"<b>$1</b>")+'</p>';}).join("")+'</details>';
      h+='<div class="rwrap">'+pre+'<div>';
    }
    h+='<div class="card">';
    if(o.directions){
      if(i===0||qs[i-1].part!==q.part){
        h+='<div class="directions">'+(o.dirText?o.dirText:q.part==="A"?'<b>Part A.</b> Choose the word or phrase that best completes the sentence.':'<b>Part B.</b> Each sentence has four underlined parts, marked A to D. Choose the one part that must be changed to make the sentence correct.')+'</div>';
      }
    }
    h+=audioPanel(q)+'<div class="qnum">Question '+(i+1)+' of '+qs.length+'</div>';
    var j;
    if(q.part!=="B"){
      h+='<p class="stem">'+esc(q.stem)+'</p><div class="opts">';
      for(j=0;j<4;j++){
        var cl="opt";
        if(locked){if(j===q.ans)cl+=" ok";else if(j===sel)cl+=" no";}else if(j===sel){cl+=" sel";}
        h+='<button class="'+cl+'" data-o="'+j+'"'+(locked?" disabled":"")+'><span class="l">'+LETTERS[j]+'</span><span>'+esc(q.opts[j])+'</span></button>';
      }
      h+='</div>';
    }else{
      h+='<p class="stem">'+segText(q.text)+'</p><div class="optsB" role="group" aria-label="Choose the part with the mistake">';
      for(j=0;j<4;j++){
        var cl2="opt";
        if(locked){if(j===q.ans)cl2+=" ok";else if(j===sel)cl2+=" no";}else if(j===sel){cl2+=" sel";}
        h+='<button class="'+cl2+'" data-o="'+j+'"'+(locked?" disabled":"")+'><span class="l">'+LETTERS[j]+'</span></button>';
      }
      h+='</div>';
    }
    if(locked){
      var good=sel===q.ans;
      h+='<div class="fb '+(good?"ok":"no")+'" aria-live="polite"><b>'+(good?"Correct.":"Not quite. The answer is "+LETTERS[q.ans]+".")+'</b> '+esc(q.why);
      if(q.fix)h+='<div class="fix"><b>Correct sentence:</b> '+esc(q.fix)+'</div>';
      if(o.lessonLinks&&!good){var L=(q.part==="R"?rLessonByTitle:(q.part==="L"?lListenByTitle:lessonByTitle))(q.topic);if(L)h+='<a class="more" href="#'+(q.part==="R"?"rlesson-":(q.part==="L"?"llesson-":"lesson-"))+L.id+'">Study this: '+esc(L.title)+'</a>';}
      h+='</div>';
    }
    h+='<div class="actions"><button id="prev"'+(i===0?" disabled":"")+'>Back</button>';
    if(i<qs.length-1)h+='<button id="next" class="primary">Next</button>';
    else h+='<button id="fin" class="primary">Finish and see results</button>';
    h+='</div></div>';
    if(pre)h+='</div></div>';
    if(!instant&&i===qs.length-1)h+='<p class="note">Unanswered questions count as wrong. You can go back and change any answer before you finish.</p>';
    host.innerHTML=h;

    var navs=host.querySelectorAll(".nav button");
    for(var n=0;n<navs.length;n++){navs[n].onclick=function(){st.idx=+this.getAttribute("data-k");st.confirmed=false;render();};}
    var ops=host.querySelectorAll("[data-o]");
    for(var p=0;p<ops.length;p++){ops[p].onclick=function(){st.ans[st.idx]=+this.getAttribute("data-o");render();};}
    var pb=host.querySelector("#play");if(pb)pb.onclick=function(){playStim(qs[st.idx]);};
    var rt=host.querySelector("#rate");if(rt)rt.onchange=function(){st.rate=parseFloat(this.value);};
    var pv=host.querySelector("#prev");if(pv)pv.onclick=function(){st.idx--;st.confirmed=false;render();};
    var nx=host.querySelector("#next");if(nx)nx.onclick=function(){st.idx++;st.confirmed=false;render();};
    var fn=host.querySelector("#fin");if(fn)fn.onclick=function(){
      var un=qs.length-answered();
      if(un>0&&!st.confirmed){st.confirmed=true;this.textContent=un+" unanswered. Click again to finish";return;}
      finish();
    };
  }

  function finish(){
    api.destroy();
    var raw=0;for(var k=0;k<qs.length;k++){if(st.ans[k]===qs[k].ans)raw++;}
    o.onDone({qs:qs,ans:st.ans,raw:raw,left:st.left});
  }

  if(o.timerSec){
    st.tick=setInterval(function(){
      st.left--;
      var el=document.getElementById("tm");
      if(el){el.textContent=fmt(Math.max(st.left,0));el.classList.toggle("low",st.left<=300);}
      if(st.left<=0)finish();
    },1000);
  }
  render();
  return api;
}

/* ---------- pages ---------- */
function setNav(r){
  var links=document.querySelectorAll("#nav a");
  var key=r==="mock"?"mock":r.indexOf("rlesson-")===0||r==="rtest"||r==="rtest-hard"?"reading":(r.indexOf("llesson-")===0||r==="ltest"||r==="ltest-hard"?"listening":(r.indexOf("lesson-")===0?"lessons":(r==="test-hard"||r==="test"?"lessons":r)));
  for(var i=0;i<links.length;i++){links[i].classList.toggle("on",links[i].getAttribute("data-r")===key);}
}

function pageHome(){
  function sec(cls,title,blurb,rows){
    var h='<div class="card"><h2 style="margin-top:0">'+title+'</h2><p class="note" style="margin-top:0">'+blurb+'</p><div class="hrows">';
    rows.forEach(function(r){h+='<a class="hrow" href="'+r[0]+'"><span class="hstep">'+r[1]+'</span><span><b>'+r[2]+'</b><br><small>'+r[3]+'</small></span></a>';});
    return h+'</div></div>';
  }
  app.innerHTML=
  '<div class="card hero"><h1>Get ready for the TOEFL ITP</h1>'+
  '<p>Plain-English lessons and practice for all three sections. You do not need to do everything. Follow the steps below.</p>'+
  '<ol class="steps"><li><b>Find your level.</b> Take the <a href="#mock">full mock test</a> (about 2 hours), or one Test 1 below.</li>'+
  '<li><b>Study your weakest section.</b> Do its lessons, then retake its Test 1.</li>'+
  '<li><b>Stretch.</b> When you score near 520, try the Harder tests.</li></ol>'+
  '<p><a class="btn primary" href="#mock">Start the full mock test</a> <a class="btn" href="#plan">See the 6-week study plan</a></p></div>'+
  '<div class="grid3">'+
  sec("s","Structure","Grammar. 40 questions, 25 minutes.",[["#lessons","Learn","14 lessons","Short lessons with practice questions"],["#test","Test","Test 1","40 questions. Standard level"],["#test-hard","Test","Harder Test","40 questions. About 520 to 600 level"]])+
  sec("r","Reading","Five passages. 50 questions, 55 minutes.",[["#reading","Learn","6 lessons","Main idea, details, vocabulary, reference, purpose, inference"],["#rtest","Test","Test 1","50 questions. Standard level"],["#rtest-hard","Test","Harder Test","50 questions. About 520 to 600 level"]])+
  sec("l","Listening","Audio. 50 questions, 35 minutes.",[["#listening","Learn","5 lessons","Short conversations, idioms, plans, talks"],["#ltest","Test","Test 1","50 questions. Standard level"],["#ltest-hard","Test","Harder Test","50 questions. About 520 to 600 level"]])+
  '</div>'+
  '<div class="card"><h2 style="margin-top:0">Whole test and extras</h2><div class="hrows">'+
  '<a class="hrow" href="#mock"><span class="hstep">Test</span><span><b>Full mock test</b><br><small>All three sections with a combined score. Choose Standard or Harder.</small></span></a>'+
  '<a class="hrow" href="#plan"><span class="hstep">Plan</span><span><b>Study plan</b><br><small>Six weeks for a student at about 450 aiming for 520</small></span></a>'+
  '<a class="hrow" href="#tips"><span class="hstep">Help</span><span><b>Structure tips</b><br><small>How to work through Part A and Part B quickly</small></span></a>'+
  '<a class="hrow" href="#words"><span class="hstep">Help</span><span><b>Word help</b><br><small>Plain meanings for words like verb, noun and subject</small></span></a></div>'+
  '<p class="note">Listening audio is read aloud by your device\'s built-in voice, so it sounds different on every device.</p></div>';
}

function pagePlan(){
  var wk=[
    ["Week 1","Take <a href=\"#test\">Structure Test 1</a> and <a href=\"#rtest\">Reading Test 1</a> in practice mode to see where you are. Then: "+lessonLink("agreement")+", "+lessonLink("tenses")+", "+lessonLink("wordforms")+"."],
    ["Week 2",lessonLink("counting")+", "+lessonLink("linking")+", "+lessonLink("compare")+"."],
    ["Week 3",lessonLink("ifsent")+", "+lessonLink("ingto")+", "+lessonLink("who")+"."],
    ["Week 4",lessonLink("lists")+", "+lessonLink("embedded")+", "+lessonLink("suggest")+"."],
    ["Week 5",lessonLink("flip")+", "+lessonLink("opening")+". Then retake <a href=\"#test\">Test 1</a> in timed mode."],
    ["Week 6","Go back to the lessons that your results page marked as weakest. Redo their practice questions. Then take the <a href=\"#mock\">full mock test</a> to see your combined score. When you are scoring near 520, try the <a href=\"#test-hard\">Structure</a>, <a href=\"#rtest-hard\">Reading</a> and <a href=\"#ltest-hard\">Listening</a> harder tests, or the mock test at Harder level."]
  ];
  var h='<h1>Study plan: from about 450 to 520</h1><p class="sub">Six weeks, about 30 to 40 minutes a day. Adjust it to your own schedule.</p>';
  h+='<div class="card"><h2>What you are aiming for</h2><p>A 520 total means about 52 on each of the three sections. On this site\'s Structure test that is roughly <b>27 out of 40</b>, on the Reading test roughly <b>29 out of 50</b>, and on the Listening test roughly <b>29 out of 50</b>. A student around 450 usually scores near 20 on each, so you are looking for about 7 to 9 more correct answers per test.</p>'+
     '<p class="note">These numbers are rough guides, not exact predictions. Real tests use their own score tables.</p></div>';
  h+='<div class="card"><h2>Each study session</h2><ol class="steps">'+
     '<li><b>10 minutes: read one lesson.</b> Read the idea and the examples. Say the correct sentences out loud.</li>'+
     '<li><b>10 to 15 minutes: do the practice.</b> Read the feedback for every question, even the ones you got right.</li>'+
     '<li><b>10 minutes: write it down.</b> Pick the two mistakes that surprised you. Write each rule in your own words, with your own example sentence.</li></ol></div>';
  h+='<div class="card"><h2>Week by week: Structure</h2>';
  for(var i=0;i<wk.length;i++){h+='<div class="wk"><b>'+wk[i][0]+'</b><div>'+wk[i][1]+'</div></div>';}
  h+='</div>';
  h+='<div class="card"><h2>Week by week: Reading</h2><p class="note" style="margin-top:0">Add 15 to 20 minutes on the same days.</p>';
  var rk=[["Weeks 1 and 2","Do "+'<a href=\"#rlesson-main\">Finding the main idea</a>, <a href=\"#rlesson-detail\">Finding details</a> and <a href=\"#rlesson-vocab\">Words in context</a>.'],
          ["Weeks 3 and 4","Do "+'<a href=\"#rlesson-ref\">What does it refer to?</a>, <a href=\"#rlesson-purpose\">Why did the author say that?</a> and <a href=\"#rlesson-infer\">Reading between the lines</a>.'],
          ["Weeks 5 and 6","Take <a href=\"#rtest\">Reading Test 1</a> timed, then review each wrong answer. Outside this site, read one short article every day and say its main idea in one sentence."]];
  for(var j=0;j<rk.length;j++){h+='<div class="wk"><b>'+rk[j][0]+'</b><div>'+rk[j][1]+'</div></div>';}
  h+='</div>';
  h+='<div class="card"><h2>Week by week: Listening</h2><p class="note" style="margin-top:0">Add 15 to 20 minutes on the same days.</p>';
  var lk=[["Weeks 1 and 2","Do "+'<a href=\"#llesson-short\">Short conversations</a>, <a href=\"#llesson-patterns\">Agreement and negatives</a> and <a href=\"#llesson-idioms\">Idioms</a>.'],
          ["Weeks 3 and 4","Do "+'<a href=\"#llesson-plans\">Suggestions and plans</a> and <a href=\"#llesson-long\">Longer conversations and talks</a>.'],
          ["Weeks 5 and 6","Take <a href=\"#ltest\">Listening Test 1</a> timed, then read the script for every wrong answer. Outside this site, listen to English for 20 minutes a day (a podcast or lecture with a transcript is ideal)."]];
  for(var q2=0;q2<lk.length;q2++){h+='<div class="wk"><b>'+lk[q2][0]+'</b><div>'+lk[q2][1]+'</div></div>';}
  h+='</div>';
  app.innerHTML=h;
}

function pageTips(){
  app.innerHTML=
  '<h1>Test tips for Structure &amp; Written Expression</h1><p class="sub">Small habits that save time and points.</p>'+
  '<div class="card"><h2>Part A: complete the sentence</h2><ol class="steps">'+
  '<li><b>Read the whole sentence first.</b> Don\'t look at the options yet.</li>'+
  '<li><b>Ask what is missing.</b> A subject? A verb? A linking word? A form like -ing or to + verb?</li>'+
  '<li><b>Cross out options that are clearly wrong.</b> Look at the first and last word of each. Many options can be removed in a few seconds.</li>'+
  '<li><b>Read your answer in the sentence.</b> If it sounds odd, check the lesson topics in this site again.</li></ol></div>'+
  '<div class="card"><h2>Part B: find the mistake</h2><ol class="steps">'+
  '<li><b>Find the subject and the main verb first.</b> Check that they match.</li>'+
  '<li><b>Look at small words.</b> Mistakes often hide in words like a, the, of, to, for, since, and in word endings (-s, -ed, -ing, -ly).</li>'+
  '<li><b>Check the lists and comparisons.</b> Do the items in a list match? Are two like things being compared?</li>'+
  '<li><b>Only one part is wrong.</b> If two seem wrong, one of them is probably correct in a way you have not seen yet. Read it again.</li></ol></div>'+
  '<div class="card"><h2>Time and guessing</h2><ul class="plain">'+
  '<li>You have about <b>37 seconds</b> per question. If one takes more than a minute, guess and move on.</li>'+
  '<li>Your score is based on the number you get right, so <b>never leave a question blank</b>.</li>'+
  '<li>Part A is usually faster than Part B. Try to finish Part A in about 8 minutes to leave more time for Part B.</li>'+
  '<li>Part B mistakes usually fall into a handful of types. The 14 lessons on this site cover the most common ones.</li></ul></div>';
}

function pageWords(){
  var d=[
    ["Subject","The person or thing that does the action. In 'The teacher is here', the subject is <i>the teacher</i>."],
    ["Verb","A word for an action or state: <i>run, is, have, decided</i>."],
    ["Plain verb","The simple form with no ending: <i>go, take, attend</i> (not goes, took, attending)."],
    ["Helper verb","A small verb that goes with another verb: <i>have, has, had, do, did, will, would, can</i>. In 'Have you seen it?', <i>have</i> is the helper."],
    ["Noun","A person, place, thing or idea: <i>student, Bangkok, information</i>."],
    ["Describing word (adjective)","Tells us about a noun: <i>a quick answer, a large number</i>."],
    ["-ly word (adverb)","Usually tells us how something is done: <i>She spoke quickly.</i>"],
    ["Preposition","A small word that links a noun to the rest of the sentence: <i>in, on, at, of, for, since, despite</i>."],
    ["Pronoun","A word that stands for a noun: <i>he, she, it, they, them, which, who</i>."],
    ["Full sentence","A group of words with a subject and a verb: <i>It rained.</i> Compare 'the rain', which is not a full sentence."],
    ["-ing form","The verb with -ing on the end: <i>reading, swimming, meeting</i>."],
    ["Singular / plural","Singular means one. Plural means more than one. <i>student</i> is singular and <i>students</i> is plural."]
  ];
  var h='<h1>Word help</h1><p class="sub">The few grammar words used on this site, in plain English.</p><div class="card"><dl class="words">';
  for(var i=0;i<d.length;i++){h+='<dt>'+d[i][0]+'</dt><dd>'+d[i][1]+'</dd>';}
  h+='</dl></div>';
  app.innerHTML=h;
}

function pageLessons(){
  var groups=[[1,"Start here","Common patterns that appear on almost every test."],[2,"Build up","Patterns that need a bit more care."],[3,"Challenge","Trickier patterns. These matter most if you want to go above 520."]];
  var h='<h1>Structure lessons</h1><p class="sub">14 short lessons. Each has the idea, examples, traps to avoid, and 4 practice questions.</p><p><a class="btn primary" href="#test">Structure Test 1</a> <a class="btn" href="#test-hard">Structure Harder Test</a> <a class="btn" href="#tips">Tips</a></p>';
  for(var g=0;g<groups.length;g++){
    h+='<h2 style="margin-top:22px">'+groups[g][1]+'</h2><p class="note" style="margin-top:0">'+groups[g][2]+'</p><div class="grid">';
    for(var i=0;i<LESSONS.length;i++){
      var L=LESSONS[i];if(L.level!==groups[g][0])continue;
      h+='<a class="tile" href="#lesson-'+L.id+'"><span class="lvl">Lesson '+(i+1)+'</span><b>'+esc(L.title)+'</b><span>'+esc(L.blurb)+'</span></a>';
    }
    h+='</div>';
  }
  app.innerHTML=h;
}

function exHtml(arr,cls,mark,label){
  var h="";
  for(var i=0;i<arr.length;i++){h+='<div class="ex '+cls+'"><span class="mark" aria-label="'+label+'">'+mark+'</span>'+arr[i]+'</div>';}
  return h;
}

function pageLesson(id){
  var idx=-1;for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].id===id)idx=i;}
  if(idx<0){pageLessons();return;}
  var L=LESSONS[idx];
  var h='<div class="crumbs"><a href="#lessons">&larr; All lessons</a></div>';
  h+='<span class="lvl">Lesson '+(idx+1)+' of '+LESSONS.length+'</span><h1>'+esc(L.title)+'</h1><p class="sub">'+esc(L.blurb)+'</p>';
  h+='<div class="card"><h2>The idea</h2><p>'+L.idea+'</p>';
  for(var p=0;p<L.patterns.length;p++){
    var P=L.patterns[p];
    h+='<div class="pattern"><div class="rule">'+P.rule+'</div>'+exHtml(P.good,"g","&#10003;","Correct")+exHtml(P.bad,"b","&#10007;","Wrong")+'</div>';
  }
  h+='</div>';
  h+='<div class="callout warn"><b>Watch out:</b><ul class="plain">';
  for(var t=0;t<L.traps.length;t++)h+='<li>'+L.traps[t]+'</li>';
  h+='</ul></div><div class="callout tip"><b>Test tip:</b> '+L.tip+'</div>';
  h+='<div class="card"><h2>Practice</h2><p class="note" style="margin-top:0">Pick an answer to see feedback straight away.</p><div id="qz"></div></div>';
  h+='<div class="actions">';
  h+=idx>0?'<a class="btn" href="#lesson-'+LESSONS[idx-1].id+'">&larr; '+esc(LESSONS[idx-1].title)+'</a>':'<span></span>';
  h+=idx<LESSONS.length-1?'<a class="btn primary" href="#lesson-'+LESSONS[idx+1].id+'">'+esc(LESSONS[idx+1].title)+' &rarr;</a>':'<a class="btn primary" href="#test">Take Test 1 &rarr;</a>';
  h+='</div>';
  app.innerHTML=h;

  var host=document.getElementById("qz");
  function start(){
    active=mountQuiz(host,L.practice,{instant:true,label:"Practice",onDone:function(res){
      var m=res.raw===res.qs.length?"Perfect. You are ready for the next lesson.":(res.raw>=res.qs.length-1?"Nearly there. Re-read the questions you missed.":"Worth another look. Read the idea and examples again, then retry.");
      host.innerHTML='<div class="row"><div><div class="big">'+res.raw+' / '+res.qs.length+'</div><small>correct</small></div></div><p>'+m+'</p><p><button id="retry" class="primary">Try again</button></p>';
      document.getElementById("retry").onclick=start;
    }});
  }
  start();
}

function pageTest(hard){
  app.innerHTML=
  '<h1>'+(hard?"Harder Test":"Test 1")+': Structure &amp; Written Expression</h1><p class="sub">40 questions: 15 in Part A and 25 in Part B'+(hard?" &middot; about 520 to 600 level":"")+'</p>'+
  '<div class="card"><p><b>Goal for a 520 total:</b> '+(hard?"about 24 out of 40 on this harder form. It is built to be harder than the real test, so a smaller number is still a good result.":"about 27 out of 40. A student around 450 usually scores near 20.")+'</p>'+
  '<p>Choose how you want to take it. At the end, you get a list of grammar areas with links to the lessons that will help most.</p>'+
  '<div class="modes"><button class="mode" id="m1"><b>Practice mode</b><span>No timer. You see the answer and a simple explanation after each question.</span></button>'+
  '<button class="mode primary" id="m2"><b>Timed test mode</b><span>25-minute countdown. Feedback and score only at the end.</span></button></div></div>'+
  '<p class="note">The score estimate is a rough guide. Real tests use their own conversion tables, and the three sections are combined for the total.</p><div id="qz"></div>';
  document.getElementById("m1").onclick=function(){run(true);};
  document.getElementById("m2").onclick=function(){run(false);};

  function run(instant){
    if(active){active.destroy();active=null;}
    var host=document.getElementById("qz");
    document.querySelector(".card").style.display="none";var nt=document.querySelector("#app > p.note");if(nt)nt.style.display="none";
    window.scrollTo(0,0);
    active=mountQuiz(host,hard?TEST_H:TEST1,{instant:instant,timerSec:instant?0:25*60,label:instant?"Practice":"Timed test",directions:true,lessonLinks:true,onDone:function(res){results(host,res,instant,hard?STRUCT_CFG_H:STRUCT_CFG);}});
  }
}

var STRUCT_CFG={name:"Structure & Written Expression, Test 1",total:40,target:TARGET_RAW,scale:scaled,parts:true,find:lessonByTitle,prefix:"#lesson-",minutes:25};
var READ_CFG={name:"Reading Comprehension, Test 1",total:50,target:29,scale:function(r){return Math.round(31+r*0.74);},parts:false,find:rLessonByTitle,prefix:"#rlesson-",minutes:55};

var STRUCT_CFG_H={name:"Structure & Written Expression, Harder Test",total:40,target:TARGET_RAW-3,scale:function(r){return scaled(Math.min(40,r+3));},parts:true,find:lessonByTitle,prefix:"#lesson-",minutes:25};
var READ_CFG_H={name:"Reading Comprehension, Harder Test",total:50,target:26,scale:function(r){return Math.min(68,Math.round(31+(r+3)*0.74));},parts:false,find:rLessonByTitle,prefix:"#rlesson-",minutes:55};
var LISTEN_CFG={name:"Listening Comprehension, Test 1",total:50,target:29,scale:function(r){return Math.round(31+r*0.74);},parts:false,find:lListenByTitle,prefix:"#llesson-",minutes:35,stimuli:LSTIM};
var LISTEN_CFG_H={name:"Listening Comprehension, Harder Test",total:50,target:26,scale:function(r){return Math.min(68,Math.round(31+(r+3)*0.74));},parts:false,find:lListenByTitle,prefix:"#llesson-",minutes:35,stimuli:LSTIM_H};

function results(host,res,instant,cfg){
  var qs=res.qs,ans=res.ans,raw=res.raw,rawA=0,rawB=0,topics={},k;
  for(k=0;k<qs.length;k++){
    var ok=ans[k]===qs[k].ans;
    if(ok){if(qs[k].part==="A")rawA++;else if(qs[k].part==="B")rawB++;}
    var t=qs[k].topic;if(!topics[t])topics[t]={ok:0,n:0};
    topics[t].n++;if(ok)topics[t].ok++;
  }
  var gap=cfg.target-raw;
  var h='<h1>Your results</h1><p class="sub">'+esc(cfg.name)+'</p>';
  h+='<div class="card"><div class="row"><div><div class="big">'+raw+' / '+cfg.total+'</div><small>correct</small></div>'+
     '<div><div class="big">~'+cfg.scale(raw)+'</div><small>rough section score (31 to 68)</small></div>'+
     (cfg.parts?'<div><div class="big">'+rawA+'/15 &middot; '+rawB+'/25</div><small>Part A &middot; Part B</small></div>':'')+'</div>'+
     '<div class="bar '+(raw>=cfg.target?"good":"")+'"><i style="width:'+Math.round(raw/cfg.total*100)+'%"></i></div>';
  if(gap<=0)h+='<p><b>You reached the target.</b> '+raw+' correct is at or above the roughly '+cfg.target+' needed for a 52 on this section. Try the timed test again to check it holds under pressure.</p>';
  else h+='<p><b>'+gap+' more correct answer'+(gap===1?"":"s")+'</b> would reach the roughly '+cfg.target+' needed for a 52. The list below shows where those points are.</p>';
  h+='<p class="note">'+(instant?"Untimed practice.":"Time used: "+fmt(cfg.minutes*60-Math.max(res.left,0))+".")+' This is a rough estimate only.</p></div>';

  var arr=[];for(var key in topics)arr.push({name:key,ok:topics[key].ok,n:topics[key].n});
  arr.sort(function(a,b){return (a.ok/a.n)-(b.ok/b.n)||b.n-a.n;});
  h+='<div class="card"><h2>Where to study next</h2><p class="note" style="margin-top:0">Weakest first.</p>';
  for(var a=0;a<arr.length;a++){
    var pc=Math.round(arr[a].ok/arr[a].n*100),L=cfg.find(arr[a].name);
    h+='<div class="topic"><span>'+esc(arr[a].name)+'</span><div class="bar '+(pc>=75?"good":(pc<50?"bad":""))+'"><i style="width:'+pc+'%"></i></div><span>'+arr[a].ok+'/'+arr[a].n+'</span>'+(L?'<a href="'+cfg.prefix+L.id+'">Lesson</a>':'<span></span>')+'</div>';
  }
  h+='</div><div class="card"><h2>Every question, with feedback</h2><p><button id="onlyWrong">Show only wrong answers</button></p><div id="rev"></div></div>'+
     '<div class="actions"><a class="btn" href="#plan">Study plan</a><button id="again" class="primary">Take the test again</button></div>';
  host.innerHTML=h;

  var wrongOnly=false;
  function draw(){
    var r="";
    for(var i=0;i<qs.length;i++){
      var q=qs[i],mine=ans[i],good=mine===q.ans;
      if(wrongOnly&&good)continue;
      r+='<div class="rev"><div class="qnum">Question '+(i+1)+' &middot; '+(q.part==="R"?"Passage "+(q.pid+1):(q.part==="L"?(cfg.stimuli?esc(cfg.stimuli[q.sid].title):"Listening"):"Part "+q.part))+' &middot; '+esc(q.topic)+' &middot; <span class="'+(good?"taggood":"tagbad")+'">'+(good?"Correct":(mine===null?"Not answered":"Incorrect"))+'</span></div>';
      if(q.part==="B")r+='<div class="stem" style="font-size:1.05rem;margin:0">'+segText(q.text)+'</div>';
      else r+='<div>'+esc(q.stem)+'</div><div class="note">'+q.opts.map(function(o,n){return LETTERS[n]+") "+esc(o);}).join(" &nbsp; ")+'</div>';
      if(q.part==="L"&&cfg.stimuli)r+='<details class="scriptbox"><summary>Script</summary>'+scriptHtml(cfg.stimuli[q.sid],q)+'</details>';
      r+='<div style="margin-top:6px">Your answer: <b>'+(mine===null?"none":LETTERS[mine])+'</b> &middot; Correct answer: <b>'+LETTERS[q.ans]+'</b></div>';
      r+='<div class="fb '+(good?"ok":"no")+'">'+esc(q.why)+(q.fix?'<div class="fix"><b>Correct sentence:</b> '+esc(q.fix)+'</div>':'');
      var LL=cfg.find(q.topic);if(LL&&!good)r+='<a class="more" href="'+cfg.prefix+LL.id+'">Study this: '+esc(LL.title)+'</a>';
      r+='</div></div>';
    }
    if(!r)r="<p>No wrong answers to show. Well done.</p>";
    document.getElementById("rev").innerHTML=r;
  }
  draw();
  document.getElementById("onlyWrong").onclick=function(){wrongOnly=!wrongOnly;this.textContent=wrongOnly?"Show all questions":"Show only wrong answers";draw();};
  document.getElementById("again").onclick=function(){route();};
  if(cfg.back){var ag=document.getElementById("again");ag.textContent="Back to mock summary";ag.onclick=cfg.back;}
  window.scrollTo(0,0);
}

/* ---------- reading pages ---------- */
function pageReading(){
  var h='<h1>Reading Comprehension</h1><p class="sub">Five passages, 50 questions, 55 minutes on the real test. Learn the six question types, then try a full practice test.</p>';
  h+='<div class="card"><h2>Reading lessons</h2><p class="note" style="margin-top:0">Each has the idea, the steps, the traps, a short passage and 3 practice questions.</p><div class="grid">';
  for(var i=0;i<RLESSONS.length;i++){var L=RLESSONS[i];h+='<a class="tile" href="#rlesson-'+L.id+'"><span class="lvl">Lesson '+(i+1)+'</span><b>'+esc(L.title)+'</b><span>'+esc(L.blurb)+'</span></a>';}
  h+='</div></div>';
  h+='<div class="card"><h2>Reading Test 1</h2><p>Five original passages with 10 questions each, in the style of the real test. The passage stays next to each question.</p><p><a class="btn primary" href="#rtest">Take Reading Test 1</a></p></div>';
  h+='<div class="card"><h2>Reading Harder Test</h2><p>Five new, more abstract passages (about 520 to 600 level). Take it when you can reach about 29 out of 50 on Test 1.</p><p><a class="btn primary" href="#rtest-hard">Take the Harder Test</a></p></div>';
  h+='<div class="card"><h2>Tips for the Reading section</h2><ol class="steps">'+
     '<li><b>Plan your time.</b> You have 55 minutes for 5 passages, about 11 minutes each. Spend about 3 minutes reading and 8 minutes on the 10 questions.</li>'+
     '<li><b>Skim first.</b> Read the first sentence of each paragraph before you read everything. This gives you the plan of the passage.</li>'+
     '<li><b>Go in order.</b> Questions usually follow the order of the passage, so you can answer as you read.</li>'+
     '<li><b>Go back to the passage.</b> For detail, vocabulary and reference questions, find the sentence again and read around it.</li>'+
     '<li><b>Use the words you know.</b> Marked words in vocabulary and reference questions can be solved from the sentence around them.</li>'+
     '<li><b>Never leave a blank.</b> Your score is based on the number you get right. If you are stuck, guess and move on.</li></ol></div>';
  app.innerHTML=h;
}

function skillLesson(c,id){
  var idx=-1;for(var i=0;i<c.list.length;i++){if(c.list[i].id===id)idx=i;}
  if(idx<0){c.hubPage();return;}
  var L=c.list[idx];
  var h='<div class="crumbs"><a href="#'+c.hub+'">&larr; '+c.hubLabel+'</a></div><span class="lvl">'+c.word+' lesson '+(idx+1)+' of '+c.list.length+'</span><h1>'+esc(L.title)+'</h1><p class="sub">'+esc(L.blurb)+'</p>';
  h+='<div class="card"><h2>The idea</h2><p>'+L.idea+'</p><h3>What to do</h3><ol class="steps">';
  for(var s2=0;s2<L.steps.length;s2++)h+='<li>'+L.steps[s2]+'</li>';
  h+='</ol></div><div class="callout warn"><b>Watch out:</b><ul class="plain">';
  for(var t=0;t<L.traps.length;t++)h+='<li>'+L.traps[t]+'</li>';
  h+='</ul></div><div class="callout tip"><b>Test tip:</b> '+L.tip+'</div>';
  h+='<div class="card"><h2>Practice</h2><p class="note" style="margin-top:0">'+c.practiceNote+'</p><div id="qz"></div></div><div class="actions">';
  h+=idx>0?'<a class="btn" href="#'+c.prefix+c.list[idx-1].id+'">&larr; '+esc(c.list[idx-1].title)+'</a>':'<span></span>';
  h+=idx<c.list.length-1?'<a class="btn primary" href="#'+c.prefix+c.list[idx+1].id+'">'+esc(c.list[idx+1].title)+' &rarr;</a>':'<a class="btn primary" href="#'+c.testHash+'">'+c.testLabel+' &rarr;</a>';
  h+='</div>';
  app.innerHTML=h;
  var host=document.getElementById("qz");
  function start(){
    var mo={instant:true,label:"Practice",onDone:function(res){
      var m=res.raw===res.qs.length?"Perfect. You are ready for the next lesson.":(res.raw>=res.qs.length-1?"Nearly there. Re-read the questions you missed.":"Worth another look. Read the idea and steps again, then retry.");
      host.innerHTML='<div class="row"><div><div class="big">'+res.raw+' / '+res.qs.length+'</div><small>correct</small></div></div><p>'+m+'</p><p><button id="retry" class="primary">Try again</button></p>';
      document.getElementById("retry").onclick=start;
    }};
    c.extra(L,mo);
    active=mountQuiz(host,L.practice,mo);
  }
  start();
}
var R_LESSON_CFG={list:RLESSONS,prefix:"rlesson-",hub:"reading",hubLabel:"Reading",hubPage:function(){pageReading();},word:"Reading",testHash:"rtest",testLabel:"Take Reading Test 1",practiceNote:"Read the short passage, then answer. You see feedback straight away.",extra:function(L,mo){mo.passages=[L.passage];}};
var L_LESSON_CFG={list:LLESSONS,prefix:"llesson-",hub:"listening",hubLabel:"Listening",hubPage:function(){pageListening();},word:"Listening",testHash:"ltest",testLabel:"Take Listening Test 1",practiceNote:"Press Play, listen, then choose an answer. You can replay the audio in practice.",extra:function(L,mo){mo.stimuli=L.stimuli;}};
function pageRLesson(id){skillLesson(R_LESSON_CFG,id);}
function pageLLesson(id){skillLesson(L_LESSON_CFG,id);}

function pageListening(){
  var h='<h1>Listening Comprehension</h1><p class="sub">On the real test: 50 questions in about 35 minutes. Part A has 30 short conversations, Part B has 2 longer conversations, and Part C has 3 talks.</p>';
  h+='<div class="card"><h2>Before you start: check your sound</h2><p>This site reads the scripts aloud with your device\'s built-in voice. Voices are different on every device, and they sound more robotic than real recordings. They are good for practice. Also listen to real English every day.</p><p><button id="snd" class="primary">&#9654; Test my sound</button> <span id="sndmsg" class="note"></span></p></div>';
  h+='<div class="card"><h2>Listening lessons</h2><p class="note" style="margin-top:0">Each lesson has the idea, steps, traps and 3 practice questions with audio.</p><div class="grid">';
  for(var i=0;i<LLESSONS.length;i++){var L=LLESSONS[i];h+='<a class="tile" href="#llesson-'+L.id+'"><span class="lvl">Lesson '+(i+1)+'</span><b>'+esc(L.title)+'</b><span>'+esc(L.blurb)+'</span></a>';}
  h+='</div></div>';
  h+='<div class="card"><h2>Listening Test 1</h2><p>50 questions in the same three parts as the real test. In the timed test you can play each audio only once.</p><p><a class="btn primary" href="#ltest">Take Listening Test 1</a></p></div>';
  h+='<div class="card"><h2>Listening Harder Test</h2><p>50 new questions with faster language, trickier idioms and longer talks (about 520 to 600 level). Take it when you can reach about 29 out of 50 on Test 1.</p><p><a class="btn primary" href="#ltest-hard">Take the Harder Test</a></p></div>';
  h+='<div class="card"><h2>Tips for the Listening section</h2><ol class="steps">'+
     '<li><b>Read the answer choices while the audio plays.</b> This tells you what to listen for.</li>'+
     '<li><b>Part A: listen to the last sentence.</b> The second speaker\'s last sentence usually holds the answer.</li>'+
     '<li><b>Parts B and C: take short notes.</b> Write key words, names and numbers, not whole sentences.</li>'+
     '<li><b>Watch for changes.</b> Times, days and places are often corrected during a conversation. Listen for the final version.</li>'+
     '<li><b>Don\'t stop if you miss something.</b> Choose your best answer and focus on the next question.</li>'+
     '<li><b>Never leave a blank.</b> Your score is based on the number you get right.</li></ol></div>';
  app.innerHTML=h;
  document.getElementById("snd").onclick=function(){
    var el=document.getElementById("sndmsg");
    if(!TTS){el.textContent="Audio is not available in this browser. Try Chrome, Edge or Safari.";return;}
    el.textContent="Playing... If you hear nothing, check your volume and that your device is not on silent.";
    speakLines([{v:"F",t:"Hello. This is a sound check. If you can hear me clearly, you are ready to start."}],1,function(){el.textContent="Finished. If you heard the voice, your sound is working.";});
  };
}

function pageLTest(hard){
  app.innerHTML=
  '<h1>'+(hard?"Listening Harder Test":"Listening Test 1")+'</h1><p class="sub">Part A: 30 short conversations &middot; Part B: 2 conversations &middot; Part C: 3 talks</p>'+
  '<div class="card"><p><b>Goal for a 520 total:</b> '+(hard?"about 26 out of 50 on this harder form. It has faster, more detailed talks and trickier idioms, so a lower number is still a good result.":"about 29 out of 50. A student around 450 usually scores around 20 to 22.")+'</p>'+
  '<p>Press Play to hear each conversation or talk. In the timed test you can play each one <b>once</b>, as on the real test. The questions are written on the screen to help you; on the real test you only hear them.</p>'+
  '<p><button id="snd">&#9654; Test my sound first</button> <span id="sndmsg" class="note"></span></p>'+
  '<div class="modes"><button class="mode" id="m1"><b>Practice mode</b><span>No timer. Replay as often as you like. See the answer, a simple explanation and the script after each question.</span></button>'+
  '<button class="mode primary" id="m2"><b>Timed test mode</b><span>35-minute countdown. Each audio plays once. Feedback and scripts only at the end.</span></button></div></div>'+
  '<p class="note">The score estimate is a rough guide. Real tests use their own conversion tables, and the three sections are combined for the total. Voices on this site are computer voices and sound different on each device.</p><div id="qz"></div>';
  document.getElementById("snd").onclick=function(){
    var el=document.getElementById("sndmsg");
    if(!TTS){el.textContent="Audio is not available in this browser. Try Chrome, Edge or Safari.";return;}
    el.textContent="Playing...";
    speakLines([{v:"F",t:"Hello. This is a sound check. If you can hear me clearly, you are ready to start."}],1,function(){el.textContent="Finished. If you heard the voice, your sound is working.";});
  };
  document.getElementById("m1").onclick=function(){run(true);};
  document.getElementById("m2").onclick=function(){run(false);};
  function run(instant){
    stopSpeech();
    if(active){active.destroy();active=null;}
    var host=document.getElementById("qz");
    document.querySelector(".card").style.display="none";var nt=document.querySelector("#app > p.note");if(nt)nt.style.display="none";
    window.scrollTo(0,0);
    active=mountQuiz(host,hard?LTEST_H:LTEST_QS,{instant:instant,timerSec:instant?0:35*60,label:instant?"Practice":"Timed test",stimuli:hard?LSTIM_H:LSTIM,directions:true,dirText:"<b>Directions.</b> Press Play to hear each conversation or talk, then choose the best answer.",lessonLinks:true,onDone:function(res){results(host,res,instant,hard?LISTEN_CFG_H:LISTEN_CFG);}});
  }
}

function pageRTest(hard){
  app.innerHTML=
  '<h1>'+(hard?"Reading Harder Test":"Reading Test 1")+'</h1><p class="sub">5 passages &middot; 50 questions</p>'+
  '<div class="card"><p><b>Goal for a 520 total:</b> '+(hard?"about 26 out of 50 on this harder form. The passages are more abstract and the questions need more careful inference, so a lower number is still a good result.":"about 29 out of 50. A student around 450 usually scores around 20 to 22.")+'</p>'+
  '<p>Choose how you want to take it. At the end you get a list of question types with links to the lessons that will help most.</p>'+
  '<div class="modes"><button class="mode" id="m1"><b>Practice mode</b><span>No timer. You see the answer and a simple explanation after each question.</span></button>'+
  '<button class="mode primary" id="m2"><b>Timed test mode</b><span>55-minute countdown. Feedback and score only at the end.</span></button></div></div>'+
  '<p class="note">The score estimate is a rough guide. Real tests use their own conversion tables, and the three sections are combined for the total.</p><div id="qz"></div>';
  document.getElementById("m1").onclick=function(){run(true);};
  document.getElementById("m2").onclick=function(){run(false);};
  function run(instant){
    if(active){active.destroy();active=null;}
    var host=document.getElementById("qz");
    document.querySelector(".card").style.display="none";var nt=document.querySelector("#app > p.note");if(nt)nt.style.display="none";
    app.classList.add("wide");
    window.scrollTo(0,0);
    active=mountQuiz(host,hard?RTEST_H:RTEST_QS,{instant:instant,timerSec:instant?0:55*60,label:instant?"Practice":"Timed test",passages:hard?RPASS_H:RPASS,directions:true,dirText:"<b>Directions.</b> Read each passage and choose the best answer to each question. Use only what the passage says or clearly shows.",lessonLinks:true,onDone:function(res){app.classList.remove("wide");results(host,res,instant,hard?READ_CFG_H:READ_CFG);}});
  }
}


/* ---------- full mock test ---------- */
var MOCK={res:[],level:"std"};
function mh(){return MOCK.level==="hard";}
var MOCK_SECS=[
  {key:"L",name:"Listening Comprehension",qs:function(){return mh()?LTEST_H:LTEST_QS;},mins:35,get cfg(){return mh()?LISTEN_CFG_H:LISTEN_CFG;},extra:function(){return {stimuli:mh()?LSTIM_H:LSTIM,dirText:"<b>Directions.</b> Press Play to hear each conversation or talk. Each one plays only once. Then choose the best answer."};}},
  {key:"S",name:"Structure and Written Expression",qs:function(){return mh()?TEST_H:TEST1;},mins:25,get cfg(){return mh()?STRUCT_CFG_H:STRUCT_CFG;},extra:function(){return {};}},
  {key:"R",name:"Reading Comprehension",qs:function(){return mh()?RTEST_H:RTEST_QS;},mins:55,get cfg(){return mh()?READ_CFG_H:READ_CFG;},wide:true,extra:function(){return {passages:mh()?RPASS_H:RPASS,dirText:"<b>Directions.</b> Read each passage and choose the best answer to each question. Use only what the passage says or clearly shows."};}}
];

function pageMock(){
  MOCK.res=[];
  app.innerHTML=
  '<h1>Full mock test</h1><p class="sub">Listening, Structure and Reading in one sitting, with a combined score estimate</p>'+
  '<div class="card"><h2>How it works</h2><ol class="steps">'+
  '<li><b>Section 1: Listening.</b> 50 questions, 35 minutes. Each audio plays only once.</li>'+
  '<li><b>Section 2: Structure and Written Expression.</b> 40 questions, 25 minutes.</li>'+
  '<li><b>Section 3: Reading.</b> 50 questions, 55 minutes.</li></ol>'+
  '<p>That is about <b>2 hours</b> in total. Each section has its own timer. You cannot go back to an earlier section, and you see your scores only at the end.</p></div>'+
  '<div class="card"><h2>Before you start</h2><ul class="plain">'+
  '<li>Find a quiet place, turn your sound on, and keep scrap paper and a pencil beside you.</li>'+
  '<li>Stay on this page. If you leave it, the mock test starts again from the beginning.</li>'+
  '<li>A short break between sections is fine. The timer for the next section starts only when you press the button.</li>'+
  '<li>The <b>Standard</b> level uses the same questions as Listening Test 1, Structure Test 1 and Reading Test 1. For the most honest baseline, take it <b>before</b> you try those tests. The <b>Harder</b> level uses the harder forms (about 520 to 600 level).</li></ul>'+
  '<h2>Choose a level</h2><div class="modes"><label class="mode" style="cursor:pointer"><input type="radio" name="lvl" value="std"> <b>Standard</b><span>For a student around 450 to 520. Same questions as Test 1 in each section.</span></label>'+
  '<label class="mode" style="cursor:pointer"><input type="radio" name="lvl" value="hard"> <b>Harder</b><span>For a student already near or above 520. Targets are lowered by about 3 questions per section to allow for the extra difficulty.</span></label></div>'+
  '<p><button id="snd">&#9654; Test my sound</button> <span id="sndmsg" class="note"></span></p>'+
  '<p><button id="go" class="primary">Start Section 1: Listening</button></p></div>'+
  '<p class="note">The score is a rough estimate. Real tests use their own conversion tables for each form.</p>';
  document.getElementById("snd").onclick=function(){
    var el=document.getElementById("sndmsg");
    if(!TTS){el.textContent="Audio is not available in this browser. Try Chrome, Edge or Safari.";return;}
    el.textContent="Playing...";
    speakLines([{v:"F",t:"Hello. This is a sound check. If you can hear me clearly, you are ready to start."}],1,function(){el.textContent="Finished. If you heard the voice, your sound is working.";});
  };
  var rd=app.querySelectorAll("input[name=lvl]");
  for(var q=0;q<rd.length;q++){rd[q].checked=rd[q].value===MOCK.level;rd[q].onchange=function(){MOCK.level=this.value;};}
  document.getElementById("go").onclick=function(){stopSpeech();mockRun(0);};
}

function mockBetween(i){
  var S=MOCK_SECS[i],n=S.qs().length;
  app.innerHTML='<h1>Section '+(i+1)+' of 3 finished</h1><div class="card"><p>Well done. Take a short break if you need one. Your scores will appear at the end of the mock test.</p>'+
  '<p><b>Next:</b> Section '+(i+2)+', '+MOCK_SECS[i+1].name+' ('+MOCK_SECS[i+1].qs().length+' questions, '+MOCK_SECS[i+1].mins+' minutes).</p>'+
  '<p><button id="next" class="primary">Start Section '+(i+2)+'</button></p></div>';
  document.getElementById("next").onclick=function(){mockRun(i+1);};
  window.scrollTo(0,0);
}

function mockRun(i){
  var S=MOCK_SECS[i];
  app.innerHTML='<div id="qz"></div>';
  if(S.wide)app.classList.add("wide");else app.classList.remove("wide");
  window.scrollTo(0,0);
  var o=S.extra();
  o.instant=false;o.timerSec=S.mins*60;o.label="Mock test: section "+(i+1)+" of 3";o.directions=true;
  o.onDone=function(res){
    MOCK.res[i]=res;
    app.classList.remove("wide");
    if(i<2)mockBetween(i);else mockResults();
  };
  active=mountQuiz(document.getElementById("qz"),S.qs(),o);
}

function mockResults(){
  var rows=[],sum=0,topics={},weakest=0;
  MOCK_SECS.forEach(function(S,i){
    var r=MOCK.res[i],sc=S.cfg.scale(r.raw);
    sum+=sc;rows.push({S:S,r:r,sc:sc});
    if(sc<rows[weakest].sc)weakest=i;
    for(var k=0;k<r.qs.length;k++){
      var t=r.qs[k].topic,key=S.key+"|"+t;
      if(!topics[key])topics[key]={name:t,ok:0,n:0,S:S};
      topics[key].n++;if(r.ans[k]===r.qs[k].ans)topics[key].ok++;
    }
  });
  var total=Math.min(677,Math.round(sum/3*10)),gap=520-total;
  var pct=Math.max(0,Math.min(100,Math.round((total-310)/(677-310)*100))),tpct=Math.round((520-310)/(677-310)*100);
  var h='<h1>Mock test results</h1><p class="sub">Listening, Structure and Reading &middot; '+(mh()?"Harder level":"Standard level")+'</p>';
  h+='<div class="card"><div class="row"><div><div class="big">~'+total+'</div><small>rough total score (310 to 677)</small></div><div><div class="big">520</div><small>your target</small></div></div>'+
     '<div class="bar '+(total>=520?"good":"")+'" style="position:relative"><i style="width:'+pct+'%"></i></div>'+
     '<p class="note" style="margin-top:0">The target is at '+tpct+'% of the scale.</p>';
  if(gap<=0)h+='<p><b>You reached the target.</b> Your estimate is at or above 520. Take another form under the same conditions to check it holds.</p>';
  else h+='<p>Your estimate is about <b>'+gap+' points below 520</b>. That is roughly '+Math.max(1,Math.round(gap/10/0.74*1))+' more correct answers per section on average.</p>';
  h+='<p><b>Weakest section:</b> '+rows[weakest].S.name+'. Start there.</p></div>';
  h+='<div class="card"><h2>Your sections</h2><div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Section</th><th>Correct</th><th>Rough score</th><th>Needed for 52</th><th>Time used</th></tr></thead><tbody>';
  rows.forEach(function(x){
    var tot=x.S.qs().length;
    h+='<tr><td>'+esc(x.S.name)+'</td><td>'+x.r.raw+' / '+tot+'</td><td>~'+x.sc+'</td><td>'+x.S.cfg.target+' / '+tot+'</td><td>'+fmt(x.S.mins*60-Math.max(x.r.left,0))+'</td></tr>';
  });
  h+='</tbody></table></div><p class="note">The total is the average of the three section scores, multiplied by 10. Each section score is a rough estimate.</p></div>';
  var arr=[];for(var key in topics)arr.push(topics[key]);
  arr.sort(function(a,b){return (a.ok/a.n)-(b.ok/b.n)||b.n-a.n;});
  h+='<div class="card"><h2>Where to study next</h2><p class="note" style="margin-top:0">All sections together, weakest first. Showing the 10 weakest.</p>';
  arr.slice(0,10).forEach(function(t){
    var pc=Math.round(t.ok/t.n*100),L=t.S.cfg.find(t.name);
    h+='<div class="topic"><span>'+esc(t.name)+'</span><div class="bar '+(pc>=75?"good":(pc<50?"bad":""))+'"><i style="width:'+pc+'%"></i></div><span>'+t.ok+'/'+t.n+'</span>'+(L?'<a href="'+t.S.cfg.prefix+L.id+'">Lesson</a>':'<span></span>')+'</div>';
  });
  h+='</div><div class="card"><h2>Review your answers</h2><p class="note" style="margin-top:0">Every question, with a plain explanation (and the script for Listening).</p><p>'+
     '<button class="rv" data-i="0">Listening</button> <button class="rv" data-i="1">Structure</button> <button class="rv" data-i="2">Reading</button></p></div>'+
     '<div class="actions"><a class="btn" href="#plan">Study plan</a><button id="again" class="primary">Take the mock test again</button></div>';
  app.innerHTML=h;
  var b=app.querySelectorAll(".rv");
  for(var n=0;n<b.length;n++){b[n].onclick=function(){
    var i=+this.getAttribute("data-i"),S=MOCK_SECS[i],c={};
    for(var k in S.cfg)c[k]=S.cfg[k];
    c.back=mockResults;
    results(app,MOCK.res[i],false,c);
  };}
  document.getElementById("again").onclick=pageMock;
  window.scrollTo(0,0);
}

/* ---------- router ---------- */
function route(){
  if(active){active.destroy();active=null;}
  stopSpeech();
  app.classList.remove("wide");
  var h=(location.hash||"#home").slice(1);
  setNav(h);
  if(h==="home")pageHome();
  else if(h==="plan")pagePlan();
  else if(h==="tips")pageTips();
  else if(h==="words")pageWords();
  else if(h==="lessons")pageLessons();
  else if(h==="mock")pageMock();
  else if(h==="listening")pageListening();
  else if(h.indexOf("llesson-")===0)pageLLesson(h.slice(8));
  else if(h==="ltest")pageLTest();
  else if(h==="ltest-hard")pageLTest(true);
  else if(h==="reading")pageReading();
  else if(h.indexOf("rlesson-")===0)pageRLesson(h.slice(8));
  else if(h==="rtest")pageRTest();
  else if(h==="rtest-hard")pageRTest(true);
  else if(h.indexOf("lesson-")===0)pageLesson(h.slice(7));
  else if(h==="test")pageTest();
  else if(h==="test-hard")pageTest(true);
  else pageHome();
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
window.ITP={get active(){return active;}};
route();
})();
