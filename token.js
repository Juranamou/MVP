const EbayAuthToken = require('ebay-oauth-nodejs-client');

const ebayAuthToken = new EbayAuthToken({
    clientId: 'JohnEcon-SilentSp-PRD-913e5f484-4042dff1',
    clientSecret: 'PRD-13e5f4842591-e716-4366-82af-43ac',
    redirectUri: 'John_Economou-JohnEcon-Silent-ioslypt'
});


(async () => {
  const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  console.log(token);
  module.exports.token = token;
})();

setInterval(() => {
  (async () => {
    const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
    // console.log(token);
    // module.exports.token = token;
  })();
}, 4000000);