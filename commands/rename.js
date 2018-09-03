// Rename a custom command
exports.run = (client, message, args) => {
  if (args.length !== 3) {
    return message.channel.send("**\:interrobang: I don't understand... " + 
                                "Try** `!rename <oldKey> <newKey>`");
  }
  
  const oldKey = args[1];
  const newKey = args[2];
  
  if (!client.keywords.has(oldKey)) {
    return message.channel.send("**\:warning: I don't own a utensil called " + oldKey + "...**"); 
  }
  
  if (client.keywords.has(newKey)) {
    return message.channel.send("**\:no_entry_sign: I already own the utensil `" + newKey + "`**"); 
  }
  
  // Remove the old key and add a new key and link   
  const link = client.keywords.get(oldKey);
  client.keywords.delete(oldKey);
  client.keywords.set(newKey, link);

  message.channel.send("**\:white_check_mark: Utensils switched out**");
}