const noob = 
[
	{ en: "mongrel", ua: ["дворняжка", "мішанець"] },
	{ en: "starling", ua: ["шпак", "водоріз"] },
	{ en: "wanton", ua: ["розпусний", "довільний"] },
	{ en: "kindred", ua: ["родич"] },
	{ en: "arsenic", ua: ["миш'як"] },
	{ en: "antimony", ua: ["сурма"] },
	{ en: "aardvark", ua: ["трубкозуб"] },
	{ en: "oar", ua: ["весло"] },
	{ en: "prudence", ua: ["розсудливість"] },
	{ en: "hubris", ua: ["гординя"] }
];

const pro = 
[
	{ en: "squalor", ua: ["убогість", "бруд", "убозтво"] },
	{ en: "butadiene", ua: ["бутадієн"] },
	{ en: "untoward", ua: ["несприятливий", "непокірний"] },
	{ en: "pasture", ua: ["пасовище", "випас", "паша"] },
	{ en: "superintendent", ua: ["керівник", "наглядач", "начальник"] },
	{ en: "crackpot", ua: ["божевільний"] },
	{ en: "constituency", ua: ["вибірці", "вибірчий округ"] },
	{ en: "beneficiary", ua: ["бенефіціар"] },
	{ en: "appraisal", ua: ["оцінка"] },
	{ en: "femur", ua: ["стегно", "стегнова кістка"] },
];

const hacker = 
[
	{ en: "acrylonitrile butadiene styrene", ua: ["акрилонітрилбутадієнстирол"] },
	{ en: "piety", ua: ["благочестя", "набожність"] },
	{ en: "tithe", ua: ["десятина"] },
	{ en: "sanguine", ua: ["сангвіник", "рум'яний"] },
	{ en: "calx", ua: ["вапняк", "вапно", "окалина"] },
	{ en: "conjugate", ua: ["сполучник", "дієвідміна"] },
	{ en: "diatribe", ua: ["гостра критика"] },
	{ en: "pillory", ua: ["посміховище", "ганьба"] },
	{ en: "bulwark", ua: ["бастіон", "оплот"] },
	{ en: "schadenfreude", ua: ["злорадство"] }
];

const state = 
{
	diff: "noob",
	id: 0,
	words: noob,
	answers: ["", "", "", "", "", "", "", "", "", ""],
	correct: 0,
	incorrect: 0
};

function reset(diff)
{
	state.diff = diff;
	state.id = 0;
	if(diff == "noob") state.words = noob;
	if(diff == "pro") state.words = pro;
	if(diff == "hacker") state.words = hacker;
	state.answers = ["", "", "", "", "", "", "", "", "", ""];
	state.correct = 0;
	state.incorrect = 0;
	
	show();
}

$("#noob")[0].onclick = () => reset("noob");
$("#pro")[0].onclick = () => reset("pro");
$("#hacker")[0].onclick = () => reset("hacker");

$("#prev")[0].onclick = () => { state.id--; show(); };
$("#next")[0].onclick = () => { state.id++; show(); };

$("#check")[0].onclick = () => 
{
	let guess = $("#textbox").val().trim().toLowerCase();
	
	if(guess == "")
	{
		setTimeout(() => $("#textbox").css("border", "2px solid var(--col7)"), 50);
		setTimeout(() => $("#textbox").css("border", "2px solid var(--col3)"), 100);
		setTimeout(() => $("#textbox").css("border", "2px solid var(--col7)"), 150);
		setTimeout(() => $("#textbox").css("border", "2px solid var(--col3)"), 200);
		
		return;
	}
	
	if(state.words[state.id].ua.includes(guess))
	{
		state.correct++;
		state.answers[state.id] = "correct";
		
		setTimeout(() => $("#word").css("background-color", "var(--col6)"), 50);
		setTimeout(() => $("#word").css("background-color", "var(--col2)"), 100);
		setTimeout(() => $("#word").css("background-color", "var(--col6)"), 150);
		setTimeout(() => $("#word").css("background-color", "var(--col2)"), 200);
	}
	else
	{
		state.incorrect++;
		state.answers[state.id] = "incorrect";
		
		setTimeout(() => $("#word").css("background-color", "var(--col7)"), 50);
		setTimeout(() => $("#word").css("background-color", "var(--col2)"), 100);
		setTimeout(() => $("#word").css("background-color", "var(--col7)"), 150);
		setTimeout(() => $("#word").css("background-color", "var(--col2)"), 200);
	}
	
	setTimeout(show, 200);
};

function show()
{
	$("#noob").attr("disabled", false);
	$("#pro").attr("disabled", false);
	$("#hacker").attr("disabled", false);
	$(`#${state.diff}`).attr("disabled", true);
	
	if(state.id == 0) $("#prev").attr("disabled", true);
	else $("#prev").attr("disabled", false);
	if(state.id == 9) $("#next").attr("disabled", "true");
	else $("#next").attr("disabled", false);
	
	$("#word").html(state.words[state.id].en);
	$("#count").html(`${state.id + 1} / 10`);
	$("#textbox").val("");
	$("#correct").html(`${state.correct} ✅`);
	$("#incorrect").html(`${state.incorrect} ❌`);
	
	$("#word").css("background-color", "var(--col2)");
	$("#check").attr("disabled", false);
	if(state.answers[state.id] == "correct")
	{
		$("#word").css("background-color", "var(--col10)");
		$("#check").attr("disabled", true);
	}
	if(state.answers[state.id] == "incorrect")
	{
		$("#word").css("background-color", "var(--col11)");
		$("#check").attr("disabled", true);
	}
}

show(state);