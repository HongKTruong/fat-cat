const util = require("../modules/util.js");

// Adds a custom keyword and its associated link
exports.run = (client, message, args) => {
  if (args.length !== 3) {
    return message.channel.send("**\:interrobang: I don't understand... " + 
                                "Try** `!add <key> <link>`");
  }
  
  const key = args[1];
  const link = args[2];
  const food = ["\:ramen:", "\:spaghetti:", "\:stew:", "\:curry:", "\:sushi:",
              "\:bento:", "\:icecream:", "\:cake:", "\:pancakes:", "\:flan:",
              "\:beers:", "\:tropical_drink:", "\:sake:"];
  
  if (client.keywords.has(key)) {
    return message.channel.send("**\:no_entry_sign: I've eaten this already...**");
  }
  
  // Save the command and its link
  client.keywords.set(key, link);

  // Send confirmation with a random food
  const choice = util.randomize(food);
  // const choice = Math.floor(Math.random() * food.length);
  message.channel.send("**Mmm...tasty " + choice + "...I can feel myself getting fatter!**");
}