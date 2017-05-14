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
var currentGame = "Detective Inspectør Mætthew 'Døt' Cøttæn.";
var botName = "JWBot";

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

client.on("message", msg => {
	var msgContent = msg.content;
	if (msgContent.toLowerCase().search("one rank senior")!=-1 || msgContent.toLowerCase().search("one rank superior")!=-1 || msgContent.toLowerCase().search("one rank higher")!=-1){
		if (Math.random()*100 > 94) {
		  	msg.react("👮");
		}
	}
	if (msgContent.toLowerCase().search("ac-12")!=-1){
		if (Math.random()*100 > 94) {
			msg.react("🚔");
		}
	};
  	var SearchForTwit = msgContent.search("twitter.com/"); // status-(twit+11)=username
  	var SearchForStatus = msgContent.search("/status/");
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
		          	react(msg);
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
})

var emojis = ["💁","👮","👿","🏇","🚅","🍖","🍫","🎫","🎼","🍠","👯","🐯","🏃","💃","🍪","🙅","🍤","🚐","🐸","🚈","💄","🐓","🐕","😛","🐜","😄","🍢","🐳","🍯","🚳","😍","🚪","🎺","😉","🍛","🐣","🐢","🚫","🚟","😃","😠","🚂","💀","🏂","🐧","😥","😶","🏆","🐲","🚚","🚒","🎶","😖","🚣","🎣","🚭","👰","🎷","🐻","🎾","👨","🚿","🎲","👫","🚜","🚢","🚹","😙","😴","🐴","🚲","🍝","🍣","😎","🐟","👶","😭","🍜","😽","😻","🐔","🎽","👱","💆","🙊","🐭","🚝","🍟","😐","🙀","👧","😦","🍮","🚰","🚤","🏈","🎵","😗","🚦","👪","🎸","😓","🍭","😞","🎤","😡","👩","🍙","😂","🐬","🏀","🏁","👸","🐩","🚑","🍨","😒","😈","😳","🎧","😣","😔","🚏","🎨","😨","😫","😲","🐑","👻","🎹","😼","🐦","🚊","🎪","🚱","🚧","🚋","💅","👽","🚾","🐒","🍱","🍞","🚎","🎴","😑","🙌","🎩","🚞","🚶","😕","🐺","🐗","🚩","🎯","🐼","🐮","😇","🚴","🍡","🚌","🎻","🚕","🚁","😱","😆","🍲","😏","😧","🚓","🍕","🚼","🐽","👴","👳","🙇","👦","🐠","🐱","🚃","🚆","🐷","😘","😬","😚"];

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

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

