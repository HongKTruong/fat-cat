// Post a list of all usable commands
exports.run = (client, message, []) => {
    message.channel.send("**These are the tricks that I can do:**\n" +
                         "- `!add <key> <link>` - to add a new link for me to post\n" +
                         "- `!delete <key1> <key2>...` - to remove link(s) from my memory\n" +
                         "- `!rename <key1> <key2>` - renames a custom keywords from `key1` to `key2`\n" +
                         "- `!edit <key> <new_link>` - replaces the link for an existing command\n" +
                         "- `!list [time]` - to get a list of all the custom keywords that I know (optional time param orders by time)\n" +
                         "- `!listemojis [names]` - to get a list of all custom emojis that I know\n" +
                         "- `!:customEmote:` - to post a fatter version of the emote\n"); 
}