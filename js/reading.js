"use strict";
/* Reading Comprehension content. All passages and questions are original.
   Each question lists the correct answer first; the app shuffles the options every attempt. */

function rq(pid,topic,stem,correct,wrongs,why){
  return {part:"R",pid:pid,topic:topic,stem:stem,opts:[correct].concat(wrongs),ans:0,why:why};
}
var T_MAIN="Finding the main idea", T_DETAIL="Finding details (and NOT questions)", T_VOCAB="Words in context",
    T_REF="What does it refer to?", T_PURPOSE="Why did the author say that?", T_INFER="Reading between the lines";

/* ---------------- READING TEST 1: five passages ---------------- */
var RPASS=[
{title:"Passage 1: Rooftop Gardens in Cities",paras:[
"In many large cities, empty land is rare and expensive, so people have started looking up. Rooftop gardens turn unused roofs into places where vegetables, flowers, and even small trees can grow. What began as a hobby for a few apartment dwellers has become a serious part of city planning in places such as Singapore, Toronto, and New York.",
"Rooftop gardens offer several benefits. Plants absorb sunlight that would otherwise heat the building, so the rooms below stay cooler in summer and owners spend less on air conditioning. The soil also soaks up rainwater, which reduces the amount that rushes into the drains during storms. In addition, a garden can provide fresh food for residents and a quiet place to relax, something that is hard to find at street level.",
"However, building a garden on a roof is not simple. A layer of wet soil is extremely heavy, and many older buildings cannot carry the extra weight. Engineers must first check the structure and often add supports. Gardeners must also protect the roof from leaks by installing special waterproof layers beneath the soil. Because roofs are [[exposed]] to strong wind and sun, only tough plants survive there, and [[they]] need regular watering.",
"Despite these difficulties, interest keeps growing. Some cities now offer financial help to owners who build green roofs, and a few require them on new buildings. Supporters argue that the [[initial]] cost is repaid over time through lower energy bills and a longer-lasting roof, since plants protect the surface from the weather."
]},
{title:"Passage 2: The Printing Press",paras:[
"Before the fifteenth century, books in Europe were copied by hand, usually by monks working in quiet rooms called scriptoriums. Copying a single large book could take many months, so books were rare and very costly. Only churches, universities, and wealthy families could afford more than a few.",
"Around 1440, a German goldsmith named Johannes Gutenberg developed a new way to make books. His key idea was movable type: small metal blocks, each carrying a single letter, that could be arranged into words and lines. Once a page had been printed, the letters could be taken apart and used again for the next page. Gutenberg also [[adapted]] a wine press to push the inked type firmly onto paper.",
"The effects were [[dramatic]]. A printing shop could produce hundreds of identical copies in the time it once took a scribe to finish one. Prices fell, and more people learned to read because books were suddenly within their reach. Within fifty years, printing shops had opened in hundreds of towns across Europe.",
"Printing also changed how ideas traveled. Scientists could share discoveries quickly and check one another's work, and religious reformers such as Martin Luther were able to spread their writings far beyond their home towns. Historians often describe the press as one of the most important inventions in history because [[it]] made knowledge cheaper, faster to share, and harder for any single authority to control."
]},
{title:"Passage 3: Coral Reefs and Warming Seas",paras:[
"Coral reefs cover less than one percent of the ocean floor, yet they are home to about a quarter of all marine species. Fish, crabs, sea turtles, and thousands of other creatures depend on reefs for food and shelter. Reefs also protect coastlines by weakening waves before they reach the shore, and they support the fishing and tourism industries of many countries.",
"A coral reef is built by tiny animals called polyps. Each polyp lives in a hard skeleton that [[it]] produces itself, and over hundreds of years these skeletons pile up to form the reef. Inside the polyps live microscopic algae that give the coral its bright colors. The algae make food from sunlight and share it with the polyp, while the polyp provides the algae with a safe home.",
"This partnership is [[delicate]]. When the water becomes even slightly too warm, the polyps [[expel]] the algae, and the coral turns white. This process is known as bleaching. A bleached coral is not dead, but without its algae it is starving. If the water cools within a few weeks, the algae can return and the coral may recover. If the heat lasts, the coral dies.",
"Scientists have recorded several major bleaching events in recent decades, usually during years when ocean temperatures were unusually high. Some reefs recovered slowly, but others have been badly damaged. Researchers are now testing ways to help reefs survive, such as breeding heat-resistant corals. Most agree, however, that these methods will only work if the warming of the oceans slows."
]},
{title:"Passage 4: How Memory Works",paras:[
"Memory is not a single recording device. Psychologists describe it as a system with several stages. Information first enters short-term memory, where it stays for only a few seconds unless a person pays attention to it. Only some of this information moves on to long-term memory, where it can last for years.",
"Moving information into long-term memory requires effort and time. One reason is that the brain strengthens new memories mainly while a person is resting, especially during sleep. Studies have shown that students who sleep after studying often remember more the next day than students who stay awake all night.",
"The way people practice also matters. Many students study the same material for several hours the night before an exam, a habit often called cramming. Research suggests that [[this method]] produces memories that [[fade]] quickly. A better [[approach]] is spaced practice, in which a learner reviews the material for short periods spread over several days or weeks. Each review makes the memory harder to forget, so less time is needed overall.",
"Another useful technique is to test yourself instead of simply rereading notes. Trying to recall an answer is difficult, but that difficulty is exactly what makes the memory stronger. Rereading, by contrast, feels easy and gives learners the false impression that they already know the material. Therefore, many teachers now encourage students to use practice questions throughout the course rather than only at the end."
]},
{title:"Passage 5: Standard Time",paras:[
"Today, a traveler can cross a continent and adjust a watch only at certain borders. This convenience is surprisingly recent. In the early nineteenth century, each town set its clocks by the sun, which meant that noon in one town occurred a few minutes earlier or later than noon in a town to the east or west. For people who rarely traveled more than a day's walk from home, such small differences were of little importance.",
"The arrival of the railways changed this situation. A train might pass through dozens of towns in a single journey, and each town kept its own time. Timetables became confusing, and mistakes in scheduling sometimes caused accidents on tracks shared by several companies. Some railway companies tried to solve the problem by running their trains on a single 'railway time' based on the clock at their headquarters, but passengers still had to deal with several different systems.",
"In North America, the railways eventually agreed to divide the continent into zones, each using a standard time that differed from its neighbor's by exactly one hour. The new system began on November 18, 1883. Although it was not required by law at first, most towns accepted it because it made travel so much easier. Some people [[objected]], arguing that it was unnatural for clocks to ignore the sun's position, but their protests had little effect.",
"The idea soon spread beyond one continent. In 1884, delegates from many countries met in Washington and agreed to measure time around the world from a single starting line passing through Greenwich, England. Nations did not all adopt [[the arrangement]] immediately, and some took decades to do so. Nevertheless, the meeting laid the [[foundation]] for the time zones that organize daily life across the globe today."
]}
];

var RTEST_QS=[
/* Passage 1 */
rq(0,T_MAIN,"What is the passage mainly about?","How and why people grow gardens on city rooftops",["How to grow vegetables cheaply at home","Why older buildings need to be replaced","The history of city planning in Singapore"],"The passage explains what rooftop gardens are, their benefits, their difficulties, and why interest is growing. The other choices are too narrow or are not discussed."),
rq(0,T_DETAIL,"According to paragraph 2, how do rooftop gardens help keep rooms cool?","Plants absorb sunlight that would heat the building",["They block wind from reaching the building","They trap cold air under the soil","They reflect rain away from the roof"],"Paragraph 2 says plants absorb sunlight that would otherwise heat the building, so the rooms below stay cooler."),
rq(0,T_DETAIL,"Why must engineers check a building before a rooftop garden is built?","Wet soil is very heavy and the building may not be able to carry it",["The plants could damage the street below","Wind may blow the soil away","Older buildings are not allowed to have gardens"],"Paragraph 3 says wet soil is extremely heavy and many older buildings cannot carry the extra weight."),
rq(0,T_DETAIL,"Which of the following is NOT mentioned as a benefit of rooftop gardens?","Higher rents for apartment owners",["Lower air-conditioning costs","Less rainwater rushing into drains","A quiet place to relax"],"Cooler rooms and lower air-conditioning costs, less rain in the drains, and a place to relax are all in paragraph 2. Rent is never mentioned."),
rq(0,T_VOCAB,"The word 'exposed' in paragraph 3 is closest in meaning to","open to",["joined to","hidden from","similar to"],"'Exposed to strong wind and sun' means the roof has no protection from them. It is open to them."),
rq(0,T_VOCAB,"The word 'initial' in paragraph 4 is closest in meaning to","first",["total","yearly","unexpected"],"'Initial cost' means the cost at the start, the first cost."),
rq(0,T_REF,"The word 'they' in paragraph 3 refers to","tough plants",["roofs","gardeners","engineers"],"The sentence says only tough plants survive there, 'and they need regular watering'. 'They' points back to the plants."),
rq(0,T_PURPOSE,"Why does the author mention Singapore, Toronto, and New York in paragraph 1?","To show that rooftop gardens are part of planning in real cities",["To compare which city has the most gardens","To explain where the first rooftop garden was built","To suggest that only large cities can have them"],"The cities are examples that show rooftop gardens are now a serious part of city planning, not just a hobby."),
rq(0,T_INFER,"What can be inferred about older buildings from paragraph 3?","Some of them may need extra work before they can hold a garden",["They can never have a garden","They are cooler than newer buildings","They never leak"],"Paragraph 3 says many older buildings cannot carry the weight and engineers often add supports. So some need extra work first. It does not say they can never have gardens."),
rq(0,T_INFER,"What does the passage suggest about the cost of rooftop gardens?","They cost a lot at first but may save money later",["They are always cheaper than ground gardens","They cost nothing to keep up","They are too expensive for any owner to build"],"Paragraph 4 says supporters believe the first cost is repaid through lower energy bills and a longer-lasting roof."),

/* Passage 2 */
rq(1,T_MAIN,"What is the main idea of the passage?","Gutenberg's printing method made books cheaper and changed how ideas spread",["Monks were the best copyists in Europe","Wine presses were the most important invention of the 1400s","Martin Luther was the first person to use a printing press"],"The passage describes how books were made before, how Gutenberg changed that, and how printing affected learning and ideas."),
rq(1,T_DETAIL,"According to paragraph 1, why were books rare before printing?","Each one had to be copied by hand, which took many months",["Few people in Europe knew how to read","Churches did not allow people to own books","Paper was not yet available"],"Paragraph 1 says copying one large book could take many months, so books were rare and costly."),
rq(1,T_DETAIL,"How did Gutenberg's movable type work?","Single-letter metal blocks were arranged into pages and then used again",["A whole page was carved from one block of wood","Scribes copied pages faster using metal pens","Letters were pressed into wet clay and baked"],"Paragraph 2 says small metal blocks, each with one letter, were arranged into words and lines, then taken apart and reused."),
rq(1,T_DETAIL,"Which of the following is NOT mentioned as a result of the printing press?","Monks stopped working in scriptoriums",["Books became cheaper","More people learned to read","Scientists shared discoveries more quickly"],"Cheaper books and more readers are in paragraph 3, and quicker sharing by scientists is in paragraph 4. Nothing is said about monks stopping their work."),
rq(1,T_VOCAB,"The word 'adapted' in paragraph 2 is closest in meaning to","changed for a new use",["copied without permission","sold to a customer","damaged badly"],"A wine press was made for wine. Gutenberg changed it so it could press type onto paper."),
rq(1,T_VOCAB,"The word 'dramatic' in paragraph 3 is closest in meaning to","very large",["hard to see","expected by everyone","unpopular"],"The next sentences describe hundreds of copies instead of one and falling prices. These are very large changes."),
rq(1,T_REF,"The word 'it' in paragraph 4 refers to","the press",["history","knowledge","any single authority"],"Historians describe the press as important because 'it' made knowledge cheaper. 'It' means the press."),
rq(1,T_PURPOSE,"Why does the author mention Martin Luther?","To give an example of someone who used printing to spread ideas",["To show that printing began in Germany","To explain how metal type was made","To criticize religious reformers"],"Luther is an example of a reformer who could spread his writings far beyond his home town because of printing."),
rq(1,T_INFER,"What can be inferred about books in the 1300s?","Most ordinary people did not own books",["Books were printed in large numbers","Most books were about science","Books were cheaper than in 1500"],"Paragraph 1 says books were rare and costly, and only churches, universities, and wealthy families could afford more than a few. So ordinary people mostly did not own them."),
rq(1,T_INFER,"What does the author suggest about knowledge after the printing press?","It became harder for one group to control",["It became less reliable","It was limited to wealthy families","It spread more slowly than before"],"The last sentence says the press made knowledge 'harder for any single authority to control'."),

/* Passage 3 */
rq(2,T_MAIN,"What is the passage mainly about?","Why coral reefs matter and how warm water threatens them",["How sea turtles find food on reefs","Why tourism is the best use of coral reefs","How to build an artificial reef"],"The passage describes the importance of reefs, how coral lives, and how warming water causes bleaching."),
rq(2,T_DETAIL,"According to paragraph 1, how do reefs help protect coastlines?","They weaken waves before the waves reach the shore",["They keep the water cool","They stop fishing boats from coming close","They stop sand from moving"],"Paragraph 1 says reefs protect coastlines by weakening waves before they reach the shore."),
rq(2,T_DETAIL,"What do the algae do for the coral?","They make food from sunlight and give the coral its color",["They build the hard skeleton","They protect the coral from fish","They keep the water warm"],"Paragraph 2 says the algae give the coral its colors and make food from sunlight that they share with the polyp. The polyp builds the skeleton."),
rq(2,T_DETAIL,"Which of the following is NOT true of bleached coral?","It is already dead",["It has lost its algae","It turns white","It may recover if the water cools"],"Paragraph 3 says a bleached coral is not dead, but it is starving. It can recover if the water cools."),
rq(2,T_VOCAB,"The word 'delicate' in paragraph 3 is closest in meaning to","easily damaged",["very old","brightly colored","expensive to study"],"The next sentence shows that a small rise in temperature breaks the partnership, so it is easily damaged."),
rq(2,T_VOCAB,"The word 'expel' in paragraph 3 is closest in meaning to","push out",["take in","feed","protect"],"The polyps push the algae out. Then the coral turns white, because the algae gave it color."),
rq(2,T_REF,"The word 'it' in paragraph 2 refers to","each polyp",["a hard skeleton","the reef","the algae"],"'Each polyp lives in a hard skeleton that it produces itself.' The polyp makes the skeleton."),
rq(2,T_PURPOSE,"Why does the author explain how polyps and algae live together in paragraph 2?","To prepare the reader to understand why warm water causes bleaching",["To show that algae are more important than polyps","To describe how fast reefs grow","To argue that reefs should be protected by law"],"Paragraph 3 depends on the partnership explained in paragraph 2: bleaching happens when the polyps push out the algae."),
rq(2,T_INFER,"What can be inferred about a reef where the water stays too warm for a long time?","Many of its corals will probably die",["It will grow faster","Its fish will become brighter","It will turn into a different kind of reef"],"Paragraph 3 says that if the heat lasts, the coral dies."),
rq(2,T_INFER,"What does the author suggest about heat-resistant corals?","They will not be enough if ocean warming continues",["They have already solved the bleaching problem","They are cheaper than other reef animals","Scientists are not interested in them"],"The last sentence says most researchers agree these methods will only work if the warming slows."),

/* Passage 4 */
rq(3,T_MAIN,"What is the main idea of the passage?","Memory works in stages, and some study habits help information last longer",["Cramming is the best way to prepare for exams","Sleep is more important than studying","Short-term memory lasts for several years"],"The passage explains how memory works and then describes study habits (sleep, spaced practice, self-testing) that strengthen it."),
rq(3,T_DETAIL,"According to paragraph 1, what happens to information in short-term memory if a person does not pay attention to it?","It is lost after a few seconds",["It moves to long-term memory","It stays for several years","It becomes stronger"],"Paragraph 1 says information stays in short-term memory for only a few seconds unless a person pays attention."),
rq(3,T_DETAIL,"According to paragraph 3, what is spaced practice?","Reviewing material in short sessions over several days or weeks",["Studying for many hours the night before a test","Resting for a few days before studying anything","Studying the same page again and again in one sitting"],"Paragraph 3 describes spaced practice as reviewing the material for short periods spread over several days or weeks."),
rq(3,T_DETAIL,"Which of the following is NOT mentioned as a way to improve memory?","Studying in a quiet room",["Sleeping after studying","Spreading study over several days","Testing yourself with practice questions"],"The passage mentions sleep (paragraph 2), spaced practice (paragraph 3), and self-testing (paragraph 4). A quiet room is never mentioned."),
rq(3,T_VOCAB,"The word 'fade' in paragraph 3 is closest in meaning to","become weaker",["become louder","change color","grow longer"],"Memories that 'fade quickly' are forgotten quickly. They become weaker."),
rq(3,T_VOCAB,"The word 'approach' in paragraph 3 is closest in meaning to","method",["journey","problem","opinion"],"'A better approach' means a better way of doing something, a better method."),
rq(3,T_REF,"The phrase 'this method' in paragraph 3 refers to","studying for hours the night before an exam",["spaced practice","sleeping after studying","rereading notes"],"The sentence before describes cramming. 'This method' points back to it."),
rq(3,T_PURPOSE,"Why does the author mention rereading notes in paragraph 4?","To describe a common habit that feels useful but is less effective",["To show that rereading is better than testing","To explain how long-term memory works","To recommend that students stop studying"],"Paragraph 4 says rereading feels easy and gives the false impression that learners already know the material."),
rq(3,T_INFER,"What can be inferred about a student who crams the night before an exam?","The student may forget much of the material soon after the exam",["The student will remember the material for years","The student will need less total study time than others","The student has used spaced practice"],"Paragraph 3 says cramming produces memories that fade quickly."),
rq(3,T_INFER,"Which idea would the author most likely support?","Giving students short quizzes throughout a course",["Giving one large test at the end of a course","Telling students to reread their notes many times","Telling students to study all night before a test"],"Paragraph 4 explains that testing yourself makes memory stronger and that teachers now use practice questions throughout the course."),

/* Passage 5 */
rq(4,T_MAIN,"What is the main idea of the passage?","Railways created a need for standard time, and the idea later spread around the world",["Railways were the safest way to travel in the 1800s","Greenwich was the first town to have a clock","People in North America disliked clocks"],"The passage follows the story from local sun time, to railway problems, to standard time zones in North America, to the world."),
rq(4,T_DETAIL,"According to paragraph 1, why did differences between local times matter little in the early 1800s?","Most people rarely traveled far from home",["Few towns had clocks","Everyone used the same railway time","The differences were several hours"],"Paragraph 1 says people who rarely traveled more than a day's walk from home had little reason to care about small differences."),
rq(4,T_DETAIL,"According to paragraph 2, what problem did the railways face?","Different local times made timetables confusing and sometimes caused accidents",["Trains were too slow to follow a timetable","Passengers refused to buy tickets","Railway headquarters had no clocks"],"Paragraph 2 says each town kept its own time, so timetables were confusing and scheduling mistakes sometimes caused accidents."),
rq(4,T_DETAIL,"Which of the following is NOT mentioned in paragraph 3?","Railway workers went on strike to protest the change",["Each zone differed from its neighbor by one hour","The new system began in 1883","Most towns accepted it even though no law required it"],"The other three are all in paragraph 3. Strikes are not mentioned."),
rq(4,T_VOCAB,"The word 'objected' in paragraph 3 is closest in meaning to","disagreed",["agreed","apologized","volunteered"],"These people argued against standard time, so they disagreed with it."),
rq(4,T_VOCAB,"The word 'foundation' in paragraph 4 is closest in meaning to","basis",["building","reward","delay"],"'Laid the foundation for' means created the basis for something that came later."),
rq(4,T_REF,"The phrase 'the arrangement' in paragraph 4 refers to","measuring time from a line through Greenwich",["dividing North America into zones","running trains on railway time","setting clocks by the sun"],"In the sentence before, the delegates agreed to measure time from a single line through Greenwich. 'The arrangement' means this agreement."),
rq(4,T_PURPOSE,"Why does the author mention 'railway time' in paragraph 2?","To show that one company's solution did not fully solve the problem",["To prove that railway companies cooperated well","To explain how the sun sets the time","To describe the first time zones"],"The author says passengers still had to deal with several different systems, so railway time did not fix the whole problem."),
rq(4,T_INFER,"What can be inferred about the 1883 system from paragraph 3?","It succeeded mainly because people found it useful, not because it was forced",["It was opposed by the railways","It was required by law from the first day","It was soon replaced by railway time"],"Paragraph 3 says it was not required by law at first, yet most towns accepted it because it made travel easier."),
rq(4,T_INFER,"What does paragraph 4 suggest about the 1884 meeting?","It had a lasting influence even though countries joined at different speeds",["It failed because few countries agreed","It forced every nation to change at once","It was held mainly to settle railway timetables"],"Paragraph 4 says nations did not all adopt it immediately and some took decades, but the meeting laid the foundation for today's time zones.")
];

/* ---------------- READING SKILL LESSONS ---------------- */
var RLESSONS=[
{
  id:"main", title:T_MAIN, level:1,
  blurb:"What is the whole passage about?",
  idea:"The <b>main idea</b> is the one big point that the whole passage is about. Everything else in the passage supports it.",
  steps:["Read the first and last sentence of each paragraph. The main idea is often there.","Ask yourself: 'If I had to say what this passage is about in one sentence, what would I say?'","Check each answer. The right answer covers the <b>whole</b> passage, not just one part."],
  traps:["<b>Too small:</b> an answer that is only one detail (for example, only color change).","<b>Too big:</b> an answer that says more than the passage says.","<b>Not in the passage:</b> an answer that sounds true but is never discussed."],
  tip:"On the real test, the main idea question is often the first one for each passage. Answer it after you read, then move on.",
  passage:{title:"The Octopus",paras:["The octopus is one of the most intelligent animals without a backbone. In laboratory tests, octopuses have learned to open jars, find their way through mazes, and recognize individual people. They can also change color in less than a second to hide from enemies. Although an octopus lives only a few years, it learns quickly throughout its short life, and scientists continue to study how its unusual brain works."]},
  practice:[
    rq(0,T_MAIN,"What is the main idea of the passage?","The octopus is an unusually intelligent animal",["Octopuses can change color very quickly","Octopuses live for only a few years","Octopuses are the largest animals in the sea"],"Every sentence supports the idea that octopuses are intelligent. Color change and short life are details, and the passage never says octopuses are the largest."),
    rq(0,T_MAIN,"Which would be the best title for the passage?","A Clever Animal Without a Backbone",["How Octopuses Hide From Enemies","The Short Life of an Octopus","Tests With Jars and Mazes"],"The best title covers the whole passage. The other titles describe only one detail."),
    rq(0,T_MAIN,"Which detail best supports the idea that octopuses are intelligent?","They have learned to open jars and find their way through mazes",["They can change color in less than a second","They live only a few years","They have no backbone"],"Opening jars and solving mazes are signs of intelligence. The other details are true but do not show intelligence.")
  ]
},
{
  id:"detail", title:T_DETAIL, level:1,
  blurb:"Find the fact in the passage, and handle 'NOT' questions.",
  idea:"A <b>detail question</b> asks for a fact that is written in the passage. You don't need to guess. You need to find the right sentence.",
  steps:["Find the key words in the question (names, places, numbers).","Look for those words in the passage. Read the sentence before and after them too.","Choose the answer that says the same thing in different words."],
  traps:["Wrong answers often use exact words from the passage but change the meaning.","For <b>NOT</b> questions, three answers are in the passage and one is not. Check each answer one by one.","A fact can be true in real life but not in the passage. Use only the passage."],
  tip:"Don't choose an answer just because you recognize the words. Check that the meaning matches.",
  passage:{title:"Tea",paras:["Tea was first grown in China, and by the eighth century it had become a popular drink there. Traders later carried tea to Japan and Europe. In Britain it became a fashionable drink in the 1700s. Today, India, Kenya, and Sri Lanka are among the largest tea producers in the world."]},
  practice:[
    rq(0,T_DETAIL,"According to the passage, where was tea first grown?","China",["Japan","Britain","India"],"The first sentence says tea was first grown in China."),
    rq(0,T_DETAIL,"When did tea become fashionable in Britain?","In the 1700s",["By the eighth century","In the 1500s","Only in recent years"],"The passage says it became fashionable in Britain in the 1700s. The eighth century is about China."),
    rq(0,T_DETAIL,"Which of the following is NOT mentioned in the passage?","Tea was once used as money in Britain",["Traders carried tea to Japan and Europe","Tea was popular in China by the eighth century","Kenya is one of the largest tea producers today"],"The other three are in the passage. Nothing is said about tea being used as money.")
  ]
},
{
  id:"vocab", title:T_VOCAB, level:1,
  blurb:"What does this word mean in this sentence?",
  idea:"A <b>vocabulary question</b> asks what a word means <b>in this sentence</b>. Many words have more than one meaning, so the sentence decides.",
  steps:["Find the word in the passage (it is marked in bold) and read the whole sentence.","Cover the word and guess what would fit.","Choose the option that fits <b>this</b> sentence, then put it in place of the word to test it."],
  traps:["The most common meaning of a word is often wrong. 'Board' can mean a piece of wood or a group of managers.","Don't choose an option just because it looks like the word.","If you don't know the word, use the sentences around it for clues."],
  tip:"Put your choice into the sentence. If it sounds right and keeps the same meaning, it is probably correct.",
  passage:{title:"The New Library",paras:["The town's old library was too small for its growing population, so the council decided to build a new one. The project was expensive, but most [[residents]] supported it because they believed it would [[benefit]] children and older people alike. When the building opened, it quickly became a popular meeting place. Visitors praised its bright reading rooms, and the number of members [[doubled]] within a year."]},
  practice:[
    rq(0,T_VOCAB,"The word 'residents' is closest in meaning to","people who live in a place",["people who visit a place","people who build things","people who work in libraries"],"The residents supported a project for their town, so they are the people who live there."),
    rq(0,T_VOCAB,"The word 'benefit' is closest in meaning to","help",["bother","replace","surprise"],"People supported the library because they thought it would help children and older people."),
    rq(0,T_VOCAB,"The word 'doubled' is closest in meaning to","became twice as large",["became half as large","stayed the same","became a little larger"],"Doubled means became two times as many. The library was popular, so membership grew a lot.")
  ]
},
{
  id:"ref", title:T_REF, level:2,
  blurb:"What does 'it', 'they', 'which' or 'this' point back to?",
  idea:"A <b>reference question</b> asks what a small word like <i>it, they, them, which, this</i> points back to. The answer is almost always <b>before</b> the word.",
  steps:["Find the marked word and read the whole sentence.","Look back for a noun (or idea) that matches: one or many, person or thing.","Put your answer in place of the word and read the sentence again. It should make sense."],
  traps:["There may be two or three possible nouns. The closest one is not always correct.","'It', 'this' and 'which' can point to a whole idea, not just one word.","Check singular and plural. 'Them' needs a plural."],
  tip:"Replace the small word with your answer. If the sentence still makes sense, you found it.",
  passage:{title:"Bamboo",paras:["Bamboo grows faster than almost any other plant. Some kinds can grow nearly a meter in a single day. Its stems are hollow, [[which]] makes [[them]] light but surprisingly strong. Builders in many countries value bamboo for [[this reason]], and farmers like it because it needs little water. For these reasons, bamboo is now used to make everything from houses to clothing."]},
  practice:[
    rq(0,T_REF,"The word 'which' in the passage refers to","the fact that its stems are hollow",["bamboo growing quickly","a single day","some kinds of bamboo"],"'Which' points back to the whole idea that the stems are hollow. That fact makes them light."),
    rq(0,T_REF,"The word 'them' in the passage refers to","stems",["kinds","builders","meters"],"'Makes them light' means makes the stems light. 'Them' is plural, and 'stems' is the plural noun just before it."),
    rq(0,T_REF,"The phrase 'this reason' in the passage refers to","the stems are light but strong",["bamboo grows very fast","bamboo needs little water","builders live in many countries"],"'Builders value bamboo for this reason' points back to the sentence before: the stems are light but strong. The reason for farmers (little water) comes after.")
  ]
},
{
  id:"purpose", title:T_PURPOSE, level:2,
  blurb:"What job does this sentence or detail do?",
  idea:"A <b>purpose question</b> asks <b>why</b> the author wrote something: to give an example, to explain a reason, to compare, or to finish an idea. It asks about the job a sentence does, not just the topic.",
  steps:["Find the sentence or detail in the question.","Ask: what job is it doing? An example? A reason? A result? A solution?","Look at linking words: <i>for example, however, therefore, in addition</i>."],
  traps:["Don't choose an answer that only repeats the topic. Choose the one that describes the job.","Watch for answers that describe something the author never does (for example, 'to argue').","Organization questions ask for the plan of the whole passage, such as problem and solution, comparison, or time order."],
  tip:"Finish the sentence 'The author says this in order to...'. The best answer completes it.",
  passage:{title:"Noise in Cities",paras:["Noise is a growing problem in cities. A busy street can be loud enough to disturb sleep, and constant noise can make people tired and stressed. To reduce the problem, some cities have planted rows of trees along roads and built walls beside highways. These steps cannot remove noise completely, but they help."]},
  practice:[
    rq(0,T_PURPOSE,"Why does the author mention trees and walls?","To give examples of how cities try to reduce noise",["To show that trees make noise","To explain why cities are growing","To prove that noise cannot be reduced"],"The trees and walls are examples of the steps some cities take to reduce noise."),
    rq(0,T_PURPOSE,"Why does the author write the last sentence?","To say that the solutions are useful but limited",["To say the problem is solved","To say that cities should stop building walls","To compare two kinds of noise"],"The last sentence says the steps cannot remove noise completely, but they help. So they are useful but limited."),
    rq(0,T_PURPOSE,"How is the passage organized?","A problem is described, and then some solutions are given",["A story is told in time order","Two cities are compared","A theory is tested with an experiment"],"The passage begins with the noise problem and then describes what cities do to reduce it.")
  ]
},
{
  id:"infer", title:T_INFER, level:3,
  blurb:"What is not said directly, but must be true?",
  idea:"An <b>inference question</b> asks what must be true, or is very likely true, even though the passage does not say it directly. You use clues.",
  steps:["Find the clues in the passage (facts, actions, details).","Ask: 'What do these clues tell me?'","Choose the answer that is a <b>small step</b> from the clues, not a big jump."],
  traps:["<b>Too strong:</b> answers with words like 'always', 'never', or 'all' are usually wrong.","<b>Too far:</b> answers that add a lot of new facts (for example, 'Mr. Lee is in the hospital').","The right answer still has support in the passage."],
  tip:"The correct inference is a small, safe step from the text. If it needs a big leap, it is wrong.",
  passage:{title:"The Empty Bench",paras:["Maya looked at the bench where her neighbor Mr. Lee sat every morning. Today it was empty. His newspaper was still on the doorstep, and the curtains were closed. She hesitated for a moment, then walked to his door and knocked softly."]},
  practice:[
    rq(0,T_INFER,"What can be inferred about Mr. Lee?","His usual morning routine has changed",["He moved to another town","He is angry with Maya","He is in the hospital"],"He usually sits on the bench, but today it is empty, his newspaper is still outside, and the curtains are closed. His routine has changed, but we don't know why."),
    rq(0,T_INFER,"Why did Maya knock on the door?","She was worried about him",["She wanted to read his newspaper","She wanted to sit on the bench","She was angry with him"],"She noticed the clues, hesitated, and then knocked softly. This suggests she was worried, not angry."),
    rq(0,T_INFER,"Which word best describes Maya?","caring",["careless","bored","rude"],"She noticed something was different and checked on her neighbor. This shows she cares about him.")
  ]
}
];
