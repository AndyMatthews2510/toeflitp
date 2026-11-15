"use strict";
/* Listening content. All scripts and questions are original.
   Speaker codes: M = man, F = woman, S = single speaker. Correct answer listed first; the app shuffles the options. */

function dlg(s){return s.split("|").map(function(x){var i=x.indexOf(":");return {v:x.slice(0,i).trim(),t:x.slice(i+1).trim()};});}
function lq(sid,topic,stem,correct,wrongs,why){return {part:"L",sid:sid,topic:topic,stem:stem,opts:[correct].concat(wrongs),ans:0,why:why};}
var LT1="Short conversations: what does the speaker mean?", LT2="Agreement, negatives and 'should have'", LT3="Idioms and everyday phrases",
    LT4="Suggestions, plans and what happens next", LT5="Longer conversations and talks";

/* ---------------- LISTENING TEST 1 ---------------- */
var LSTIM=[], LTEST_QS=[];
(function(){
  function addA(topic,script,stem,correct,wrongs,why){
    var n=LSTIM.length;
    LSTIM.push({kind:"short",title:"Part A: short conversation "+(n+1)+" of 30",lines:dlg(script)});
    LTEST_QS.push(lq(n,topic,stem,correct,wrongs,why));
  }
  /* Part A: 30 short conversations */
  addA(LT1,"F: Did you finish the lab report?|M: I'm only on the second page, and it's due tomorrow.","What does the man mean?","He has not finished the report.",["He finished the report early.","He does not have to write the report.","He wrote only two reports."],"The man is only on page two and the report is due tomorrow, so he has not finished.");
  addA(LT1,"M: Is this seat taken?|F: My friend's coat is on it. He went to buy tickets and he'll be back soon.","What does the woman imply?","The seat is being saved.",["She wants to move to another seat.","The seat is broken.","Her friend has gone home for the day."],"The coat means someone is using the seat, and the friend will be back soon. The seat is being saved.");
  addA(LT1,"F: How was the concert?|M: The music was fine, but I couldn't see anything from the back row.","What does the man say about the concert?","He did not like where he sat.",["The music was bad.","He arrived early.","He sat in the front row."],"He liked the music but could not see from the back row, so he did not like his seat.");
  addA(LT1,"M: Could I borrow your notes from Monday's class?|F: Sure, but my handwriting is hard to read.","What does the woman mean?","He can have the notes, but they may be hard to read.",["She will not lend her notes.","She wants to write new notes.","She missed Monday's class."],"She says 'Sure', so he can borrow the notes. But she warns that her handwriting is hard to read.");
  addA(LT1,"F: I'm thinking of taking the history course next term.|M: It's interesting, but there's a lot of reading.","What does the man say about the course?","It is interesting but needs a lot of reading.",["It is very easy.","It has no reading.","It is already full."],"He says it is interesting 'but' it has a lot of reading. He gives both sides.");
  addA(LT1,"M: Why is the library so quiet today?|F: Most students are away for the holiday weekend.","Why is the library quiet?","Many students are not on campus.",["The library is closed.","Exams are being held.","A new rule was announced."],"Most students are away for the holiday weekend, so few people are on campus.");
  addA(LT1,"F: Did you get tickets for the game?|M: They were sold out by the time I got to the office.","What does the man mean?","He could not buy tickets.",["He bought tickets for everyone.","He did not want to go.","He forgot where the office is."],"The tickets were sold out when he arrived, so he could not buy any.");
  addA(LT2,"M: I really enjoyed the lecture on volcanoes.|F: So did I.","What does the woman mean?","She also enjoyed the lecture.",["She did not attend the lecture.","She enjoyed it less than the man.","She thinks volcanoes are boring."],"'So did I' means 'I enjoyed it too'. She agrees.");
  addA(LT2,"F: I don't like the new schedule.|M: Neither do I.","What does the man mean?","He also dislikes the new schedule.",["He likes the new schedule.","He has not seen the schedule.","He wants to change classes."],"'Neither do I' means 'I don't like it either'. It agrees with a negative sentence.");
  addA(LT2,"M: Did you hear about the exam?|F: Hardly anyone passed it.","What does the woman say about the exam?","Almost all students failed.",["Almost all students passed.","Nobody took it.","It was canceled."],"'Hardly anyone passed' means almost nobody passed, so almost all students failed.");
  addA(LT2,"F: I missed the bus again.|M: You should have left earlier.","What does the man mean?","The woman did not leave early enough.",["The woman left too early.","The bus came early.","The woman should take a taxi tomorrow."],"'Should have left earlier' means she did not leave early enough.");
  addA(LT2,"M: Is the museum open on Mondays?|F: Not unless there's a special event.","What does the woman mean?","It is usually closed on Mondays.",["It is always open on Mondays.","It is open only at night.","There is an event every Monday."],"'Not unless there's a special event' means it is closed on Mondays except for special events.");
  addA(LT2,"F: I wish I had studied more for the quiz.|M: Me too. It was harder than I expected.","What does the man mean?","He also wishes he had studied more.",["He studied a lot.","The quiz was easy.","He did not take the quiz."],"'Me too' means he also wishes he had studied more. 'I wish I had' shows regret.");
  addA(LT2,"M: Nobody told me the meeting was moved.|F: I thought you knew.","What does the man mean?","He did not know about the change.",["He moved the meeting himself.","He missed the meeting on purpose.","He told everyone about the change."],"He says nobody told him, so he did not know. The woman thought he knew.");
  addA(LT3,"F: Are you coming to the party?|M: I'm feeling a bit under the weather.","What does the man mean?","He does not feel well.",["He is worried about rain.","He is already at the party.","He has no time."],"'Under the weather' means a little sick. It has nothing to do with rain.");
  addA(LT3,"M: How did your presentation go?|F: It was a piece of cake.","What does the woman mean?","It was easy.",["She brought dessert.","It was a disaster.","It was too long."],"'A piece of cake' means very easy.");
  addA(LT3,"F: Shall we keep working on the project?|M: I think we should call it a day.","What does the man suggest?","Stopping work for now.",["Calling the professor.","Working through the night.","Starting a new project."],"'Call it a day' means stop working for today.");
  addA(LT3,"M: I can't believe the test is tomorrow.|F: Don't worry. You've got it in the bag.","What does the woman mean?","He will probably do well.",["He lost his bag.","He should study all night.","The test is canceled."],"'In the bag' means almost certain. She means he will probably do well.");
  addA(LT3,"F: Did you talk to the professor about the deadline?|M: I'll bring it up after class.","What will the man do?","Mention the deadline after class.",["Skip the class.","Change the deadline himself.","Write to the professor tonight."],"'Bring it up' means mention it. He will mention the deadline after class.");
  addA(LT3,"F: Mark seems upset about something.|M: He's just letting off steam after the exam.","What is Mark doing?","Releasing his stress.",["Studying for an exam.","Talking to the professor.","Heating some food."],"'Letting off steam' means getting rid of stress or anger, for example by relaxing or talking.");
  addA(LT3,"F: Is Ana joining us for dinner?|M: She's snowed under with work this week.","What does the man mean?","Ana has too much work.",["Ana is out in the snow.","Ana is on vacation.","Ana does not like dinner."],"'Snowed under' means has far too much work.");
  addA(LT4,"F: I can't find a topic for my paper.|M: Why don't you talk to Professor Lee?","What does the man suggest?","Asking the professor for ideas.",["Changing courses.","Writing about Professor Lee.","Waiting until next week."],"'Why don't you...?' is a suggestion. He suggests she ask the professor.");
  addA(LT4,"M: The bookstore closes in ten minutes.|F: Then I'll run over and get my textbook now.","What will the woman do?","Go to the bookstore now.",["Buy the book tomorrow.","Wait ten minutes.","Return a textbook."],"The shop closes in ten minutes, so she says she will run over now.");
  addA(LT4,"F: My laptop keeps shutting down.|M: How about taking it to the computer center?","What does the man suggest?","Taking the laptop in for repair help.",["Buying a new laptop today.","Leaving it on all night.","Asking the woman to wait."],"'How about taking it...?' is a suggestion. The computer center can look at the laptop.");
  addA(LT4,"M: I'm going to the cafeteria. Do you want anything?|F: A coffee would be great, thanks.","What will the man probably do?","Bring the woman a coffee.",["Make coffee in the lab.","Eat lunch with her.","Skip the cafeteria."],"He offers to bring something from the cafeteria, and she says a coffee would be great.");
  addA(LT4,"F: The bus to the airport leaves at six.|M: Then we'd better set our alarms for five.","What will the speakers probably do?","Wake up early.",["Take a taxi.","Miss the bus.","Leave the night before."],"'We'd better set our alarms for five' means they should wake up early for the six o'clock bus.");
  addA(LT4,"M: I'd like to join the photography club.|F: The sign-up sheet is outside the student office.","What does the woman tell the man?","Where he can sign up.",["The club is full.","The club meets today.","Who runs the club."],"She tells him that the sign-up sheet is outside the student office, so she tells him where to sign up.");
  addA(LT4,"F: I have two exams on Friday.|M: Maybe you should make a study schedule.","What does the man advise?","Planning her study time.",["Skipping one exam.","Asking for more time.","Studying only at night."],"'Maybe you should make a study schedule' is advice to plan her study time.");
  addA(LT4,"M: The printer is out of paper again.|F: I'll tell the office to order more.","What will the woman do?","Report the problem to the office.",["Buy paper herself.","Fix the printer.","Print the assignment."],"She says she will tell the office, so she will report the problem.");
  addA(LT4,"F: Do you want to study together tonight?|M: I have basketball practice until eight, but I'm free after that.","What does the man mean?","He can study with her later in the evening.",["He cannot study at all tonight.","He wants to practice basketball with her.","He is free all evening."],"He has practice until eight but is free after that, so he can study with her later in the evening.");

  /* Part B: 2 longer conversations */
  var c1=LSTIM.length;
  LSTIM.push({kind:"conv",title:"Part B: conversation 1 of 2",lines:dlg("F: Hello, Mr. Park. I wanted to ask about my schedule for next term.|M: Of course. What's the problem?|F: I'm enrolled in both Economics and Statistics on Tuesday mornings, and the two classes overlap by half an hour.|M: That happens sometimes. Which class is more important for your major?|F: Economics is required. Statistics is only recommended.|M: Then I'd keep Economics. There's another section of Statistics on Thursday afternoons. Would that work?|F: I have a part-time job on Thursdays until four, but the class starts at four-thirty, so I could make it.|M: Good. Let me move you into that section. You'll also need to tell the Statistics instructor, since the Thursday class is almost full.|F: Okay. Should I email her today?|M: Yes, and mention that I approved the change.")});
  LTEST_QS.push(lq(c1,LT5,"What is the main topic of the conversation?","A problem with the student's class times",["A job application","A change of major","A missed exam"],"The student's two classes overlap, and the whole conversation is about fixing that."));
  LTEST_QS.push(lq(c1,LT5,"Why does the student keep Economics?","It is required for her major.",["It is easier than Statistics.","It is held on Thursdays.","Her friends are in the class."],"She says Economics is required for her major."));
  LTEST_QS.push(lq(c1,LT5,"When does the Thursday Statistics class start?","At four-thirty",["At four o'clock","In the morning","At half past three"],"The class is on Thursday afternoon and starts at four-thirty. Her job ends at four, which is a different time."));
  LTEST_QS.push(lq(c1,LT5,"What will the student probably do next?","Email the Statistics instructor",["Drop Economics","Quit her part-time job","Visit another advisor"],"The advisor tells her to email the Statistics instructor today and mention his approval."));
  var c2=LSTIM.length;
  LSTIM.push({kind:"conv",title:"Part B: conversation 2 of 2",lines:dlg("M: Did you get the email about our biology presentation?|F: Yes. The professor moved it to next Wednesday, so we have less time than we thought.|M: That's a problem. We haven't even chosen a topic.|F: I was thinking about bees. Their numbers have dropped in many countries, and there's a lot of research.|M: That's good, but Jun already chose bees. The professor doesn't want two groups on the same topic.|F: Oh. What about the effect of noise on birds in cities?|M: Interesting. I don't know much about it, though. Where would we find information?|F: The library has a database of journal articles. I can show you after class.|M: Great. And let's divide the work. I'll make the slides if you handle the research.|F: Deal. Let's meet again on Sunday to practice.")});
  LTEST_QS.push(lq(c2,LT5,"Why do the students have less time than expected?","The presentation was moved to an earlier date.",["The library is closing soon.","The professor changed their topic.","One student is leaving the class."],"The professor moved the presentation to next Wednesday, which is sooner than they planned."));
  LTEST_QS.push(lq(c2,LT5,"Why do the students decide not to talk about bees?","Another group already chose that topic.",["There is not enough research on bees.","The professor dislikes bees.","The number of bees has increased."],"The man says Jun already chose bees and the professor does not want two groups on the same topic."));
  LTEST_QS.push(lq(c2,LT5,"How will the woman help the man?","She will show him how to find articles.",["She will make all the slides.","She will talk to the professor.","She will lend him a book."],"She says the library has a database of articles and she can show him after class."));
  LTEST_QS.push(lq(c2,LT5,"What will the students do on Sunday?","Practice their presentation",["Give their presentation","Choose a topic","Visit the professor"],"She says they should meet on Sunday to practice. The presentation itself is on Wednesday."));

  /* Part C: 3 talks */
  var t1=LSTIM.length;
  LSTIM.push({kind:"talk",title:"Part C: talk 1 of 3",lines:dlg("S: Welcome to the university library. I'd like to explain three things that will help you this term. First, our hours. The library is open from eight in the morning until ten at night on weekdays, but on weekends it closes at six. During exam week, the main floor stays open all night. Second, borrowing. Students may take out up to ten books at a time for three weeks. If nobody else has asked for a book, you can renew it online twice. Late books cost fifty cents a day, so please return them on time. Third, study spaces. Silent study rooms are on the fourth floor, and group study rooms on the second floor can be booked online for up to two hours. You'll need your student card to book a room. If you need help finding research materials, librarians are at the information desk, and you can also chat with us through the website.")});
  LTEST_QS.push(lq(t1,LT5,"What is the purpose of the talk?","To explain how to use the library",["To announce new library books","To ask students for donations","To describe the history of the library"],"The speaker explains the hours, borrowing rules, and study spaces to help students use the library."));
  LTEST_QS.push(lq(t1,LT5,"When does the library close on weekends?","At six in the evening",["At ten at night","At eight in the morning","It stays open all night"],"The speaker says that on weekends it closes at six. Ten at night is the weekday closing time."));
  LTEST_QS.push(lq(t1,LT5,"How long can students keep a book before it must be renewed?","Three weeks",["Two hours","Ten days","One month"],"Students may take out up to ten books for three weeks, and then they can renew them online."));
  LTEST_QS.push(lq(t1,LT5,"What do students need to book a group study room?","Their student card",["A letter from a teacher","A library fee","A pass for the silent rooms"],"The speaker says you will need your student card to book a room."));
  var t2=LSTIM.length;
  LSTIM.push({kind:"talk",title:"Part C: talk 2 of 3",lines:dlg("S: Have you ever wondered why the ocean is salty, while the rivers that flow into it are not? The answer begins on land. When rain falls, it picks up small amounts of minerals from rocks, and the water carries these minerals down rivers to the sea. Rivers contain only a tiny amount of salt, but the sea has been collecting it for millions of years. Here is the key point. When ocean water evaporates, the water rises into the air as vapor, but the salt stays behind. Over time, the salt becomes more concentrated. Some of the salt also comes from underwater volcanoes and from cracks in the ocean floor. Interestingly, the saltiness of the sea has stayed about the same for a very long time, because salt is also removed, for example when it forms crystals along dry coasts or becomes part of the sea floor.")});
  LTEST_QS.push(lq(t2,LT5,"What is the lecture mainly about?","Where the salt in the ocean comes from",["How rivers are formed","Why it rains","How volcanoes are built"],"The whole talk explains where the salt in the ocean comes from."));
  LTEST_QS.push(lq(t2,LT5,"According to the speaker, how does salt get from the land to the sea?","Rain picks up minerals from rocks, and rivers carry them to the sea.",["Wind blows salt from deserts into the sea.","Fish bring it from other oceans.","Ships drop it into the water."],"The speaker says rain picks up minerals from rocks and the water carries them down rivers to the sea."));
  LTEST_QS.push(lq(t2,LT5,"What happens to salt when ocean water evaporates?","It stays in the ocean.",["It rises into the air.","It falls as rain over the land.","It turns into sand."],"The speaker says the water rises as vapor but the salt stays behind."));
  LTEST_QS.push(lq(t2,LT5,"What does the speaker imply about the ocean's saltiness?","It has changed very little over a long time.",["It is increasing quickly every year.","It was much higher in the past.","It is lower near rivers only."],"The speaker says the saltiness has stayed about the same for a very long time."));
  var t3=LSTIM.length;
  LSTIM.push({kind:"talk",title:"Part C: talk 3 of 3",lines:dlg("S: Today we'll look at a style of painting called Impressionism, which began in France in the 1870s. Before this time, most respected painters worked slowly in studios and produced detailed pictures of historical or religious scenes. A group of younger artists, including Claude Monet and Camille Pissarro, wanted something different. They carried their paints outdoors and painted what they saw, paying special attention to changing light. To capture a moment before the light changed, they used quick, short brushstrokes instead of smooth, careful ones. At first, critics were not impressed. One reviewer used the word 'Impressionists' to make fun of the group, after seeing a Monet painting called Impression, Sunrise. The artists, however, accepted the name, and today their work is among the most popular in the world. For next class, please read the chapter on Monet and choose one painting to describe.")});
  LTEST_QS.push(lq(t3,LT5,"What is the talk mainly about?","A new style of painting and how it began",["The life of one painter","How paints are made","Why museums collect art"],"The talk explains Impressionism and how it began in France."));
  LTEST_QS.push(lq(t3,LT5,"Why did the artists paint outdoors?","To capture the changing light",["To avoid the critics","To sell paintings to travelers","Because the studios were closed"],"The speaker says they paid special attention to changing light and wanted to capture a moment before it changed."));
  LTEST_QS.push(lq(t3,LT5,"How did the name 'Impressionists' begin?","A critic used it to make fun of the group.",["The artists chose it before their first show.","A museum gave it as a prize.","Monet invented it for a school."],"A reviewer used the word to make fun of the group, but the artists accepted the name."));
  LTEST_QS.push(lq(t3,LT5,"What are students asked to do for the next class?","Read a chapter and choose a painting",["Visit a museum","Paint a picture outdoors","Write a review of Monet's life"],"The speaker asks them to read the chapter on Monet and choose one painting to describe."));
})();

/* ---------------- LISTENING SKILL LESSONS ---------------- */
function lessonStim(kind,title,script){return {kind:kind,title:title,lines:dlg(script)};}
var LLESSONS=[
{
  id:"short", title:LT1, level:1,
  blurb:"Part A: find the meaning of the second speaker's answer.",
  idea:"In Part A you hear a short conversation and then a question. The answer is usually in the <b>second speaker's last sentence</b>. The correct option rarely uses the same words as the conversation. It says the same thing in different words.",
  steps:["Listen to what the first speaker asks or says.","Focus on the second speaker, especially the last sentence.","Choose the option with the same <b>meaning</b>, not the same words."],
  traps:["An option that repeats words from the conversation is often wrong.","A speaker may say 'but'. The idea after 'but' is usually the important one.","Don't use real-life knowledge. Use only what the speakers say."],
  tip:"Read the four options while the conversation plays, if you can. Then you know what to listen for.",
  stimuli:[
    lessonStim("short","Short conversation 1 of 3","F: Are you going to the study group?|M: I would, but I have a dentist appointment at the same time."),
    lessonStim("short","Short conversation 2 of 3","M: Did you like the movie?|F: The story was good, but it was far too long."),
    lessonStim("short","Short conversation 3 of 3","F: Can you help me move this desk?|M: I'd be glad to, as soon as I finish this email.")
  ],
  practice:[
    lq(0,LT1,"What does the man mean?","He cannot go to the study group.",["He will go after the dentist.","He is the leader of the study group.","He does not like the dentist."],"'I would, but...' means he wants to go but cannot, because of his appointment."),
    lq(1,LT1,"What does the woman say about the movie?","She liked the story but not the length.",["She did not like the story.","She fell asleep.","She wants to see it again."],"She says the story was good 'but' it was too long, so she liked one thing and not the other."),
    lq(2,LT1,"What does the man mean?","He will help in a few minutes.",["He refuses to help.","He wants to buy a desk.","He already moved the desk."],"'As soon as I finish this email' means he will help soon, after the email.")
  ]
},
{
  id:"patterns", title:LT2, level:1,
  blurb:"So do I, neither do I, hardly anyone, should have.",
  idea:"A few small patterns appear again and again in Part A. Learn what each one means so you can understand it quickly.",
  steps:["<b>So do I / So did I</b> = I agree with a positive sentence. <i>'I liked it.' 'So did I.'</i>","<b>Neither do I / Neither did I</b> = I agree with a negative sentence. <i>'I don't like it.' 'Neither do I.'</i>","<b>Hardly anyone, hardly ever, barely</b> = almost no one, almost never, almost not.","<b>Should have + verb</b> = it was a good idea in the past, but it did not happen. <i>'You should have called.'</i> means you did not call."],
  traps:["'Neither do I' is <b>agreement</b>, not refusal. Many students get this wrong.","'Hardly anyone passed' means almost everyone <b>failed</b>.","With 'should have', the thing did <b>not</b> happen."],
  tip:"Say the sentence again in your own words. 'Hardly anyone came' = 'Almost nobody came.'",
  stimuli:[
    lessonStim("short","Short conversation 1 of 3","M: I don't enjoy early morning classes.|F: Neither do I."),
    lessonStim("short","Short conversation 2 of 3","F: How was the final exam?|M: Hardly anyone finished on time."),
    lessonStim("short","Short conversation 3 of 3","M: I forgot my umbrella and got soaked.|F: You should have checked the weather.")
  ],
  practice:[
    lq(0,LT2,"What does the woman mean?","She also does not enjoy early classes.",["She enjoys early classes.","She will not go to class.","She has no classes in the morning."],"'Neither do I' means 'I don't enjoy them either'. She agrees with the man."),
    lq(1,LT2,"What does the man say about the exam?","Nearly all students ran out of time.",["Nearly everyone finished early.","The exam was canceled.","He finished first."],"'Hardly anyone finished on time' means almost nobody finished on time."),
    lq(2,LT2,"What does the woman mean?","He did not check the weather.",["He checked the weather.","She forgot her umbrella too.","The weather was fine."],"'Should have checked' means it would have been a good idea, but he did not do it.")
  ]
},
{
  id:"idioms", title:LT3, level:2,
  blurb:"Phrases where the meaning is different from the words.",
  idea:"The test uses everyday phrases whose meaning is not the same as the words. You don't need hundreds of them, but you should know the common ones.",
  steps:["<b>under the weather</b> = a little sick","<b>a piece of cake</b> = very easy","<b>call it a day</b> = stop working for today","<b>snowed under</b> = has far too much to do","<b>bring up</b> = mention","<b>get the hang of</b> = learn how to do something","<b>hit the books</b> = study hard","<b>give someone a hand</b> = help someone"],
  traps:["If you picture the words (rain, snow, cake), you will choose the wrong answer.","The speaker is almost never talking about real weather or food.","If a phrase is new, use the other speaker's reaction as a clue."],
  tip:"When a phrase sounds strange, ask: does this make sense with the real words? If not, it is an idiom.",
  stimuli:[
    lessonStim("short","Short conversation 1 of 3","F: Why are you studying so late?|M: I have to hit the books tonight, because the test is tomorrow."),
    lessonStim("short","Short conversation 2 of 3","M: Can you give me a hand with this box?|F: Sure. Where do you want it?"),
    lessonStim("short","Short conversation 3 of 3","F: How's your new phone?|M: Once I got the hang of it, it was easy to use.")
  ],
  practice:[
    lq(0,LT3,"What will the man do tonight?","Study hard.",["Buy some new books.","Go to bed early.","Return library books."],"'Hit the books' means study hard. He says the test is tomorrow."),
    lq(1,LT3,"What does the man want?","Some help.",["A new box.","Directions to the store.","A drawing."],"'Give me a hand' means help me. The woman says 'Sure' and asks where to put the box."),
    lq(2,LT3,"What does the man mean?","He learned how to use the phone.",["He hung the phone on the wall.","He lost the phone.","He returned the phone."],"'Got the hang of it' means learned how to do it. After that, the phone was easy to use.")
  ]
},
{
  id:"plans", title:LT4, level:2,
  blurb:"Who suggests what, and who will do what next?",
  idea:"Many Part A questions ask what someone <b>suggests</b> or what someone <b>will probably do</b>. Listen for the words that signal a suggestion or a plan.",
  steps:["<b>Why don't you... / How about... / Maybe you should...</b> = a suggestion.","<b>I'll... / I'm going to...</b> = a plan or decision. Listen for who says it.","<b>We'd better...</b> = we should (a strong suggestion).","Listen to the <b>last speaker</b>. The next action is often there."],
  traps:["The person who <b>suggests</b> something is not always the person who <b>does</b> it.","Don't choose something that was only mentioned, such as an idea that was rejected."],
  tip:"Ask: who will do what? Then match the option to that person.",
  stimuli:[
    lessonStim("short","Short conversation 1 of 3","M: I'm having trouble with this math problem.|F: Why don't you ask the teaching assistant?"),
    lessonStim("short","Short conversation 2 of 3","F: The sky looks dark. Do you think it will rain?|M: Probably. I'll get the umbrellas from the car."),
    lessonStim("short","Short conversation 3 of 3","M: The movie starts at seven-thirty and it's already seven.|F: Then we'd better leave right now.")
  ],
  practice:[
    lq(0,LT4,"What does the woman suggest?","Asking the teaching assistant for help.",["Giving up on the problem.","Asking the teacher to leave.","Doing the problem tomorrow."],"'Why don't you ask...?' is a suggestion. She suggests he ask the teaching assistant."),
    lq(1,LT4,"What will the man do?","Bring umbrellas from the car.",["Wait for the rain to stop.","Buy new umbrellas.","Drive the woman home."],"'I'll get the umbrellas from the car' is his plan."),
    lq(2,LT4,"What does the woman mean?","They should leave immediately.",["They should skip the movie.","They have plenty of time.","They should watch the movie at home."],"'We'd better leave right now' is a strong suggestion. The movie is about to start.")
  ]
},
{
  id:"long", title:LT5, level:3,
  blurb:"Parts B and C: how to follow a longer conversation or talk.",
  idea:"In Part B and Part C you hear a longer conversation or talk, then answer several questions. You cannot hear it again, so you need a plan.",
  steps:["<b>Before it plays:</b> think about the situation (students? a lecture?). This helps you predict the words.","<b>The first sentences</b> usually tell you the main topic.","<b>While it plays:</b> write short notes: key words, numbers, names. Don't write full sentences.","<b>Questions follow the order</b> of the talk, so answer them in order."],
  traps:["Numbers, days and times are often changed or corrected. Listen for the final version.","In 'NOT' questions, three things were said and one was not.","If you miss a detail, don't stop. Keep listening for the next one."],
  tip:"Take notes in short words. 'Thurs 4:30' is faster than a sentence.",
  stimuli:[
    lessonStim("talk","Talk","S: Next Friday our class will visit the science museum. The bus leaves from the front of the school at eight in the morning, so please arrive by seven-forty-five. The museum has a special exhibit on space, and we have tickets for a planetarium show at eleven. Students should bring lunch, because the cafeteria at the museum is expensive. We'll be back at school by three o'clock. Please bring the signed permission form by Wednesday.")
  ],
  practice:[
    lq(0,LT5,"What is the talk mainly about?","Plans for a class trip",["A new science exhibit","The price of lunch","A space lesson at school"],"The speaker explains when and how the class will go to the museum."),
    lq(0,LT5,"What time does the bus leave?","Eight in the morning",["Seven-forty-five","Eleven","Three in the afternoon"],"The bus leaves at eight. Students arrive by seven-forty-five, which is earlier. Eleven is the show, and three is the return time."),
    lq(0,LT5,"What must students bring by Wednesday?","A signed permission form",["Money for lunch","A ticket","A science project"],"The speaker says to bring the signed permission form by Wednesday. Lunch is to be brought on the trip, not by Wednesday.")
  ]
}
];
