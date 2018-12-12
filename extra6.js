//player object
function Player(hp, obj){
	this.hp = hp;
	this.obj = obj;
	
	this.getHp = function(){return this.hp;};
	this.getObj = function(){return this.obj;};
	
	this.setHp = function(hp){this.hp = hp;};
}
//make new level object
function newLevel(bpm, name, level){
	this.bpm = bpm;
	this.name = name;
	this.level = level;
	
	this.getBpm = function(){return this.bpm;};
	this.getName = function(){return this.name;};
	this.getLevel = function(){return this.level;};
}

//create player obj
var player = new Player(3, $("#player"));

console.log("made new player with: " + player.getHp() + " hp and " + player.getObj() + " obj");

var levels = [];
var lvlNotes = [];
var bpmSec;
var currentNote = 0;
var lvlSelect = 0;

//initial load levels
loadAllLevels();
$("#levelLoader").hide();

//reload all levels
$(window).keypress(function(e){
	if (e.key === "/" || e.key === "Divide"){
		loadAllLevels();
	}
});

//function to load levels
function loadAllLevels(){
	console.log("reloading " + levelcount + " levels...");
	$("#levelLoader").show();
	levels = [];
	levelcount;
	for(i = 0; i < levelcount; i++){
		levels.push(new newLevel($("#lvlBpm" + i).html(), $("#lvlName" + i).html(), $("#lvlLevel" + i).html()));
	}
	$("#reloadlvl").html("Levels reloaded!");
	$("#levelLoader").hide();
}

//begin game
$(window).keypress(function(e){
	if (e.key === "Enter"){
		$(".beginTxt").hide();
		lvlSelect = 0;	//temperary, will be able to set depending on what level user picks
		lvlNotes = [];
		bpmSec = 60 / $("#lvlBpm" + lvlSelect).html();
		console.log("Level name: " + levels[lvlSelect].getName());
		console.log("Bpm: " + levels[lvlSelect].getBpm());
		//lvlNotes.push(levels[lvlSelect].getLevel().split(""));
		
		for (i = 0; i < levels[lvlSelect].getLevel().length; i++){
			lvlNotes.push(levels[lvlSelect].getLevel().charAt(i));
		}
		
		var gameDelay = setTimeout(function(){
			levelBegin();
		}, (bpmSec * 4) * 1000);
	}
});

//begin beat
function levelBegin(){
	console.log("Game Begin!");
	currentNote = 0;
	var game = setInterval(function(){
		console.log("1/4 beat!");
		currentNote++;
		if (lvlNotes[currentNote] == 1){
			console.log("New Hit Note!");
			var newspacepad = document.createElement("img");
			newspacepad.setAttribute("src","note1.png");
			newspacepad.setAttribute("alt","Spacebar Ring");
			newspacepad.setAttribute("class","spacePad");
		}
		if (lvlNotes[currentNote] == null){
			console.log("No more notes!");
			clearInterval(game);
		}
	}, (bpmSec / 4) * 1000);
}

//trigger thump if space is pressed
$(window).keypress(function(e){
	if (e.key === " " || e.key === "Spacebar"){
		playerThumpScale();
		ringHit();
	}
});

//bounce player size on space pressed
function playerThumpScale(){
	player.getObj().css("width", "15%");
	player.getObj().css("left", "42.4%");
	player.getObj().css("top", "35%");
	player.getObj().css("border-radius", "150px");
	var resetSize = setTimeout(function(){
		player.getObj().css("width", "10%");
		player.getObj().css("left", "44.85%");
		player.getObj().css("top", "39%");
		player.getObj().css("border-radius", "100px");
		
	}, 75);
}



//if thump ring is overlapped with player, hit ring
function ringHit(){
	//if ()
}