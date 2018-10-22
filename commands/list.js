// Post a table of all custom commands associated with a link
exports.run = (client, message, []) => {
  var list = "**These are the snacks I've eaten:** \n";
  list += "`";
  
  var col = 1;
  const pad = 15; // Length of each "table" column
  const numCols = 5;
  
  Array.from(client.keywords.keys()).forEach(key => {
    list += key;
    
    // Create a table with numCols columns with a length of pad per column
    if (col < numCols) {
      if (key.length < pad) {
        list += " ".repeat(pad-key.length);
        col += 1
      }
    }
    else {
      list += "\n";
      col = 1;
    }
  });
  list += "`";
  message.channel.send(list);
}