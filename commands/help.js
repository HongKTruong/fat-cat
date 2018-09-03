// Post a list of all usable commands
exports.run = (client, message, []) => {
    message.channel.send("**These are the tricks that I can do:**\n" +
                         "- `!add <key> <link>` - to add a new link for me to post\n" +
                         "- `!delete <key1> <key2>...` - to remove link(s) from my memory\n" +
                         "- `!rename <key1> <key2>` - renames a custom keywords from `key1` to `key2`\n" +
                         "- `!edit <command> <new_link>` - replaces the link for an existing command\n" +
                         "- `!list` - to get a list of all the custom keywords that I know\n" +
                         "- `!:customEmote:` - to post a fatter version of the emote\n"); 
}