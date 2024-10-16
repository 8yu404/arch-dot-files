const https = require('https');

   https.get('https://example.com', (res) => {
     console.log('statusCode:', res.statusCode);
     console.log('headers:', res.headers);
   }).on('error', (e) => {
     console.error(e);
   });
