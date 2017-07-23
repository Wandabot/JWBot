/*

* JWBot

* A bot by Uten.

*/

// Ooh, a startup!

var discord_Main = require("discord.js");
var client = new discord_Main.Client({autoReconnect:true});
var fs = require("fs");
var async = require('async');
var sql = require("sqlite");
sql.open("./config.sqlite");


// Variable variables. The best type of variable.

var discord_Token = fs.readFileSync("./no_upload/token.txt").toString();
var currentGame = ".invite -> invite link! ♥";
var botName = "JWBot";

var StarChannelID; // 173036701499916288 voice 173163520043646976 main 336923536117465088 pin 336891766936698880 test
var guildID;  // 173036701499916288 main 336891077854363649 test
var reactionCount;
var pinAllowed;

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
	if (url.indexOf(" ")==-1){
    	return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	};
}

function checkURLGifv(url){
    if(url.match(/\.(gifv|webm)$/) != null){
		var newUrlSl = url.slice(0, -4);
		var newUrl = newUrlSl + "gif";
		return newUrl;
	} else if (url.match(/\.(mp4)$/) != null){
		var newUrlSl = url.slice(0, -3);
		var newUrl = newUrlSl + "gif";
		return newUrl;
	}
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
var lock = remoji.emojify(':white_check_mark:').toString();
var override = remoji.emojify(':smiley:').toString();

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

function isDan(user){
	if (user.id=="184050496393183232"){
		return true;
	}
}


async function sqlDealing(msg,act,columnname,c_value){
	sql.get(`SELECT * FROM config WHERE guildId = "${msg.guild.id}"`).then(row => {
		if (!row) { // Can't find the row.
			sql.run("INSERT INTO config (guildId, pinboardId, pinsNeeded, pinAllowed) VALUES (?, ?, ?, 0)", [msg.guild.id, 1, 0]);
		} else {
			if (act=="change" && columnname && c_value){
				sql.run(`UPDATE config SET `+columnname+` = `+c_value+` WHERE guildId = "${msg.guild.id}"`);
			} else if (act=="view" && columnname){
				return row[columnname];
			}
		}
	}).catch(() => {
		console.error; // Gotta log those errors
		sql.run("CREATE TABLE IF NOT EXISTS config (guildId TEXT, pinboardId TEXT, pinsNeeded INTEGER, pinAllowed INTEGER)").then(() => {
			sql.run("INSERT INTO config (guildId, pinboardId, pinsNeeded, pinAllowed) VALUES (?, ?, ?, 0)", [msg.guild.id, 1, 0]);
		});
	});
}

function messageReactions(reaction,user){
	var reactedmessage = reaction.message;
	sql.get(`SELECT * FROM config WHERE guildId = "${reactedmessage.guild.id}"`).then(row => {
		var attachmentx = false;
		var reactedmessage = reaction.message;
		var msgContent = reactedmessage.content;
		var stopx = false;
		let StarChannelID = row.pinboardId;
		let guildID = row.guildId;
		let reactionCount = row.pinsNeeded;
		let pinAllowed = row.pinAllowed;
		if (reactedmessage.attachments.first()){
			var attachmentx = reactedmessage.content;
			var msgContent=reactedmessage.attachments.first().proxyURL;
		}
		var reactemoji = reaction.emoji.toString();
		if ((reactedmessage.guild.id!=guildID) || (pinAllowed == 0)){
			var stopx=true;
		}
		if (reactemoji.toLowerCase() == addToBoard.toLowerCase() && (!reaction.me) && (reactedmessage.author.id!=client.user.id) && (reaction.count>=reactionCount)){ //(reactedmessage.author.id!=user.id)
			// is the right emoji
			var reactions = reactedmessage.reactions.values();
			for (var reactionx of reactions){
				if (reactionx.me && (reactionx.emoji.toString() == lock)){
					// Already pinned x
					var stopx = true;
				}
			}
			if (stopx==false){
				var stopx = true;
				react(reactedmessage,lockarray);
				// locked and ready to proceed
				var ranCol = Number('0x'+Math.floor(Math.random()*16777215).toString(16));
				if (checkURLGifv(msgContent)){
					var msgContent = checkURLGifv(msgContent);
				};
				if (checkURL(msgContent)){
					if (attachmentx!=false){
						richEmbedMessage(client,reactedmessage,ranCol,"","https://www.reddit.com/r/MHoC",msgContent,reactedmessage.id,StarChannelID,attachmentx);
					} else {
						richEmbedMessage(client,reactedmessage,ranCol,"","https://www.reddit.com/r/MHoC",msgContent,reactedmessage.id,StarChannelID);
					}
				} else {
					embedMessage(client,reactedmessage,ranCol,"","https://www.reddit.com/r/MHoC",msgContent,reactedmessage.id,StarChannelID);
				}
			}
		}
	})
}

var lockarray = [lock];

client.on("error",console.error);

process.on("unhandledRejection",console.log);

var debounce = false;

client.on('messageReactionAdd', (reaction, user) => {
	messageReactions(reaction,user);
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
	if (msg.channel.type!="dm"){
		sqlDealing(msg);
	}
	while (debounce==false){
		setTimeout(function() {}, 3000);
	};
	var debounce = true;
	var msgContent = msg.cleanContent;
	/*if (searchforstr(msgContent,"snake") && msg.author.username=="dan"){
		msg.reply("snake: "+msg.guild.members.array()[Math.floor(Math.random() * msg.guild.members.array().length)].displayName);
	};*/
	if (searchforstr(msgContent,"one rank senior") || searchforstr(msgContent,"one rank superior") || searchforstr(msgContent,"one rank higher")){
		if (Math.random()*100 > 94) {
		  	msg.react("👮");
		}
	};
	if (msgContent.toLowerCase()==".invite" && msg.author.id!=client.user.id){
		console.log("Sending invite link to "+msg.author.username);
		var inviteLink = "https://discordapp.com/oauth2/authorize?&client_id="+client.user.id+"&scope=bot";
		msg.author.send(inviteLink);
	}
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
		client.user.setGame(currentGame);
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
	if (msgContent.toLowerCase()==".delete" && (isDan(msg.author))){
		sql.get(`SELECT * FROM config WHERE guildId = "${msg.guild.id}"`).then(row => {
			let StarChannelID = row.pinboardId;
			try { msg.guild.channels.get(StarChannelID).messages.first().delete() } catch(err){ console.error };
	})}
	if (msgContent.toLowerCase()==".config" && (isAdmin(msg.author))){
		var batch = "";
		sql.get(`SELECT * FROM config WHERE guildId = "${msg.guild.id}"`).then(row => {
			var PinsAllowed = row.pinAllowed==1 ? "true" : "false";
			if (PinsAllowed=="false"){
				msg.channel.send("**pinAllowed:** false");
			} else {
				var guildIDx = row.guildId.toString();
				var pinsNeededx = row.pinsNeeded.toString();
				var pinboardIdx = row.pinboardId.toString();
				var batch = "**pinAllowed:** true"
				var batch = batch + "\n" + "**pinsNeeded:** "+pinsNeededx + "\n" + "**pinboardId:** "+pinboardIdx + "\n" + "**guildId:** "+guildIDx
				msg.channel.send(batch);
			}
		});
	}
	if (msgContent.toLowerCase().startsWith(".config ") && (isDan(msg.author))){
		var acccolumns = ["guildId","pinboardId","pinsNeeded","pinAllowed"];
		var aftercommandx = msgContent.substring(8);
		var toChange = aftercommandx.split(" ")[0];
		if (acccolumns.indexOf(toChange)!=-1){
			var changeTo = aftercommandx.split(" ")[1];
			if (toChange=="pinAllowed"){
				if (changeTo=="false"){ var changeTo=0 };
				if (changeTo=="true"){ var changeTo=1 };
			}
			if (toChange=="pinsNeeded"){
				var changeTo = Number(changeTo);
			}
			sqlDealing(msg,"change",toChange,changeTo);
		}
	}
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

function richEmbedMessage(client,msg,colour,title,url,link,footer,ch_id,attachmentx){
	var channelX=msg.guild.channels.get(ch_id);
	var authorn = "*"+msg.member.displayName + "* was pinned!";
	let embed = new discord_Main.RichEmbed()
		.setAuthor(authorn,msg.author.avatarURL,url)
		.setImage(link)
		.setTimestamp()
		.setURL(link)
		.setFooter(footer,"http://i.imgur.com/eaxRtLk.png")
		//.setThumbnail(msg.author.avatarURL)
		.setColor("RANDOM")
	if (attachmentx){
		embed.setDescription(attachmentx);
	}
	channelX.send({embed}).catch(err => {
			console.error("err:"+err.toString());
		})
}

function embedMessage(client,msg,colour,title,url,description,footer,ch_id){
	var channelX=msg.guild.channels.get(ch_id);
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

