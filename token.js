const EbayAuthToken = require('ebay-oauth-nodejs-client');

const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUri
});

async function createToken() {
  token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  console.log(token);
}

createToken();

setInterval(() => {
  (async () => {
    token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  })();
}, 4000000);

module.exports.createToken = createToken
