const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'resource'); // create ./resource directory

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

/* The Game Client API requires all requests to be signed with a root certificate,
which needs to be downloaded from the Riot Games servers during the post-installation step.
Theoretically, one could set `rejectUnauthorized=false` within the axios https.Agent config,
but this is unsafe. */

const file = fs.createWriteStream(path.join(dir, 'riotgames.pem')); // downloading game client SSL certificate
https.get('https://static.developer.riotgames.com/docs/lol/riotgames.pem', (response) => {
    response.pipe(file); // pipe output to resource/riotgames.pem.
});
