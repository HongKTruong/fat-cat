// Replace the link of an existing keyword
module.exports = {
  command: '!edit <keyword> <new response>',
  shortDescription: 'replace the response for an existing keyword.',
  longDescription: 'Replace the response for an existing keyword. When `!<keyword>` is typed, I will reply with this new response.',
  example: '!edit hello goodbye',
  run: (client, message, args) => {
    if (args.length !== 3) {
      return message.channel.send("**\:interrobang: I don't understand... " +
                                  "Try** `!edit <existing_key> <link>`");
    }

    const key = args[1];
    const newLink = args[2];
    const guild = (message.guild.available) ? "-1" : message.guild.id;

    if (client.keywords.has(key)) {
      client.keywords.setProp(key, "server", guild);
      client.keywords.setProp(key, "creator", message.author.id);
      client.keywords.setProp(key, "content", newLink);
      client.keywords.setProp(key, "counter", 0);
      message.channel.send("**\:white_check_mark: **`" + key + "`** has a new link!**");
    }
    else {
      message.channel.send("**\:warning: I don't own a utensil called " + key + "...**");
    }
  }
}
