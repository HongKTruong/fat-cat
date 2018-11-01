const Discord = require("discord.js");

function getGeneralHelp(client) {
  let helpMsg = "Say \"!help <command>\" for additional information on the command.\n" +
      "  'Example': !help listemojis\n\n" +
      "Note: \"<word>\": substitute word with your own text\n" +
      "      \"[word]\": optional parameter\n\n";
  
  // Add each command, its description, and an example to the message
  client.commands.forEach(command => {
    if (command.shortDescription == undefined)
      return;

    helpMsg += "\"" + command.command + "\"\n" +
      command.shortDescription + "\n" +
      "  'Example': " + command.example + "\n\n";
  });

  // Manually add the custom emoji option since it's not technically a command
  helpMsg += "\"!:customEmoji:\"\n" +
    "i will post a fatter version of this custom emoji.\n" +
    "  'Example': !:thicc:\n\n";
  
  return "```ml\n" + helpMsg + "```";
}

function getCmdHelp(client, command) {
  let embed = new Discord.RichEmbed()
    .setTitle("`" + command.command + "`")
    .setDescription(command.longDescription)
    .setColor("62554b")
    .addField("Examples", command.example);
  
  return {embed};
}

// Post a list of all usable commands
exports.run = (client, message, args) => {
  // Check if user wants general help or a specific cmd's help
  let command = "";
  if (args.length > 1)
    command = args[1]
  
  const cmd = client.commands.get(command);
  if (cmd) {
    message.channel.send(getCmdHelp(client, cmd));
  }
  else {
    message.channel.send(getGeneralHelp(client));
  }
}
