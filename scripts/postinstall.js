const https = require('https');
const fs = require('fs');
const path = require('path');

var dir = path.join(__dirname, '..', 'resource'); // create ./resource directory

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const file = fs.createWriteStream(path.join(dir, "riotgames.pem")); // downloading game client SSL certificate
https.get("https://static.developer.riotgames.com/docs/lol/riotgames.pem", function(response) {
  response.pipe(file);
});