const request = require('request');
const fs = require('fs');
const userInput = process.argv.slice(2);
const filePath = userInput[1];
const URL = userInput[0];

request(URL, (error, response, body) => {
  if (error) {
    console.log('\n',error);
    process.exit();
  }
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      throw err;
    }
    const fileSize = fs.statSync(filePath).size;
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`)
  });
});