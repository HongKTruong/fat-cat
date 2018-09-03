// Replace the link of an existing keyword
exports.run = (client, message, args) => {
  if (args.length !== 3) {
    return message.channel.send("**\:interrobang: I don't understand... " + 
                                "Try** `!edit <existing_key> <link>`"); 
  }
  
  const key = args[1];
  const newLink = args[2];
  
  if (client.keywords.has(key)) {
    client.keywords.set(key, newLink);
    message.channel.send("**\:white_check_mark: **`" + key + "`** has a new link!**");
  }
  else {
    message.channel.send("**\:warning: I don't own a utensil called " + key + "...**");
  }
}