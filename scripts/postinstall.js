const https = require('https');
const fs = require('fs');

var dir = __dirname + '/../resource'; // create ./resource directory

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const file = fs.createWriteStream(dir + "/riotgames.pem"); // downloading game client SSL certificate
const request = https.get("https://static.developer.riotgames.com/docs/lol/riotgames.pem", function(response) {
  response.pipe(file);
});