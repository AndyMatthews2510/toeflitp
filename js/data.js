"use strict";
/* Content for the TOEFL ITP Structure practice site. All items are original. */

/* ---------------- LESSONS ---------------- */
var LESSONS = [
{
  id:"agreement", title:"Matching verbs to subjects", level:1,
  blurb:"One person or thing, or more than one? The verb has to agree.",
  idea:"A verb has to match its <b>subject</b> (the person or thing doing the action). One person or thing needs a verb that ends in <b>-s</b> (<i>she works</i>). More than one needs the plain verb (<i>they work</i>). The hard part is finding the <b>real</b> subject, because the test hides it behind extra words.",
  patterns:[
    {rule:"Ignore the extra words between the subject and the verb.", good:["The <b>key</b> to the cabinets <b>is</b> on the desk."], bad:["The key to the cabinets <b>are</b> on the desk."]},
    {rule:"'Along with', 'together with' and 'as well as' do not make a subject plural.", good:["The <b>author</b>, along with her editors, <b>is</b> here."], bad:["The author, along with her editors, <b>are</b> here."]},
    {rule:"'The number of' means one number, so the verb is singular. 'A number of' means 'many', so the verb is plural.", good:["The number of students <b>has</b> grown.","A number of students <b>have</b> complained."], bad:["The number of students <b>have</b> grown."]},
    {rule:"With 'neither... nor', the verb agrees with the closer subject.", good:["Neither the manager nor the <b>assistants were</b> there."], bad:["Neither the manager nor the assistants <b>was</b> there."]},
    {rule:"Each, every, and everyone are singular.", good:["<b>Each</b> of the players <b>wears</b> a blue shirt."], bad:["Each of the players <b>wear</b> a blue shirt."]},
    {rule:"Pronouns (he, it, them) must match what they point to.", good:["The <b>tickets</b> were expensive, but we bought <b>them</b>."], bad:["The tickets were expensive, but we bought <b>it</b>."]}
  ],
  traps:["The word right before the verb is often <b>not</b> the subject. Cross out phrases like 'of the cabinets' and 'along with her editors'.","A singular subject with a plural noun nearby is the classic trick."],
  tip:"In Part B, find the verb first, then ask 'Who or what is doing this?' Ignore everything between them.",
  practice:[
    {part:"A",stem:"The key to the cabinets ______ on the desk.",opts:["are","is","were","have been"],ans:1,why:"The real subject is 'key' (one thing), not 'cabinets'. Ignore 'to the cabinets'. One key goes with 'is'."},
    {part:"B",text:"The teacher, {A:together with} her students, {B:are} {C:visiting} {D:the museum}.",ans:1,why:"'Together with her students' is extra information. The subject is 'the teacher' (one person), so use 'is'.",fix:"The teacher, together with her students, is visiting the museum."},
    {part:"A",stem:"A number of students ______ asked for more time.",opts:["has","have","is","was"],ans:1,why:"'A number of' means 'many', so the verb is plural: 'have asked'."},
    {part:"B",text:"{A:Each of} the players {B:in} the team {C:wear} a {D:blue shirt}.",ans:2,why:"'Each' means each one separately, so the verb is singular: 'wears'.",fix:"Each of the players in the team wears a blue shirt."}
  ]
},
{
  id:"tenses", title:"Verb tenses", level:1,
  blurb:"Past, present, and the 'had' and 'have' forms that show up again and again.",
  idea:"Tenses tell us <b>when</b> something happens. The test uses the same few patterns many times, so learn these and look for the time clues in the sentence.",
  patterns:[
    {rule:"<b>For</b> + a length of time. <b>Since</b> + a starting point.", good:["She has worked here <b>for</b> three years.","She has worked here <b>since</b> 2023."], bad:["She has worked here <b>since</b> three years."]},
    {rule:"Use <b>had + verb</b> for the earlier of two past events.", good:["When we arrived, the film <b>had</b> already <b>started</b>."], bad:["When we arrived, the film already <b>started</b>."]},
    {rule:"Use <b>have/has + verb</b> to connect the past to now.", good:["I <b>have lived</b> here for five years. (I still live here.)"], bad:["I <b>lived</b> here for five years. (this means I don't live here now)"]},
    {rule:"After when, before, after, and as soon as, talk about the future with the <b>present</b> form.", good:["I will call you when I <b>get</b> home."], bad:["I will call you when I <b>will get</b> home."]}
  ],
  traps:["Time clues: <i>since, for, by the time, already, yesterday, ago, until</i>. Circle them first.","'By the time we arrived' usually needs <b>had</b> in the other part."],
  tip:"Find the time clue, then pick the tense that fits it.",
  practice:[
    {part:"A",stem:"She has worked at the hospital ______ 2019.",opts:["for","since","during","from since"],ans:1,why:"'2019' is a starting point in time, so use 'since'. Use 'for' with a length of time, like 'for six years'."},
    {part:"A",stem:"By the time the police arrived, the thief ______.",opts:["already escaped","has already escaped","had already escaped","already escapes"],ans:2,why:"The thief escaped before the police arrived. For the earlier event, use 'had' + verb: 'had already escaped'."},
    {part:"B",text:"{A:I will call} you {B:when} I {C:will get} {D:home}.",ans:2,why:"After 'when', use the present form even for the future: 'when I get home'.",fix:"I will call you when I get home."},
    {part:"B",text:"They {A:have lived} in Chiang Mai {B:since} {C:ten} {D:years}.",ans:1,why:"'Ten years' is a length of time, so use 'for'. 'Since' needs a starting point such as 'since 2015'.",fix:"They have lived in Chiang Mai for ten years."}
  ]
},
{
  id:"wordforms", title:"Describing words and action words", level:1,
  blurb:"Quick or quickly? Bored or boring? Pick the right form.",
  idea:"The same idea can have different word forms. A <b>describing word</b> (adjective) tells us about a thing: <i>a quick answer</i>. An <b>-ly word</b> (adverb) tells us about an action: <i>she answered quickly</i>. The test checks that you pick the right form for the job.",
  patterns:[
    {rule:"Before a noun, use the describing word.", good:["The company reported <b>rapid</b> growth."], bad:["The company reported <b>rapidly</b> growth."]},
    {rule:"To describe an action, use the -ly word.", good:["The children listened <b>carefully</b>."], bad:["The children listened <b>careful</b>."]},
    {rule:"-ed describes how a person feels. -ing describes what causes the feeling.", good:["I was <b>bored</b>. The film was <b>boring</b>.","He is <b>interested</b> in Thai. Thai is <b>interesting</b>."], bad:["I was <b>boring</b> by the film."]},
    {rule:"After be, seem, feel, and become, use a describing word.", good:["The soup <b>smells good</b>.","She <b>became angry</b>."], bad:["She became <b>angrily</b>."]}
  ],
  traps:["'Fast' stays 'fast' (not 'fastly'). 'Hard' and 'hardly' mean different things.","If a word ends in -ly, check what it describes. Is it a thing or an action?"],
  tip:"Ask: is this word describing a thing (noun) or an action (verb)? Then choose the form.",
  practice:[
    {part:"A",stem:"The company reported ______ growth last year.",opts:["rapidly","rapid","rapidness","rapids"],ans:1,why:"'Growth' is a noun, so you need a describing word before it: 'rapid growth'."},
    {part:"A",stem:"The children listened ______ to the story.",opts:["careful","carefulness","carefully","care"],ans:2,why:"'Listened' is an action, so use the -ly word that describes it: 'carefully'."},
    {part:"B",text:"The film was so {A:boring} that I {B:felt} {C:very} {D:boring}.",ans:3,why:"This describes how the person feels, so use 'bored'. 'Boring' describes the thing that causes the feeling (the film).",fix:"The film was so boring that I felt very bored."},
    {part:"B",text:"{A:The scientists} {B:worked} {C:careful} to {D:avoid mistakes}.",ans:2,why:"'Worked' is an action, so use the -ly word: 'carefully'.",fix:"The scientists worked carefully to avoid mistakes."}
  ]
},
{
  id:"counting", title:"Counting words", level:1,
  blurb:"Many or much? Number or amount? Some words just can't be counted.",
  idea:"Some nouns can be counted: <i>one book, two books</i>. Some cannot: <i>information, advice, water, furniture</i>. The test checks that you use the right small words with each kind.",
  patterns:[
    {rule:"Things you can count: <b>many, a few, fewer, a number of</b>.", good:["A large <b>number</b> of <b>people</b> came."], bad:["A large <b>amount</b> of people came."]},
    {rule:"Things you can't count: <b>much, a little, less, an amount of</b>.", good:["There isn't <b>much</b> time left.","A large <b>amount</b> of money was lost."], bad:["There isn't <b>many</b> time left."]},
    {rule:"These words have <b>no -s</b> and take a singular verb: <i>information, advice, news, furniture, equipment, homework, research</i>.", good:["The <b>information is</b> helpful."], bad:["The <b>informations are</b> helpful."]},
    {rule:"To count them, add 'a piece of': <i>a piece of advice</i>.", good:["She gave me <b>a piece of advice</b>."], bad:["She gave me <b>an advice</b>."]}
  ],
  traps:["'People' is plural: 'many people', 'a number of people'.","'News' looks plural but is singular: 'The news is good.'"],
  tip:"Ask: 'Can I put a number in front of it?' Two books, yes. Two informations, no.",
  practice:[
    {part:"A",stem:"She gave me some useful ______ about the visa.",opts:["advices","advice","an advice","advises"],ans:1,why:"'Advice' cannot be counted and has no plural form. 'Some useful advice' is correct."},
    {part:"A",stem:"There isn't ______ time left.",opts:["many","a number of","much","few"],ans:2,why:"'Time' cannot be counted here, so use 'much'. 'Many', 'a number of' and 'few' go with things you can count."},
    {part:"B",text:"The {A:equipments} {B:in} the lab {C:is} {D:very modern}.",ans:0,why:"'Equipment' cannot be counted, so it has no -s. (The verb 'is' is then correct.)",fix:"The equipment in the lab is very modern."},
    {part:"B",text:"{A:A large amount of} students {B:joined} {C:the} {D:club}.",ans:0,why:"Students can be counted, so use 'a large number of'. 'Amount of' is for things you can't count.",fix:"A large number of students joined the club."}
  ]
},
{
  id:"linking", title:"Linking words", level:1,
  blurb:"Although, despite, because of: choose by what comes after.",
  idea:"Linking words join ideas. Many have the same meaning but need <b>different words after them</b>. This is one of the most reliable ways the test catches mistakes.",
  patterns:[
    {rule:"<b>Despite / in spite of</b> + a noun or an -ing word.", good:["<b>Despite</b> the rain, we went out.","<b>In spite of</b> being tired, she worked."], bad:["<b>Despite of</b> the rain, we went out."]},
    {rule:"<b>Although / even though / while</b> + a full sentence (subject + verb).", good:["<b>Although</b> it rained, we went out."], bad:["<b>Although</b> the rain, we went out."]},
    {rule:"<b>Because</b> + a full sentence. <b>Because of</b> + a noun.", good:["We stayed in <b>because it was raining</b>.","We stayed in <b>because of the rain</b>."], bad:["We stayed in <b>because the rain</b>."]},
    {rule:"<b>Whereas / while</b> show a contrast between two facts.", good:["Tom likes tea, <b>whereas</b> Ann likes coffee."], bad:[]},
    {rule:"Use only one link. 'Although... but' is wrong.", good:["<b>Although</b> it was expensive, we bought it."], bad:["Although it was expensive, <b>but</b> we bought it."]}
  ],
  traps:["'Despite of' does not exist. Say 'despite' or 'in spite of'.","'In spite the rain' is missing 'of'."],
  tip:"Look at what comes right after the linking word. A noun (the rain)? Or a full sentence (it rained)?",
  practice:[
    {part:"A",stem:"______ she was tired, she finished the report.",opts:["Despite","Because of","Although","In spite"],ans:2,why:"'She was tired' is a full sentence, so you need 'although'. 'Despite' and 'because of' go before a noun, and 'in spite' needs 'of'."},
    {part:"A",stem:"The flight was delayed ______ the storm.",opts:["because","because of","although","despite of"],ans:1,why:"'The storm' is a noun, so use 'because of'. 'Because' needs a full sentence after it."},
    {part:"B",text:"{A:Even though} he was ill, {B:but} he {C:went} {D:to work}.",ans:1,why:"'Even though' and 'but' both link the two ideas, so you only need one. Remove 'but'.",fix:"Even though he was ill, he went to work."},
    {part:"B",text:"{A:In spite} the {B:cold weather}, they {C:played} {D:outside}.",ans:0,why:"The phrase is 'in spite of', not 'in spite'.",fix:"In spite of the cold weather, they played outside."}
  ]
},
{
  id:"compare", title:"Comparing things", level:2,
  blurb:"Taller than, the tallest, the more... the more...",
  idea:"When you compare, the form of the word depends on <b>how many things</b> you compare, and the two things must be the same kind.",
  patterns:[
    {rule:"Two things: <b>-er / more</b> + <b>than</b>.", good:["This laptop is <b>cheaper than</b> that one.","It is <b>more expensive than</b> mine."], bad:["This laptop is <b>more cheap</b> than that one."]},
    {rule:"Three or more things: <b>the -est / the most</b>.", good:["Mai is <b>the most talented</b> student in the class."], bad:["Mai is the more talented student in the class."]},
    {rule:"Choosing between exactly two: <b>the more</b>.", good:["She is <b>the more intelligent</b> of the two candidates."], bad:["She is the most intelligent of the two candidates."]},
    {rule:"<b>The more... the more...</b> shows two things changing together.", good:["<b>The harder</b> you practice, <b>the better</b> you become."], bad:["The harder you practice, <b>more better</b> you become."]},
    {rule:"Compare the same kinds of things. Use <b>that of</b> (one) or <b>those of</b> (many).", good:["The climate in Bangkok is hotter than <b>that in</b> London.","The salaries in Canada are higher than <b>those in</b> Thailand."], bad:["The salaries in Canada are higher than <b>Thailand</b>."]}
  ],
  traps:["Never put 'more' and '-er' together ('more better').","'Than' can't compare 'salaries' with 'Thailand'. Compare salaries with salaries."],
  tip:"Count the things being compared. Two? Use the -er form. Three or more? Use the -est form.",
  practice:[
    {part:"A",stem:"This laptop is ______ than that one.",opts:["more cheap","cheaper","cheapest","the cheaper"],ans:1,why:"You compare two things, and 'cheap' is short, so add -er: 'cheaper than'."},
    {part:"A",stem:"Of all the students in the class, Mai is ______.",opts:["more talented","the more talented","the most talented","most talented than"],ans:2,why:"She is compared with all the students (many), so use 'the most talented'."},
    {part:"B",text:"{A:The salaries} in Canada are {B:higher} {C:than} {D:Thailand}.",ans:3,why:"You must compare salaries with salaries: 'those in Thailand'. Comparing salaries with a country is a mismatch.",fix:"The salaries in Canada are higher than those in Thailand."},
    {part:"B",text:"{A:The harder} you {B:practice}, {C:more better} you {D:become}.",ans:2,why:"The pattern is 'the + comparative, the + comparative'. Don't use 'more' with 'better'. Say 'the better you become'.",fix:"The harder you practice, the better you become."}
  ]
},
{
  id:"ifsent", title:"If sentences", level:2,
  blurb:"If I had known... The verbs change depending on how real the idea is.",
  idea:"An <b>if</b> sentence has two parts. The verb forms depend on whether the idea is possible, imaginary now, or imaginary in the past. Memorize the three patterns below.",
  patterns:[
    {rule:"<b>Possible</b> (now or future): If + present, will + verb.", good:["If it rains tomorrow, we <b>will cancel</b> the picnic."], bad:["If it will rain tomorrow, we will cancel the picnic."]},
    {rule:"<b>Imaginary now</b>: If + past form, would + verb.", good:["If I <b>had</b> more money, I <b>would buy</b> a new car."], bad:["If I would have more money, I would buy a new car."]},
    {rule:"<b>Imaginary in the past</b>: If + <b>had</b> + verb, would have + verb.", good:["If I <b>had known</b>, I <b>would have called</b> you."], bad:["If I <b>would have known</b>, I would have called you."]}
  ],
  traps:["Never put 'would' in the 'if' part. 'If I would have known' is common in speech but is marked wrong on the test.","Look at the 'if' part first. If you see 'had + verb', the other part needs 'would have + verb'."],
  tip:"Match the pair: had + verb goes with would have + verb.",
  practice:[
    {part:"A",stem:"If it rains tomorrow, we ______ the picnic.",opts:["will cancel","would cancel","would have cancelled","cancelled"],ans:0,why:"Tomorrow is possible, so use 'if' + present, and 'will' in the other part."},
    {part:"A",stem:"If I ______ more money, I would buy a new car.",opts:["have","had","would have","will have"],ans:1,why:"The idea is imaginary now, so use the past form 'had' after 'if', and 'would' in the other part."},
    {part:"B",text:"If she {A:had studied} harder, she {B:will pass} {C:the exam} {D:easily}.",ans:1,why:"'Had studied' is about the imaginary past, so the other part needs 'would have + verb': 'would have passed'.",fix:"If she had studied harder, she would have passed the exam easily."},
    {part:"B",text:"{A:If they would have} left earlier, they {B:would have caught} {C:the} {D:train}.",ans:0,why:"Never use 'would' in the 'if' part. Use 'had': 'If they had left earlier'.",fix:"If they had left earlier, they would have caught the train."}
  ]
},
{
  id:"ingto", title:"-ing or to + verb", level:2,
  blurb:"Enjoy doing or decide to do? Some verbs need -ing, some need to.",
  idea:"When two verbs sit together, the second one changes form depending on the first. You need to know the common ones, and you need to watch for the little word <b>to</b>, which is sometimes a different kind of word.",
  patterns:[
    {rule:"These verbs are followed by <b>-ing</b>: enjoy, avoid, finish, suggest, mind, keep, consider.", good:["She <b>avoided talking</b> to him."], bad:["She avoided <b>to talk</b> to him."]},
    {rule:"These verbs are followed by <b>to + verb</b>: want, plan, decide, hope, need, agree, refuse, manage.", good:["We <b>decided to postpone</b> the trip."], bad:["We decided <b>postponing</b> the trip."]},
    {rule:"<b>Make</b> and <b>let</b> + person + the plain verb (no 'to').", good:["The teacher <b>made</b> us <b>rewrite</b> it.","The manager <b>let</b> the staff <b>leave</b> early."], bad:["The teacher made us <b>to rewrite</b> it."]},
    {rule:"After a preposition (in, at, of, about, to), use <b>-ing</b>.", good:["He is good <b>at playing</b> chess.","She is interested <b>in learning</b> Thai."], bad:["He is good at <b>to play</b> chess."]},
    {rule:"The purpose of... is <b>to + verb</b>.", good:["The purpose of the meeting is <b>to discuss</b> the budget."], bad:["The purpose of the meeting is <b>discussing</b> the budget."]}
  ],
  traps:["Sometimes <b>to</b> is a preposition, not part of a verb: <i>look forward <b>to meeting</b></i>, <i>be used <b>to working</b></i>.","Test: can you put a noun after 'to'? 'Look forward to the party' works, so use -ing."],
  tip:"If the word before is 'to', ask: could a noun go here? If yes, use -ing.",
  practice:[
    {part:"A",stem:"She avoided ______ to him about the problem.",opts:["to talk","talking","talk","talked"],ans:1,why:"'Avoid' is followed by an -ing word: 'avoided talking'."},
    {part:"A",stem:"We decided ______ the trip until spring.",opts:["postponing","to postpone","postpone","postponed"],ans:1,why:"'Decide' is followed by 'to + verb': 'decided to postpone'."},
    {part:"B",text:"He is {A:good} at {B:to play} {C:chess} {D:every day}.",ans:1,why:"After a preposition like 'at', use the -ing form: 'good at playing'.",fix:"He is good at playing chess every day."},
    {part:"B",text:"The {A:manager} {B:let} {C:the staff} {D:to leave} early.",ans:3,why:"After 'let', use the plain verb with no 'to': 'let the staff leave'.",fix:"The manager let the staff leave early."}
  ]
},
{
  id:"who", title:"Who, which, whose", level:2,
  blurb:"Words that add extra information about a person or thing.",
  idea:"<b>Who, which, that,</b> and <b>whose</b> start a group of words that tells us more about a noun. Choosing the right one depends on whether the noun is a person or thing, and whether there is a comma.",
  patterns:[
    {rule:"<b>Who</b> = people. <b>Which</b> = things. <b>That</b> = either, but never after a comma.", good:["The woman <b>who</b> called is my aunt.","The book <b>which</b> I bought was expensive.","My brother, <b>who</b> lives in Perth, is a doctor."], bad:["My brother, <b>that</b> lives in Perth, is a doctor."]},
    {rule:"<b>Whose</b> + noun means 'belonging to'.", good:["The woman <b>whose</b> car was stolen called the police."], bad:["The woman <b>who's</b> car was stolen called the police."]},
    {rule:"<b>Which</b> after a comma can refer to a whole idea.", good:["Bags are banned, <b>which</b> has reduced litter."], bad:["Bags are banned, <b>that</b> has reduced litter."]},
    {rule:"Don't say the noun twice.", good:["The book <b>which I bought</b> was expensive."], bad:["The book which I bought <b>it</b> was expensive."]},
    {rule:"You can shorten the group of words.", good:["The documents <b>that were sent</b> yesterday → The documents <b>sent</b> yesterday"], bad:[]}
  ],
  traps:["'What' never starts one of these groups ('the book what I read' is wrong).","Look for a comma. A comma rules out 'that'."],
  tip:"Look at the word before: person or thing? Then check for a comma and for belonging ('whose').",
  practice:[
    {part:"A",stem:"The woman ______ car was stolen called the police.",opts:["who","which","whose","whom"],ans:2,why:"The car belongs to the woman, so use 'whose' before the noun 'car'."},
    {part:"A",stem:"My brother, ______ lives in Perth, is a doctor.",opts:["that","which","who","whose"],ans:2,why:"Your brother is a person, so use 'who'. 'That' cannot be used after a comma."},
    {part:"B",text:"{A:The book} which {B:I} {C:bought} {D:it} yesterday was expensive.",ans:3,why:"'Which' already stands for the book, so don't add 'it'. Say 'which I bought'.",fix:"The book which I bought yesterday was expensive."},
    {part:"B",text:"She lost her job, {A:that} {B:made} her {C:very} {D:upset}.",ans:0,why:"'That' cannot be used after a comma. Use 'which' to refer to the whole situation.",fix:"She lost her job, which made her very upset."}
  ]
},
{
  id:"lists", title:"Lists that match", level:2,
  blurb:"Items in a list must have the same form.",
  idea:"When you list things or join them with <b>and</b> or <b>or</b>, every item should have the <b>same form</b>. The mistake is usually hiding in the last item.",
  patterns:[
    {rule:"Same ending: -ing, -ing, -ing.", good:["She likes <b>hiking, swimming, and reading</b>."], bad:["She likes hiking, swimming, and <b>to read</b>."]},
    {rule:"Same pattern: to + verb, to + verb.", good:["He wants <b>to travel, to learn, and to relax</b>."], bad:[]},
    {rule:"Pairs need the same form on both sides: both... and, either... or, not only... but also.", good:["The phone is both <b>cheap</b> and <b>reliable</b>.","She is not only <b>intelligent</b> but also <b>kind</b>."], bad:["The phone is both cheap and <b>it is reliable</b>.","She is not only intelligent but also <b>kindness</b>."]},
    {rule:"Descriptive words go with descriptive words, nouns with nouns.", good:["You need to be <b>patient, creative, and organized</b>."], bad:["You need to be patient, creative, and <b>organization</b>."]}
  ],
  traps:["Read the first item. Then check that the last item looks the same.","In long sentences, the list can be far from the start. Look for 'and' and 'or'."],
  tip:"Read the first item, then make the last item match it.",
  practice:[
    {part:"A",stem:"The job requires you to be patient, creative, and ______.",opts:["organize","organization","organized","to organize"],ans:2,why:"'Patient' and 'creative' are describing words, so the last item must be one too: 'organized'."},
    {part:"A",stem:"She is not only intelligent but also ______.",opts:["kindness","kind","she is kind","being kind"],ans:1,why:"'Intelligent' is a describing word, so the other half of the pair must be one too: 'kind'."},
    {part:"B",text:"He likes {A:playing} football, {B:watching} movies, and {C:to read} {D:novels}.",ans:2,why:"The first two items end in -ing, so the last one should too: 'reading'.",fix:"He likes playing football, watching movies, and reading novels."},
    {part:"B",text:"The new phone is {A:both} {B:cheap} {C:and} {D:it is reliable}.",ans:3,why:"After 'both... and', both sides must have the same form: 'cheap' and 'reliable'.",fix:"The new phone is both cheap and reliable."}
  ]
},
{
  id:"embedded", title:"Questions inside sentences", level:2,
  blurb:"'Where is the bank?' becomes '...where the bank is.'",
  idea:"A question usually flips the order of the words: <i>Where is the bank?</i> But when a question sits <b>inside</b> a longer sentence, the order goes back to normal (subject, then verb), and there is no do/does/did.",
  patterns:[
    {rule:"Normal question → inside a sentence: use statement order.", good:["Could you tell me <b>where the bank is</b>?","Nobody knows <b>why the experiment failed</b>."], bad:["Could you tell me <b>where is the bank</b>?","Nobody knows <b>why did the experiment fail</b>."]},
    {rule:"No do / does / did inside.", good:["I wonder <b>how she did it</b>."], bad:["I wonder <b>how did she do it</b>."]},
    {rule:"For yes/no questions, use <b>if</b> or <b>whether</b>.", good:["She asked me <b>if</b> I had finished."], bad:["She asked me <b>did</b> I finish."]}
  ],
  traps:["Watch for 'know, wonder, ask, tell me, not sure'. These signal an inside question.","Only a real, direct question flips the order."],
  tip:"After know, wonder, ask or tell me: subject first, verb second.",
  practice:[
    {part:"A",stem:"Could you tell me ______?",opts:["where is the bank","where the bank is","where does the bank is","where the bank does"],ans:1,why:"After 'tell me', use statement order: 'where the bank is'."},
    {part:"A",stem:"She asked me ______ I had finished the report.",opts:["that","if","what","why did"],ans:1,why:"This is a yes/no question inside a sentence, so use 'if' (or 'whether')."},
    {part:"B",text:"{A:Can you} {B:tell me} {C:where} {D:is the station}?",ans:3,why:"After 'tell me', the order goes back to normal: 'where the station is'.",fix:"Can you tell me where the station is?"},
    {part:"B",text:"She {A:asked} me {B:how} {C:long} {D:had I lived} there.",ans:3,why:"Inside a sentence, use statement order: 'how long I had lived there'.",fix:"She asked me how long I had lived there."}
  ]
},
{
  id:"suggest", title:"The 'suggest that' pattern", level:3,
  blurb:"After 'recommend that' or 'it is essential that', use the plain verb.",
  idea:"After certain words of advice or necessity, the next verb takes its <b>plain form</b>: no -s, no -ed, no 'to'. This looks wrong in everyday English, but it is the correct form for the test.",
  patterns:[
    {rule:"Verbs: suggest, recommend, insist, demand, require, propose, ask + <b>that</b> + subject + plain verb.", good:["The doctor recommended that he <b>take</b> more rest.","The teacher insisted that every student <b>follow</b> the rules."], bad:["The doctor recommended that he <b>takes</b> more rest."]},
    {rule:"Adjectives: essential, important, vital, necessary, crucial + <b>that</b> + plain verb.", good:["It is vital that the report <b>be</b> submitted on time."], bad:["It is vital that the report <b>is</b> submitted on time."]},
    {rule:"No 'to' after 'that'.", good:["The committee requires that all members <b>attend</b>."], bad:["The committee requires that all members <b>to attend</b>."]},
    {rule:"For 'no', put 'not' in front of the plain verb.", good:["He insisted that she <b>not</b> go."], bad:[]}
  ],
  traps:["Don't add -s for he, she or 'every student': 'insisted that every student <b>follow</b>'.","The verb 'be' stays as 'be' ('that the report <b>be</b> submitted')."],
  tip:"See 'recommend that' or 'essential that'? Look for the plain verb.",
  practice:[
    {part:"A",stem:"The teacher insisted that every student ______ the rules.",opts:["follows","followed","follow","to follow"],ans:2,why:"After 'insist that', use the plain verb, even with 'every student': 'follow'."},
    {part:"A",stem:"It is vital that the report ______ on time.",opts:["is submitted","be submitted","will submit","was submitted"],ans:1,why:"After 'it is vital that', use the plain form of the verb: 'be submitted'."},
    {part:"B",text:"The doctor {A:suggested} that {B:he} {C:takes} {D:more rest}.",ans:2,why:"After 'suggest that', use the plain verb with no -s: 'take'.",fix:"The doctor suggested that he take more rest."},
    {part:"B",text:"{A:The committee} {B:requires} that {C:all members} {D:to attend}.",ans:3,why:"After 'require that', use the plain verb with no 'to': 'attend'.",fix:"The committee requires that all members attend."}
  ]
},
{
  id:"flip", title:"Flipped word order", level:3,
  blurb:"'Never have I seen...' Some openings make you flip the order.",
  idea:"Normally the subject comes first: <i>I have never seen it.</i> But when a sentence <b>starts</b> with certain 'almost not' words, the helper verb jumps in front of the subject: <i>Never have I seen it.</i>",
  patterns:[
    {rule:"Trigger words: never, rarely, seldom, hardly, scarcely, little, not only, not until, no sooner, only when.", good:["<b>Never have I</b> seen such a view.","<b>Rarely do we</b> eat out."], bad:["Never I have seen such a view.","Rarely we eat out."]},
    {rule:"No helper verb in the sentence? Add do, does, or did.", good:["Not until the plane landed <b>did she hear</b> the news."], bad:["Not until the plane landed she heard the news."]},
    {rule:"Fixed pairs: no sooner... <b>than</b>, hardly / scarcely... <b>when</b>.", good:["<b>No sooner had</b> she sat down <b>than</b> the phone rang.","<b>Hardly had</b> we started <b>when</b> it began to rain."], bad:["No sooner had she sat down <b>when</b> the phone rang."]}
  ],
  traps:["Only the main part flips. In 'Not until the plane landed <b>did she hear</b>', the 'not until' part stays normal.","Don't forget the second part: 'no sooner' needs 'than'."],
  tip:"A sentence that opens with Never, Rarely, Not until, or No sooner? Expect a helper verb next.",
  practice:[
    {part:"A",stem:"Never ______ such a beautiful sunset.",opts:["I have seen","have I seen","I had seen","seen have I"],ans:1,why:"'Never' at the start flips the order: helper verb first, then the subject: 'have I seen'."},
    {part:"A",stem:"Not until the plane landed ______ the news.",opts:["she heard","heard she","did she hear","she did hear"],ans:2,why:"'Not until' at the start flips the order in the main part. Use 'did' + subject + plain verb: 'did she hear'."},
    {part:"B",text:"{A:Hardly} had we {B:started} {C:than} {D:it began} to rain.",ans:2,why:"'Hardly' goes with 'when', not 'than'. (Only 'no sooner' uses 'than'.)",fix:"Hardly had we started when it began to rain."},
    {part:"B",text:"{A:Seldom we eat} out {B:because} {C:it is} {D:expensive}.",ans:0,why:"'Seldom' at the start flips the order: 'do we eat'.",fix:"Seldom do we eat out because it is expensive."}
  ]
},
{
  id:"opening", title:"Opening -ing phrases", level:3,
  blurb:"'Walking home, I saw...' Who is doing the action?",
  idea:"A sentence can start with a short phrase like <i>Having finished the exam,</i> or <i>Walking home,</i>. The person doing that action <b>must come right after the comma</b>.",
  patterns:[
    {rule:"The first noun after the comma is the one doing the action.", good:["<b>Walking</b> home, <b>I</b> saw an accident."], bad:["Walking home, <b>an accident</b> happened."]},
    {rule:"Same with 'Having + verb'.", good:["<b>Having finished</b> the exam, <b>the students</b> left."], bad:["Having finished the exam, <b>the room</b> was left by the students."]},
    {rule:"Same with short descriptions like 'Tired after the trip,'.", good:["<b>Tired</b> after the long trip, <b>Sam</b> went to bed."], bad:["Tired after the long trip, <b>the bed</b> looked inviting."]}
  ],
  traps:["It sounds fine when you read fast. Slow down and ask 'Who is doing it?'","'Having missed the bus, the taxi was the only choice' is wrong: the taxi didn't miss the bus."],
  tip:"Ask: who is doing the action in the opening phrase? That person goes after the comma.",
  practice:[
    {part:"A",stem:"Walking along the beach, ______.",opts:["a strange shell was found by Anna","Anna found a strange shell","the shell was strange to Anna","a strange shell caught"],ans:1,why:"Who was walking? Anna. So 'Anna' must come right after the comma."},
    {part:"A",stem:"Having missed the bus, ______.",opts:["the taxi was Tom's only option","Tom took a taxi","a late arrival was unavoidable","the lesson started without him"],ans:1,why:"Who missed the bus? Tom. So 'Tom' must come right after the comma."},
    {part:"B",text:"{A:Reading} the newspaper, {B:the coffee} {C:got} {D:cold}.",ans:1,why:"A coffee can't read a newspaper. A person has to come after the comma, such as 'Dan'.",fix:"Reading the newspaper, Dan let his coffee get cold."},
    {part:"B",text:"{A:Tired} after the long trip, {B:the bed} {C:looked} {D:very inviting}.",ans:1,why:"Who was tired? A person. The bed can't be tired, so a person must come after the comma.",fix:"Tired after the long trip, Sam thought the bed looked very inviting."}
  ]
}
];

/* ---------------- TEST 1 (feedback written in plain language) ---------------- */
var TEST1 = [
/* PART A */
{part:"A",topic:"Questions inside sentences",stem:"Nobody knows ______ the experiment failed.",opts:["why did","why","because","the reason why did"],ans:1,why:"After words like 'know', the question turns into a normal statement. Use the usual order (subject, then verb) and don't add 'did'. Say: why the experiment failed."},
{part:"A",topic:"Linking words",stem:"______ the heavy rain, the match went ahead as planned.",opts:["Despite","Although","However","Because"],ans:0,why:"'Despite' is followed by a noun (the heavy rain). 'Although' needs a full sentence after it, such as 'Although it rained heavily'."},
{part:"A",topic:"Who, which, whose",stem:"The report, ______ was submitted last week, contains several errors.",opts:["who","what","which","it"],ans:2,why:"Use 'which' for things and 'who' for people. A report is a thing, so: 'The report, which was submitted last week...'"},
{part:"A",topic:"Flipped word order",stem:"Rarely ______ such a talented young pianist.",opts:["we have seen","have we seen","we saw","did we seen"],ans:1,why:"When a sentence starts with an 'almost not' word like rarely, never or seldom, the helper verb jumps in front of the subject: 'have we seen', not 'we have seen'."},
{part:"A",topic:"If sentences",stem:"If the manager ______ earlier, she would have approved the budget.",opts:["arrived","has arrived","had arrived","would arrive"],ans:2,why:"This is about something that did not happen in the past. The pattern is: If + had + verb (If she had arrived), ... would have + verb (would have approved)."},
{part:"A",topic:"Comparing things",stem:"Sound travels faster in water ______ in air.",opts:["than","that","as","then"],ans:0,why:"After a comparing word like 'faster' or 'bigger', use 'than' to name what you are comparing with."},
{part:"A",topic:"The 'suggest that' pattern",stem:"It is essential that every student ______ the form before Friday.",opts:["submits","submitted","will submit","submit"],ans:3,why:"After 'it is essential that' (and 'suggest that', 'insist that'), use the plain verb with no -s, even with 'every student'. So: 'every student submit'."},
{part:"A",topic:"Linking words",stem:"Some species of birds migrate thousands of kilometers, ______ others stay in the same area all year.",opts:["whereas","because","so","unless"],ans:0,why:"'Whereas' shows a contrast between two facts: some birds migrate, but others stay. 'Because', 'so' and 'unless' do not show a contrast."},
{part:"A",topic:"Comparing things",stem:"The more you practice, ______ you become.",opts:["the confident","more confident","the more confident","most confident"],ans:2,why:"The pattern is 'the more... the more...'. So: 'The more you practice, the more confident you become.'"},
{part:"A",topic:"Who, which, whose",stem:"Dr. Chen is one of the scientists ______ research on coral reefs has won international awards.",opts:["who","whom","whose","which"],ans:2,why:"'Whose' means 'belonging to' and comes before a noun. The research belongs to the scientists, so: 'whose research'."},
{part:"A",topic:"Opening -ing phrases",stem:"Having finished the exam, ______.",opts:["the room was left by the students","the students left the room","the room left the students","leaving was the students' choice"],ans:1,why:"The person doing the action in the opening phrase must come right after the comma. Who finished the exam? The students. So the next words are 'the students'."},
{part:"A",topic:"Who, which, whose",stem:"Plastic bags are banned in many cities, ______ has reduced litter significantly.",opts:["that","which","what","it"],ans:1,why:"After a comma, 'which' can refer to a whole idea (bags being banned). 'That' cannot be used after a comma."},
{part:"A",topic:"Who, which, whose",stem:"The documents ______ yesterday were confidential.",opts:["that were sent","sending","what sent","were sent"],ans:0,why:"'That were sent yesterday' tells us which documents. Without 'that', the sentence would have two verbs in a row ('were sent... were confidential') and would not work."},
{part:"A",topic:"Lists that match",stem:"She enjoys hiking, swimming, and ______ in the evening.",opts:["to read","reads","reading","read"],ans:2,why:"Items in a list should have the same form. 'Hiking' and 'swimming' end in -ing, so the last item should too: 'reading'."},
{part:"A",topic:"Flipped word order",stem:"Not until the results were published ______ the error.",opts:["the researchers noticed","noticed the researchers","did the researchers notice","the researchers did notice"],ans:2,why:"'Not until' at the start flips the order in the main part: did + subject + plain verb. So: 'did the researchers notice'."},

/* PART B */
{part:"B",topic:"Counting words",text:"{A:Every students} in the class must {B:submit} a report {C:by} {D:Friday}.",ans:0,why:"'Every' is followed by one person or thing, so the noun is singular: 'every student', not 'every students'.",fix:"Every student in the class must submit a report by Friday."},
{part:"B",topic:"The 'suggest that' pattern",text:"{A:The professor} {B:recommended} that {C:the} students {D:to read} the first three chapters.",ans:3,why:"After 'recommend that', use the plain verb with no 'to': 'the students read'.",fix:"The professor recommended that the students read the first three chapters."},
{part:"B",topic:"Linking words",text:"{A:Despite of} the traffic, {B:we} {C:arrived} at the airport {D:on time}.",ans:0,why:"Say 'despite' or 'in spite of'. Don't say 'despite of'.",fix:"Despite the traffic, we arrived at the airport on time."},
{part:"B",topic:"Describing words and action words",text:"{A:The number of} people {B:using} public transportation {C:has} increased {D:sharp} in recent years.",ans:3,why:"'Increased' is an action, so you need the -ly word that describes it: 'sharply', not 'sharp'.",fix:"The number of people using public transportation has increased sharply in recent years."},
{part:"B",topic:"Matching verbs to subjects",text:"Neither the manager {A:nor} the assistants {B:was} {C:aware of} the {D:change}.",ans:1,why:"With 'neither... nor', make the verb match the closer subject. 'The assistants' is plural, so use 'were'.",fix:"Neither the manager nor the assistants were aware of the change."},
{part:"B",topic:"Comparing things",text:"She {A:is} {B:the most} intelligent {C:of} the two {D:candidates}.",ans:1,why:"When you compare only two things, use 'more' (the more intelligent). Use 'most' for three or more.",fix:"She is the more intelligent of the two candidates."},
{part:"B",topic:"Verb tenses",text:"The scientists {A:have been} {B:working} on the project {C:since} {D:three years}.",ans:2,why:"Use 'for' with a length of time (for three years). Use 'since' with a starting point (since 2023).",fix:"The scientists have been working on the project for three years."},
{part:"B",topic:"Matching verbs to subjects",text:"{A:Because of} the {B:company's} financial difficulties, many employees {C:was} {D:laid off}.",ans:2,why:"'Many employees' is plural, so the verb is 'were'.",fix:"Because of the company's financial difficulties, many employees were laid off."},
{part:"B",topic:"Comparing things",text:"The climate in Bangkok is {A:much} hotter {B:than} {C:those} in {D:London}.",ans:2,why:"The sentence compares one climate with another climate, so use 'that', which means 'the climate'. 'Those' is for plural things.",fix:"The climate in Bangkok is much hotter than that in London."},
{part:"B",topic:"-ing or to + verb",text:"The students {A:are} looking forward {B:to} {C:meet} {D:the guest speaker}.",ans:2,why:"In 'look forward to', the word 'to' is a preposition, not part of a verb. After it, use the -ing form: 'meeting'.",fix:"The students are looking forward to meeting the guest speaker."},
{part:"B",topic:"Describing words and action words",text:"The report was {A:such} long {B:that} nobody {C:finished} {D:it}.",ans:0,why:"Use 'so' before a describing word (so long). Use 'such' before a noun (such a long report).",fix:"The report was so long that nobody finished it."},
{part:"B",topic:"Counting words",text:"{A:The} {B:informations} about the course {C:are} available on {D:the website}.",ans:1,why:"'Information' has no plural form: never 'informations'. Because it is one idea, the verb is also 'is' (The information is available).",fix:"The information about the course is available on the website."},
{part:"B",topic:"-ing or to + verb",text:"The company {A:which} {B:I} work for {C:is} planning {D:to expanding} overseas.",ans:3,why:"After 'plan to', use the plain verb: 'to expand', not 'to expanding'.",fix:"The company which I work for is planning to expand overseas."},
{part:"B",topic:"Matching verbs to subjects",text:"{A:Unlike} {B:his brother}, Tom {C:never} {D:like} spicy food.",ans:3,why:"Tom is one person, so the verb ends in -s: 'likes'.",fix:"Unlike his brother, Tom never likes spicy food."},
{part:"B",topic:"Matching verbs to subjects",text:"The author, {A:along with} {B:her} editors, {C:are} {D:attending} the book fair.",ans:2,why:"The subject is 'the author' (one person). 'Along with her editors' is extra information and does not make the subject plural. So: 'is attending'.",fix:"The author, along with her editors, is attending the book fair."},
{part:"B",topic:"Flipped word order",text:"{A:No sooner} had she {B:sat down} {C:when} the phone {D:rang}.",ans:2,why:"'No sooner' always goes with 'than': 'No sooner had she sat down than the phone rang.'",fix:"No sooner had she sat down than the phone rang."},
{part:"B",topic:"Describing words and action words",text:"She spoke {A:so} {B:quick} that {C:nobody} {D:understood}.",ans:1,why:"'Spoke' is an action, so use the -ly word that describes it: 'quickly'.",fix:"She spoke so quickly that nobody understood."},
{part:"B",topic:"Verb tenses",text:"By the time we {A:arrived}, the movie {B:already started} {C:and} everyone {D:was seated}.",ans:1,why:"The movie started before we arrived. When one past event happens before another, use 'had' + verb for the earlier one: 'had already started'.",fix:"By the time we arrived, the movie had already started and everyone was seated."},
{part:"B",topic:"Describing words and action words",text:"He is {A:interesting} {B:in} {C:learning} {D:Thai}.",ans:0,why:"Use 'interested' to say how a person feels. Use 'interesting' for the thing that causes the feeling (an interesting language).",fix:"He is interested in learning Thai."},
{part:"B",topic:"Matching verbs to subjects",text:"The teacher {A:made} the students {B:rewrite} their essays {C:until} they {D:was} satisfied.",ans:3,why:"'They' is plural, so use 'were': 'until they were satisfied'.",fix:"The teacher made the students rewrite their essays until they were satisfied."},
{part:"B",topic:"If sentences",text:"{A:If} I {B:would have} {C:known} about the delay, I {D:would have called} you.",ans:1,why:"In the 'if' part of this kind of sentence, use 'had' + verb: 'If I had known'. Save 'would have' for the other part.",fix:"If I had known about the delay, I would have called you."},
{part:"B",topic:"Counting words",text:"A large {A:amount} of {B:people} {C:attended} the {D:lecture}.",ans:0,why:"Use 'number of' with things you can count (people). Use 'amount of' with things you can't count (water, time).",fix:"A large number of people attended the lecture."},
{part:"B",topic:"Describing words and action words",text:"The {A:rapidly} {B:growth} of the {C:city} has {D:created} housing problems.",ans:0,why:"Before a noun like 'growth', use a describing word: 'rapid growth'. 'Rapidly' describes actions.",fix:"The rapid growth of the city has created housing problems."},
{part:"B",topic:"Matching verbs to subjects",text:"Although the tickets were expensive, {A:we} {B:still} {C:bought} {D:it}.",ans:3,why:"'Tickets' is plural, so the word that stands for them must be plural too: 'them'.",fix:"Although the tickets were expensive, we still bought them."},
{part:"B",topic:"-ing or to + verb",text:"The {A:purpose} of the meeting {B:is} {C:discussing} {D:the budget}.",ans:2,why:"After 'the purpose of the meeting is', use 'to' + verb: 'to discuss'.",fix:"The purpose of the meeting is to discuss the budget."}
];
