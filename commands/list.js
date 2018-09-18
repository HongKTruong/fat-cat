// Post a list of all custom commands associated with a link
exports.run = (client, message, []) => {
  var list = "**These are the snacks I've eaten:** \n";
  
  Array.from(client.keywords.keys()).forEach(key => {
    list += "- `" + key + "`\n";
  });
  message.channel.send(list);
}