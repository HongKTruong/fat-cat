const charLimit = 2000;

// Post a table of all custom commands associated with a link
module.exports = {
  command: '!list [time|usage]',
  shortDescription: 'display a table of all custom keywords in alphabetical order, order added, or by usage.',
  longDescription: 'Display a table of all custom keywords in alphabetical order. \nAlternatively, order the table from oldest to newest added by typing `!list time`, or by most used to least used by typing `!list usage`',
  example: '!list, !list time, !list usage',
  run: (client, message, args) => {
    let list = "**These are the snacks I've eaten:** \n";
    let keywords = Array.from(client.keywords.keys());
    let counters = []

    // Sort the list by either time, alphabet, or usage
    if (args.length === 1) {
      // Sort by alphabet: a-z
      keywords.sort();
    }
    else {
      if (args[1] == "usage") {
        // Order by usage: most used to least used
        const sorted = client.keywords.array().sort((a,b) => b.counter - a.counter);
        keywords = sorted.map(key => key.keyword);
        counters = sorted.map(key => key.counter);
      }
      else if (args[1] === "time") {
        // Already sorted by time
      }
      else {
        keywords.sort();
      }
    }

    // Create a table of the keywords, ordered column first
    let col = 1;
    let padding = 15;
    const numCols = 4;
    const numRows = Math.ceil(keywords.length/numCols);
    let table = "";
    
    if (args.length > 1 && args[1] === "usage") {
      padding += 5;
    }

    for (let i=0; i<numRows; i++) {
      for (let j=0; j<numCols; j++) {
        let index = j*numRows + i;

        // Stop if last keyword will not create a perfect square table
        if (index >= keywords.length) {
          break;
        }
        table += keywords[index] 
        
        // Add padding if we want to display the counter for the keyword
        let counterSize = 0;
        if (args.length > 1 && args[1] === "usage") {
          table += "(" + counters[index] + ")";
          counterSize = 2 + counters[index].toString().length;
        }
        table += " ".repeat(padding - keywords[index].length - counterSize);
      }
      table += "\n";
    }
    
    // Break the table up into parts to stay within the character limit
    if (table.length <= charLimit) {
      message.channel.send("`" + table + "`");
    }
    else {
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
}
