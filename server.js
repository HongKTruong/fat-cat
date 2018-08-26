// Setup a basic http website so that uptime robot can ping it
// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});




// START OF PROJECT
const { Client, Attachment } = require("discord.js");
const client = new Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  // Ignore message if it doesnt start with the prefix
  if (!message.content.startsWith(config.prefix)) return;

  // Get each space-separated word without the prefix
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  // Post all the large emojis if it exists
  args.forEach(function(arg) {
    sendFatEmoji(arg, message);
  });
});


client.on("messageUpdate", (oldMsg, newMsg) => {
  // Ignore message if it doesnt start with the prefix
  if (!newMsg.content.startsWith(config.prefix)) return;

  // Get each space-separated word without the prefix
  const args = newMsg.content.slice(config.prefix.length).trim().split(/ +/g);
  const oldArgs = oldMsg.content.slice(config.prefix.length).trim().split(/ +/g);
  var index = 0;
  
  args.forEach(function(arg) {
    if (index >= oldArgs.length) {
      // Post any newly added emojis
      sendFatEmoji(arg, newMsg);
    }
    else {
      // Don't repost already posted emojis
      const oldArg = oldArgs[index]
      if (arg !== oldArg) {
        sendFatEmoji(arg, newMsg);
      }
      index++;
    }
  });
});

client.login(process.env.TOKEN);

function sendFatEmoji(arg, message) {
  // Get the emoji name from the emoji code: `<:name:identifier>`
  const emojiName = arg.substring(
    arg.indexOf(":") + 1,
    arg.lastIndexOf(":")
  );

  // If the client has this emoji, post it as a large attachment
  const hasEmoji = client.emojis.some(em => em.name === emojiName);
  if (hasEmoji) {
    const url = client.emojis.find(em => em.name === emojiName).url;
    const attachment = new Attachment(url);
    message.channel.send(attachment);
  }
}