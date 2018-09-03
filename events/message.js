const util = require('../modules/util.js');

module.exports = (client, message) => {
  // Ignore message if it doesnt start with the prefix
  if (!message.content.startsWith(client.config.prefix)) return;
  
  // Get each space-separated word without the prefix
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args[0];
  
  // Grab this command's file data from the Enmap
  const cmd = client.commands.get(command);
  
  if (cmd) {
    // Run the command
    console.log("Running the command: " + command);
    cmd.run(client, message, args);
  }
  else {
    // If command doesn't exist, check if it's a custom keyword or emote  
    if (client.keywords.has(command)) {
      console.log("Post link of custom command: " + command);
      message.channel.send(client.keywords.get(command)); 
    }
    else {
      args.forEach(function(arg) {
        util.sendFatEmoji(client, message, arg);
      });
    }
  }
};