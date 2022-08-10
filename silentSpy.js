const db = require('./db.js');
const axios = require('axios');
require('dotenv').config();

async function looper () {
  db.findAll()
  .then(async (data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      let user = data[i];
      let urls = await axiosGet(user.query, user.target, user.min);
      if (urls.length > 0) {

      }
    }
  })
}

function axiosGet(query, target, min) {
  axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=200`, { headers: { "Authorization": `Bearer ${process.env.TOKEN}` } })
      .then((data) => {return data.data.itemSummaries; })
      .then((data) => {
        let urls = [];
        for (var i = 0; i < data.length; i++) {
          let price = data[i].price.value;
          if (price <= target && price > min) {
            // console.log(data[i].itemWebUrl);
            urls.push(data[i].itemWebUrl);
          }
        }
        return urls;
      })

      .catch((err) => {console.log(err);})
}

setInterval(() => {
  // looper()
}, 5000);


