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
var currentGame = "Big Pimpin' by Jay-Z.";
var botName = "JWBot";

var StarChannelID = "336923536117465088"; // 173036701499916288 voice 173163520043646976 main 336923536117465088 pin

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

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function clearmyreactions(msg){
	msg.reactions.forEach(reaction => {
	  if (reaction.users.has(client.user.id)) reaction.remove(client.user);
	});
}

function addLink(msg,aftercommand){
	if (aftercommand){
    	var cmdNewLineFix2 = aftercommand.replace(/(\r\n|\n|\r)/gm," ");
		if (cmdNewLineFix2.search("youtube.com/watch")!=-1){
			var cmdNewLineFix = cmdNewLineFix2;
			fs.appendFile('./no_upload/david.txt', "\n"+cmdNewLineFix, function(err) {
				if (err) {
					console.log("OH GOD");
				} else {
					msg.reply("Worked <3");
				}
			});
		}
	}
};

var adminIDs = ["163015294346854400","184050496393183232"];
var remoji = require("node-emoji");

var addToBoard = remoji.emojify(':pushpin:').toString();
var lock = remoji.emojify(':lock:').toString();

function RefreshPop(){
		PopIsh = fs.readFileSync("./no_upload/david.txt").toString().split("\n");
}
RefreshPop();

function isAdmin(user){
	for (var id of adminIDs){
		if (user.id==id){
			return true;
		}
	}
}

var lockarray = [lock];

client.on("error",console.error);

process.on("unhandledRejection",console.log);

var debounce = false;

client.on('messageReactionAdd', (reaction, user) => {
	var stopx = false;
	var reactedmessage = reaction.message;
	var msgContent = reactedmessage.content;
	var reactemoji = reaction.emoji.toString();
	if (reactedmessage.guild.id!="173036701499916288"){ // 173036701499916288 336891077854363649
		var stopx=true;
	}
	if (reactemoji.toLowerCase() == addToBoard.toLowerCase() && (!reaction.me) && (reactedmessage.author.id!=client.user.id) && (reaction.count>=5)){ //(reactedmessage.author.id!=user.id)
		// is the right emoji
		var reactions = reactedmessage.reactions.values();
		for (var reactionx of reactions){
			if (reactionx.me && (reactionx.emoji.toString() == lock)){
				// Already pinned x
				console.log("Already pinned.");
				var stopx = true;
			}
		}
		if (stopx==false){
			var stopx = true;
			react(reactedmessage,lockarray);
			// locked and ready to proceed
			// var ranCol = Number('0x'+Math.floor(Math.random()*16777215).toString(16));
			if (checkURL(msgContent)){
				richEmbedMessage(client,reactedmessage,0x900020,"","https://www.reddit.com/r/MHoC",msgContent,reactedmessage.id);
			} else {
				embedMessage(client,reactedmessage,0x900020,"","https://www.reddit.com/r/MHoC",msgContent,reactedmessage.id);
			}
		}
	}
});

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
	if (msg.author.id=="118024181177778183" && msg.channel.type=="dm"){
		var command = msgContent.split(" ")[0].toLowerCase(); // take the first word and get everything after the first letter.
		var aftercommand = msgContent.substring(command.length+1); // take the second word and onwards
		if (command==".add"){
			addLink(msg,aftercommand);
		}
	}
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

// function

var standard = ["🇹","🇭","🇦","🇳","🇰","🇸","MIDDLE","🇯","🇼","❕","👏"];
var hodge = ["🇳","🇴","MIDDLE","🇭","⭕","🇩","🇬","🇪","🇸","❕","👏"];
var france = ["🇲","🇪","🇷","🇨","🇮","🇫🇷","🇯","🇼","❕","🥖"];
var spain = ["🇬","🇷","🇦","🇨","🇮","🅰","🇸","🇪🇸","🇯","🇼","❕","🌮"];

var emoji = "💁 👮 👿 🏇 🚅 🍖 🍫 🎫 🎼 🍠 👯 🐯 🏃 💃 🍪 🙅 🍤 🚐 🐸 🚈 💄 🐓 🐕 😛 🐜 😄 🍢 🐳 🍯 🚳 😍 🚪 🎺 😉 🍛 🐣 🐢 🚫 🚟 😃 😠 🚂 💀 🏂 🐧 😥 😶 🏆 🐲 🚚 🚒 🎶 😖 🚣 🎣 🚭 👰 🎷 🐻 🎾 👨 🚿 🎲 👫 🚜 🚢 🚹 😙 😴 🐴 🚲 🍝 🍣 😎 🐟 👶 😭 🍜 😽 😻 🐔 🎽 👱 💆 🙊 🐭 🚝 🍟 😐 🙀 👧 😦 🍮 🚰 🚤 🏈 🎵 😗 🚦 👪 🎸 😓 🍭 😞 🎤 😡 👩 🍙 😂 🐬 🏀 🏁 👸 🐩 🚑 🍨 😒 😈 😳 🎧 😣 😔 🚏 🎨 😨 😫 😲 🐑 👻 🎹 😼 🐦 🚊 🎪 🚱 🚧 🚋 💅 👽 🚾 🐒 🍱 🍞 🚎 🎴 😑 🙌 🎩 🚞 🚶 😕 🐺 🐗 🚩 🎯 🐼 🐮 😇 🚴 🍡 🚌 🎻 🚕 🚁 😱 😆 🍲 😏 😧 🚓 🍕 🚼 🐽 👴 👳 🙇 👦 🐠 🐱 🚃 🚆 🐷 😘 😬 😚"

var emojis = emoji.split(" ");


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

function richEmbedMessage(client,msg,colour,title,url,link,footer,del){
	var channelX=msg.guild.channels.get(StarChannelID);
	var authorn = "*"+msg.member.displayName + "* was pinned!";
	const embed = new discord_Main.RichEmbed()
		.setAuthor(authorn,url)
		.setImage(link)
		.setTimestamp()
		.setURL(link)
		.setFooter(footer,url)
	channelX.send({embed}).catch(err => {
			console.error("err:"+err.toString());
		})
}

function embedMessage(client,msg,colour,title,url,description,footer,del){
	var channelX=msg.guild.channels.get(StarChannelID);
	channelX.send({embed: {
	    color: colour,
	    author: {
	    	name: "*"+msg.member.displayName + "* was pinned!",
	      	icon_url: msg.author.avatarURL
	    },
	    title: title,
	    url: url,
	    description: description,
	    timestamp: new Date(),
	    footer: {
	      	icon_url: "http://i.imgur.com/eaxRtLk.png",
	      	text: footer
    }}}).catch(err => {
			console.error("err:"+err.toString());
		})
}

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

