const Discord = require("discord.js");

// Takes an array of choices and returns a random element from choices
const randomize = (choices) => {
  const randomNumber = Math.floor(Math.random() * choices.length);
  return choices[randomNumber];
}

// Scan for emojis, grab their URLs, and post them as an attachment 
const sendFatEmoji = async (client, message, arg) => {
  // Get the emoji name from the emoji code: `<:name:identifier>`
  var emojiName = arg.substring(
    arg.indexOf(":") + 1,
    arg.lastIndexOf(":")
  );
  
  // Remove "\" escape characters at the end
  if (emojiName[emojiName.length-1] === "\\") {
    emojiName = emojiName.substring(0, emojiName.length-1);
  }
  
  // If the client has this emoji, post it as a large attachment
  const customEmoji = client.emojis.find(em => em.name === emojiName)
  if (customEmoji) {
    const attachment = new Discord.Attachment(customEmoji.url);
    
    try {
      // Send the exploded attachment before moving on
      await message.channel.send(attachment);
      console.log("Sent an exploded emote: " + emojiName);

      // Super secret pets
      if (message.author.id === process.env.SECRET_USER && emojiName === process.env.SECRET_ACTION) {
        const petResponses = ["no", "satisfied", "ow", "squee"];
        const choice = randomize(petResponses);
        const choiceAttachment = new Discord.Attachment(client.emojis.find(em => em.name === choice).url);
        await message.channel.send(choiceAttachment);
        console.log("Sent a secret response: " + choice);
      }
    } catch (e) {
      console.error(e); 
    }
  }
}

module.exports.randomize = randomize;
module.exports.sendFatEmoji = sendFatEmoji;
