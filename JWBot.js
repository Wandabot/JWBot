/*

* JWBot

* A bot by Uten.

*/

// Ooh, a startup!

var discord_Main = require("discord.js");
var client = new discord_Main.Client({autoReconnect:true});
var fs = require("fs");
var async = require('async');

// Variable variables. The best type of variable.

var discord_Token = fs.readFileSync("./no_upload/token.txt").toString();
var currentGame = "Detective Inspector Matthew 'Dot' Cottan.";
var botName = "JWBot";

var Roles = {

};


// Non-variable variables. Slightly worse.

var links;
function RefreshLinks(){
		links = fs.readFileSync("./no_upload/twitLinks.txt").toString().split("\n");
}
RefreshLinks();

var startTime = Date.now();

// Console shite.

console.log("Joining...")

// Begin!

client.login(discord_Token);
console.log("Logged in successfully.");

client.on("ready", () => {
	client.user.setGame(currentGame);
});
// 👮

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z>0-9]/i);
}

function searchforstr(msgContent,str){
	if (msgContent.toLowerCase().search(str)!=-1 && (!isLetter(msgContent.toLowerCase().substring(msgContent.toLowerCase().search(str)-1,msgContent.toLowerCase().search(str))) || msgContent.toLowerCase().search(str)==0)){
		return true;
	}
}

function clearmyreactions(msg){
	msg.reactions.forEach(reaction => {
	  if (reaction.users.has(client.user.id)) reaction.remove(client.user);
	});
}

var adminIDs = ["163015294346854400","184050496393183232","143033413828345856"];
var PopIsh = ["https://www.youtube.com/watch?v=7F37r50VUTQ","https://www.youtube.com/watch?v=wyK7YuwUWsU","https://www.youtube.com/watch?v=JLf9q36UsBk","https://www.youtube.com/watch?v=IdneKLhsWOQ","https://www.youtube.com/watch?v=QcIy9NiNbmo","https://www.youtube.com/watch?v=-CmadmM5cOk","https://www.youtube.com/watch?v=e-ORhEE9VVg","https://www.youtube.com/watch?v=nfWlot6h_JM","https://www.youtube.com/watch?v=AgFeZr5ptV8","https://www.youtube.com/watch?v=vNoKguSdy4Y","https://www.youtube.com/watch?v=WA4iX5D9Z64","https://www.youtube.com/watch?v=eocfbbyIUn8","https://www.youtube.com/watch?v=cMPEd8m79Hw","https://www.youtube.com/watch?v=jYa1eI1hpDE","https://www.youtube.com/watch?v=QUwxKWT6m7U","https://www.youtube.com/watch?v=8xg3vE8Ie_E","https://www.youtube.com/watch?v=xKCek6_dB0M","https://www.youtube.com/watch?v=C-u5WLJ9Yk4","https://www.youtube.com/watch?v=gJLIiF15wjQ","https://www.youtube.com/watch?v=Bg59q4puhmg"];

function isAdmin(user){
	for (var id of adminIDs){
		if (user.id==id){
			return true;
		}
	}
}

client.on("error",console.error);

process.on("unhandledRejection",console.log);

var debounce = false;

client.on("message", msg => {
	general(msg,"new");
})

client.on("messageUpdate", (msgOld,msgNew) => {
	clearmyreactions(msgNew);
	general(msgNew,"edit");
})
//	msg.react("mack:244108925828333568");

function general(msg,xtype){
	while (debounce==false){
		setTimeout(function() {}, 3000);
	};
	var debounce = true;
	var msgContent = msg.content;
	/*if (searchforstr(msgContent,"snake") && msg.author.username=="dan"){
		msg.reply("snake: "+msg.guild.members.array()[Math.floor(Math.random() * msg.guild.members.array().length)].displayName);
	};*/
	if (searchforstr(msgContent,"one rank senior") || searchforstr(msgContent,"one rank superior") || searchforstr(msgContent,"one rank higher")){
		if (Math.random()*100 > 94) {
		  	msg.react("👮");
		}
	};
	if (searchforstr(msgContent,"log") && msg.channel.type=="dm" && msg.author.id!=client.user.id){
		client.users.get("184050496393183232").send("New log from "+msg.author.username+": "+msgContent);
	};
	if (searchforstr(msgContent,"ac-12")){
		if (Math.random()*100 > 90) {
			msg.react("🚔");
		}
	};
	if (msgContent.toLowerCase()=="renationalise!"){
		msg.react("🚆");
	};
	if (msgContent.toLowerCase()==".syntheticjw" && (isAdmin(msg.author))){
		react(msg,standard);
	};
	if (msgContent.toLowerCase()==".syntheticjw-es" && (isAdmin(msg.author))){
		react(msg,spain);
	};
	if (msgContent.toLowerCase()==".synthetichodge" && (isAdmin(msg.author))){
		react(msg,hodge);
	};
	if (msgContent.toLowerCase()==".syntheticjw-fr" && (isAdmin(msg.author))){
		react(msg,france);
	};
	if (msgContent.toLowerCase()==".david" && (msg.author.id=="118024181177778183")){
		var randomTS = PopIsh[Math.floor(Math.random() * PopIsh.length)];
		msg.channel.send(randomTS);
	};
	if (searchforstr(msgContent,"hot take")){
		msg.react("🔥");
	};
	/*if (searchforstr(msgContent,"wew") || searchforstr(msgContent,"w e w")){
		var ran = Math.random()*100;
		if (ran < 33) {
			msg.react("vote_no:244160094839898113");
		} else if (ran > 66) {
			msg.react("🚫");
		} else {
			msg.react("🙅");
		}
	};*/
  	var SearchForTwit = msgContent.search("twitter.com/"); // status-(twit+11)=username
  	var SearchForStatus = msgContent.search("/status/");
	if(msgContent.toLowerCase().search("twitter.com/dpjhodges")!=-1 && msg.author.id=="213576327335247872"){
		react(msg,hodge);
	};
  	if(SearchForTwit!=-1 && SearchForStatus>SearchForTwit && msgContent[0]!=">" && xtype=="new"){
    	RefreshLinks();
	    var SpaceCont = msgContent.replace( /\n/g," ");
	    var ActualLinkArray = SpaceCont.split(" ");
	    for(var i in ActualLinkArray) {
      		var Current = ActualLinkArray[i].toString();
      		var CurrentTwit = Current.search("twitter.com/");
      		var CurrentStat = Current.search("/status/");
      		if(CurrentTwit!=-1 && CurrentStat>CurrentTwit){
		        var UsernameLength = CurrentStat - (CurrentTwit+11);
		        var LinkLength = 18+UsernameLength+11+8;
		        var FullLink = Current.substring(CurrentTwit).toString();
		        var UsernameToEnd = FullLink.substring(11).toString();
		        var LookInLinks = links.indexOf(UsernameToEnd);
		        if(LookInLinks!=-1){
					console.log("thanks jw",UsernameToEnd);
					var ranNum = Math.random();
					if (ranNum<=0.05){
		          		react(msg,spain);
					} else if (ranNum<=0.1) {
						react(msg,france);
					} else {
						try { react(msg,standard) } catch(err) { console.log(err); };
					}
					RefreshLinks();
        		} else {
          			console.log("Attempting to add link",UsernameToEnd)
					fs.appendFile('./no_upload/twitLinks.txt', "\n"+UsernameToEnd, function(err) {
      					if (err) {
        					console.log("Oh fuck.",err);
        				} else {
        					console.log("Success!");
              				RefreshLinks();
        				}
            	})
          }
      }
    }
  };
  var debounce=false;
}

var emoji = "💁 👮 👿 🏇 🚅 🍖 🍫 🎫 🎼 🍠 👯 🐯 🏃 💃 🍪 🙅 🍤 🚐 🐸 🚈 💄 🐓 🐕 😛 🐜 😄 🍢 🐳 🍯 🚳 😍 🚪 🎺 😉 🍛 🐣 🐢 🚫 🚟 😃 😠 🚂 💀 🏂 🐧 😥 😶 🏆 🐲 🚚 🚒 🎶 😖 🚣 🎣 🚭 👰 🎷 🐻 🎾 👨 🚿 🎲 👫 🚜 🚢 🚹 😙 😴 🐴 🚲 🍝 🍣 😎 🐟 👶 😭 🍜 😽 😻 🐔 🎽 👱 💆 🙊 🐭 🚝 🍟 😐 🙀 👧 😦 🍮 🚰 🚤 🏈 🎵 😗 🚦 👪 🎸 😓 🍭 😞 🎤 😡 👩 🍙 😂 🐬 🏀 🏁 👸 🐩 🚑 🍨 😒 😈 😳 🎧 😣 😔 🚏 🎨 😨 😫 😲 🐑 👻 🎹 😼 🐦 🚊 🎪 🚱 🚧 🚋 💅 👽 🚾 🐒 🍱 🍞 🚎 🎴 😑 🙌 🎩 🚞 🚶 😕 🐺 🐗 🚩 🎯 🐼 🐮 😇 🚴 🍡 🚌 🎻 🚕 🚁 😱 😆 🍲 😏 😧 🚓 🍕 🚼 🐽 👴 👳 🙇 👦 🐠 🐱 🚃 🚆 🐷 😘 😬 😚"

var emojis = emoji.split(" ");

// function

var standard = ["🇹","🇭","🇦","🇳","🇰","🇸","MIDDLE","🇯","🇼","❕","👏"];
var hodge = ["🇳","🇴","MIDDLE","🇭","⭕","🇩","🇬","🇪","🇸","❕","👏"];
var france = ["🇲","🇪","🇷","🇨","🇮","🇫🇷","🇯","🇼","❕","🥖"];
var spain = ["🇬","🇷","🇦","🇨","🇮","🅰","🇸","🇪🇸","🇯","🇼","❕","🌮"];

async function react(msg,strArray){
	clearmyreactions(msg);
	if (!strArray){ var strArray = standard };
	for (var emojin in strArray){
		var emoji = strArray[emojin];
		if (emoji=="MIDDLE"){
			var emoji = emojis[Math.floor(Math.random() * emojis.length)].toString();
		};
		await msg.react(emoji);
	}
}



process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

