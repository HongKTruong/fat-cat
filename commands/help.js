// Post a list of all usable commands
exports.run = (client, message, []) => {
  let helpMsg = "";

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

  message.channel.send("```ml\n" + helpMsg + "```");
}
