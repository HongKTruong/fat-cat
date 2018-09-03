const util = require("../modules/util.js");

module.exports = (client, oldMsg, newMsg) => {
  // Ignore message if it doesnt start with the prefix
  if (!newMsg.content.startsWith(client.config.prefix)) return;

  // Get each space-separated word without the prefix
  const args = newMsg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const oldArgs = oldMsg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  
  // Tracks the current word in a message
  var index = 0;

  args.forEach(function(arg) {
    if (index >= oldArgs.length) {
      // Post any newly added emojis
      util.sendFatEmoji(client, newMsg, arg);
    }
    else {
      // Don't repost already posted emojis
      const oldArg = oldArgs[index]
      if (arg !== oldArg) {
        util.sendFatEmoji(client, newMsg, arg);
      }
      index++;
    }
  });
}