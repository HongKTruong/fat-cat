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
const fs = require("fs");
var commands = JSON.parse(fs.readFileSync("./commands.json", "utf8"));

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  // Ignore message if it doesnt start with the prefix
  if (!message.content.startsWith(config.prefix)) return;
  
  // Get each space-separated word without the prefix
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args[0];
  
  if (command === "help") {
    // Post a list of all usable commands
    message.channel.send("**These are the tricks that I can do:**\n" +
                         "- `!add <command> <link>` - to add a new link for me to post\n" +
                         "- `!delete <command1> <command2>...` - to remove link(s) from my memory\n" +
                         "- `!rename <command1> <command2>` - renames a custom command from command1 to command2" +
                         "- `!commands` - to get a list of all the custom commands that I know\n" +
                         "- `!:customEmote:` - to post a fatter version of the emote\n");
  }
  else if (command === "commands") {
    // Post a list of all custom commands associated with a link
    var helpMsg = "*These are the snacks I've eaten:* \n";
    for (var key in commands) {
      if (commands.hasOwnProperty(key)) {
        helpMsg += "- `" + key + "`\n";
      }
    }
    message.channel.send(helpMsg);
  }
  else if (command === "add" && args.length === 3) {
    // Adds a custom command and its associated link
    const key = args[1];
    const link = args[2];
    
    if (key in commands) {
      message.channel.send("**I've eaten this already...**");
    }
    else {
      // Save the command and its link to the JSON  
      commands[key] = link;
      fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
        if (err) console.error(err)
      });
      message.channel.send("**I grow fatter with every new link.**");
    }
  }
  else if (command === "delete" && args.length >= 2) {
    // Deletes 1 or more custom command
    args.shift(); // Remove "delete" from the list of commands
    
    args.forEach(async function(key) {
      try {
        if (key in commands) {
          delete commands[key];
          await message.channel.send("**Losing weight by throwing out **`" + key + "`**...**");
        }
        else {
          await message.channel.send("**I don't own a utensil called **`" + key + "`**...**");
        }
      }
      catch (e) {
        console.error(e);
      }
    });
    fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
      if (err) console.error(err)
    });
    message.channel.send("**Optimal weight reached.**");
  }
  else if (command === "rename" && args.length === 3) {
    const oldCommand = args[1];
    const newCommand = args[2];
    
    if (oldCommand in commands) {
      const link = commands[oldCommand];
      delete commands[oldCommand];
      commands[newCommand] = link;
      
      fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
        if (err) console.error(err)
      });
      message.channel.send("**Switching out utensils...**");
    }
    else {
      message.channel.send("**I don't own a utensil called " + oldCommand + "...**"); 
    }
  }
  else if (command in commands) {
    // Post the link associated with a command
    message.channel.send(commands[command]);
  }
  else {
    // Post all the large emojis if it exists
    args.forEach(function(arg) {
      sendFatEmoji(arg, message);
    });
  }
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

const petResponses = ["no", "satisfied", "ow", "squee"];

// Using async/await so I can send messages in order
async function sendFatEmoji(arg, message) {
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
    
    try {
      await message.channel.send(attachment);

      // Super secret pets
      if (message.author.tag === process.env.SECRET_USER && emojiName === "pet") {
        const choice = Math.floor(Math.random() * 5);
        const choiceAttachment = new Attachment(client.emojis.find(em => em.name === petResponses[choice]).url);
        await message.channel.send(choiceAttachment);
      }
    } catch (e) {
      console.error(e); 
    }
  }
}