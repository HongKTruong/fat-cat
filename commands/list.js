// Post a table of all custom commands associated with a link
exports.run = (client, message, args) => {
  let list = "**These are the snacks I've eaten:** \n";
  const keywords = Array.from(client.keywords.keys());
  
  // Alphabetize the keywords
  if (args.length === 1 || args[1] !== "time") {
    keywords.sort();
  }
  
  // Create a table of the keywords, ordered column first
  let col = 1;
  const padding = 15;
  const numCols = 5;
  const numRows = Math.ceil(keywords.length/numCols);
  let table = "";
  
  for (let i=0; i<numRows; i++) {
    for (let j=0; j<numCols; j++) {
      let index = j*numRows + i;
      
      // Stop if last keyword will not create a perfect square table
      if (index >= keywords.length) {
        break;
      }
      table += keywords[index] + " ".repeat(padding - keywords[index].length);
    }
    table += "\n";
  }
  
  message.channel.send(list + "`" + table + "`");
}