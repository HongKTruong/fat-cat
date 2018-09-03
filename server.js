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
// https://anidiots.guide/first-bot/a-basic-command-handler
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();

// Store user-created custom keywords in an Enmap database (create table if doesn't exist)
// https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/coding-guides/using-persistentcollections.html
client.config = config;
client.commands = new Enmap({name: 'commands', dataDir: './.data'});
client.keywords = new Enmap({name: 'keywords', dataDir: './.data'});

// Load and listen for all needed events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  
  files.forEach(file => {
    const event = require('./events/' + file);
    let eventName = file.split(".")[0];
    // Each event will be called with 'client' var first and then the rest of its vars
    client.on(eventName, event.bind(null, client));
  });
});

// Store all command names with its associated file
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    
    let props = require('./commands/' + file);
    let commandName = file.split(".")[0];
    console.log("Loading command: " + commandName);
    client.commands.set(commandName, props);
  });
});

// Login with credentials
console.log("Logging into Discord...");
client.login(process.env.TOKEN);
console.log("Logged in.");