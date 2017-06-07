/*

* JWBot

* A bot by Uten.

*/

// Ooh, a startup!

var discord_Main = require("discord.js");
var client = new discord_Main.Client({autoReconnect:true});
var fs = require("fs");

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

client.on("error",console.error);

process.on("unhandledRejection",console.log);


client.on("message", msg => {
	general(msg);
})


	//	msg.react("mack:244108925828333568");

function general(msg){
	var msgContent = msg.content;
	/*if (searchforstr(msgContent,"snake") && msg.author.username=="dan"){
		msg.reply("snake: "+msg.guild.members.array()[Math.floor(Math.random() * msg.guild.members.array().length)].displayName);
	};*/
	if (searchforstr(msgContent,"one rank senior") || searchforstr(msgContent,"one rank superior") || searchforstr(msgContent,"one rank higher")){
		if (Math.random()*100 > 94) {
		  	msg.react("👮");
		}
	};
	if (searchforstr(msgContent,"ac-12")){
		if (Math.random()*100 > 90) {
			msg.react("🚔");
		}
	};
	if (msgContent.toLowerCase()=="renationalise!"){
		msg.react("🚆");
	};
	if (msgContent.toLowerCase()==".syntheticjw" && msg.author.id=="184050496393183232"){
		react(msg);
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
		reactHod(msg);
	};
  	if(SearchForTwit!=-1 && SearchForStatus>SearchForTwit && msgContent[0]!=">"){
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
		          		reactEsp(msg);
					} else if (ranNum<=0.1) {
						reactFra(msg);
					} else {
						try { react(msg) } catch(err) { console.log(err); };
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
}

var emoji = "💁 👮 👿 🏇 🚅 🍖 🍫 🎫 🎼 🍠 👯 🐯 🏃 💃 🍪 🙅 🍤 🚐 🐸 🚈 💄 🐓 🐕 😛 🐜 😄 🍢 🐳 🍯 🚳 😍 🚪 🎺 😉 🍛 🐣 🐢 🚫 🚟 😃 😠 🚂 💀 🏂 🐧 😥 😶 🏆 🐲 🚚 🚒 🎶 😖 🚣 🎣 🚭 👰 🎷 🐻 🎾 👨 🚿 🎲 👫 🚜 🚢 🚹 😙 😴 🐴 🚲 🍝 🍣 😎 🐟 👶 😭 🍜 😽 😻 🐔 🎽 👱 💆 🙊 🐭 🚝 🍟 😐 🙀 👧 😦 🍮 🚰 🚤 🏈 🎵 😗 🚦 👪 🎸 😓 🍭 😞 🎤 😡 👩 🍙 😂 🐬 🏀 🏁 👸 🐩 🚑 🍨 😒 😈 😳 🎧 😣 😔 🚏 🎨 😨 😫 😲 🐑 👻 🎹 😼 🐦 🚊 🎪 🚱 🚧 🚋 💅 👽 🚾 🐒 🍱 🍞 🚎 🎴 😑 🙌 🎩 🚞 🚶 😕 🐺 🐗 🚩 🎯 🐼 🐮 😇 🚴 🍡 🚌 🎻 🚕 🚁 😱 😆 🍲 😏 😧 🚓 🍕 🚼 🐽 👴 👳 🙇 👦 🐠 🐱 🚃 🚆 🐷 😘 😬 😚"

var emojis = emoji.split(" ");

// function

async function react(msg){
	var mid = emojis[Math.floor(Math.random() * emojis.length)].toString();
	await msg.react("🇹");
	await msg.react("🇭");
	await msg.react("🇦")
	await msg.react("🇳");
	await msg.react("🇰");
	await msg.react("🇸");
	await msg.react(mid);
	await msg.react("🇯");
	await msg.react("🇼");
	await msg.react("❕");
	await msg.react("👏");
}

async function reactHod(msg){
	var mid = emojis[Math.floor(Math.random() * emojis.length)].toString();
	await msg.react("🇳");
	await msg.react("🇴");
	await msg.react(mid);
	await msg.react("🇭");
	await msg.react("⭕");
	await msg.react("🇩");
	await msg.react("🇬");
	await msg.react("🇪");
	await msg.react("🇸");
	await msg.react("❕");
	await msg.react("👏");
}


async function reactEsp(msg){
	await msg.react("🇬");
	await msg.react("🇷");
	await msg.react("🇦")
	await msg.react("🇨");
	await msg.react("🇮");
	await msg.react("🅰");
	await msg.react("🇸");
	await msg.react("🇪🇸");
	await msg.react("🇯");
	await msg.react("🇼");
	await msg.react("❕");
	await msg.react("🌮");
}

async function reactFra(msg){
	await msg.react("🇲");
	await msg.react("🇪");
	await msg.react("🇷")
	await msg.react("🇨");
	await msg.react("🇮");
	await msg.react("🇫🇷");
	await msg.react("🇯");
	await msg.react("🇼");
	await msg.react("❕");
	await msg.react("🥖");
}

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

