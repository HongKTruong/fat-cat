const util = require("../modules/util.js");

// Adds a custom keyword and its associated link
exports.run = (client, message, args) => {
  if (args.length < 3) {
    return message.channel.send("**\:interrobang: I don't understand... " + 
                                "Try** `!add <key> <link>`");
  }
  
  args.shift(); // Remove "add" command
  const key = args.shift();
  const link = args.join(" ");
  const food = ["\:ramen:", "\:spaghetti:", "\:stew:", "\:curry:", "\:sushi:",
              "\:bento:", "\:icecream:", "\:cake:", "\:pancakes:", "\:flan:",
              "\:beers:", "\:tropical_drink:", "\:sake:"];
  
  if (key.length > 15) {
    return message.channel.send("**\:no_entry_sign: **`" + key + "`** is too long! " +
                                "**`<key>`** must be shorter than 15 characters.**");
  }
  if (client.keywords.has(key)) {
    return message.channel.send("**\:no_entry_sign: I've eaten this already...**");
  }
  
  // Save keyword with the link and message metadata
  const guild = (message.guild.available) ? "-1" : message.guild.id;
  client.keywords.set(key, {
    server: guild,
    creator: message.author.id,
    keyword: key,
    content: link
  });

  // Send confirmation with a random food
  const choice = util.randomize(food);
  // const choice = Math.floor(Math.random() * food.length);
  message.channel.send("**Mmm...tasty " + choice + "...I can feel myself getting fatter!**");
}