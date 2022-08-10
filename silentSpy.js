const db = require('./db.js');
const axios = require('axios');
require('dotenv').config();

async function looper () {
  db.findAll()
  .then(async (data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      let user = data[i];
      await axiosGet(user.query);
    }
  })
}

function axiosGet(query) {
  console.log(query);
  // console.log(process.env.TOKEN);
  axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=200`, { headers: { "Authorization": `Bearer ${process.env.TOKEN}` } })
      .then((data) => { console.log(data.data.itemSummaries); return data.data.itemSummaries; })
      .catch((err) => {console.log(err);})
}

setInterval(() => {
  // looper()
}, 5000);


