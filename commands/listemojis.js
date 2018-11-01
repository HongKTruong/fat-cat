const charLimit = 2000;

function sendEmojis(client, message) {
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

function sendNames(client, message) {
  // Store all the emojis in a string separated by space
  let emojiList = client.emojis.map(em => em.name).sort();

  // Create a table of the emoji names, ordered column first
  let col = 1;
  const padding = 16;
  const numCols = 4;
  const numRows = Math.ceil(emojiList.length/numCols);
  let table = "";
  let totalNumChars = charLimit; // Multiplier of charLimit that shows how many messages will be needed

  for (let i=0; i<numRows; i++) {
    for (let j=0; j<numCols; j++) {
      let index = j*numRows + i;

      // Stop if last keyword will not create a perfect square table
      if (index >= emojiList.length) {
        break;
      }

      // Don't start a new row if it'll be cut off by the character limit
      if (table.length + padding*numCols > totalNumChars) {
        table += " ".repeat(totalNumChars - table.length) + "\n";
        totalNumChars += charLimit;
      }
      table += emojiList[index] + " ".repeat(padding - emojiList[index].length);
    }
    table += "\n";
  }

  if (table.length <= charLimit) {
    message.channel.send("`" + table + "`");
  }
  else {
    // Break the emoji list into multiple messages to avoid the 2000-char limit
    while (table.length > charLimit) {
      let tempString = table.substring(0, charLimit-2);
      table = table.substring(charLimit-2, table.length);
      message.channel.send("`" + tempString + "`");
    }

    // Send the rest of the list
    if (table.length !== 0) {
      message.channel.send("`" + table + "`");
    }
  }
}

// Post a list of all custom emojis from all guilds Fat Cat is in
module.exports = {
  command: '!listemojis [names]',
  shortDescription: 'display a list of all custom emojis.',
  longDescription: 'Display a list of all custom emojis. You can hover over the emojis to get their names, or type `!listemoji names` to display a table of all custom emoji names.',
  example: '!listemojis, !listemojis names',
  run: (client, message, args) => {
    const list = "**These are the custom emojis available to me:** \n";

    if (args.length > 0 && args[1] === "names") {
      sendNames(client, message);
    }
    else {
      sendEmojis(client, message);
    }
  }
}
