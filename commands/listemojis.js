const charLimit = 2000;

// Post a list of all custom emojis from all guilds Fat Cat is in
exports.run = (client, message, []) => {
  var list = "**These are the custom emojis available to me:** \n";
  
  // Store all the emojis in a string separated by space
  var emojiList = client.emojis.map(em => em.toString()).join(" ");
   
  if (emojiList.length <= charLimit) {
    message.channel.send(emojiList); 
  }
  else {
    // Break the emoji list into multiple messages to avoid the 2000-char limit
    while (emojiList.length > charLimit) {
      var end = charLimit;
      var tempString = emojiList.substring(0, end);
      
      // Prevent an emoji from being cut in half
      if (tempString[tempString.length-1] !== ">") {
        end = tempString.lastIndexOf("<")-1; // -1: Otherwise, in else case, emojiList will start on a ">"
      }
      
      message.channel.send(tempString.substring(0, end+1));
      emojiList = emojiList.substring(end+1, emojiList.length);
    }
    
    // Send the rest of the list
    if (emojiList.length !== 0) {
      message.channel.send(emojiList); 
    }
  }
}