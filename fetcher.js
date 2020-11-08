const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const filePath = process.argv[3];


// const pageFetcher = (url, cb) => {

//   request(`${url}`, (error, response, body) => {

//     if (error) cb(error, null);
//     if (response.statusCode !== 200) cb('Error!', null);

//     fs.writeFile(filePath, body, (error) => {
//       if (error) {
//         cb(error,null);
//         return;
//       }
//       cb(null, 'finished writing');
//     }) 


//   });

// }

// pageFetcher(url, (error, info) => {
//   if (error) {
//     console.log('ERROR');
//     return;
//   }
//   console.log(info);
// });


const pageFetcher = (url) => {
  request(url, (error, response, body) => {
    
    if (error) { 
      console.log('Error: ', error.toString());
      return;
    }
    if (response.statusCode !== 200) {
      console.log('Error: incorrect url');
      return;
    }
    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log('Error:', error.toString());
        return;
      }
      const fileSize = fs.statSync(filePath).size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    }) 

  });

}



pageFetcher(url, filePath);