// Deletes 1 or more custom command
exports.run = (client, message, args) => {
  if (args.length < 2) {
    return message.channel.send("**\:interrobang: I don't understand... " +
                                "Try** `!delete <key1> <key2> ...`");
  }
  
  // Remove "delete" from the list of commands
  args.shift();
  
  args.forEach(async function(key) {
    try {
      if (client.keywords.has(key)) {
        client.keywords.delete(key);
        await message.channel.send("**\:balloon: Losing weight by throwing out **`" + key + "`**...**");
      }
      else {
        await message.channel.send("**\:warning: I don't own a utensil called **`" + key + "`**...**");
      }
    }
    catch (e) {
      console.error(e);
    }
  });
  message.channel.send("**\:white_check_mark: Optimal weight reached.**");
}