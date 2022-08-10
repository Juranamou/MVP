const db = require('./db.js');
const axios = require('axios');
require('dotenv').config();

async function looper() {
  db.findAll()
    .then(async (data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        let user = data[i];
        let urls = await axiosGet(user.query, user.target, user.min);
        console.log('url', urls);
        if (urls.length > 0) {

          axios.post('http://localhost:8080/email',
           {
            from: 'johnlafayeti@gmail.com',
            to: user.email,
            subject: 'wow',
            message: JSON.stringify(urls)
          })
        }
      }
    })
}

async function axiosGet(query, target, min) {
  let response = await axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=200`,
    { headers: { "Authorization": `Bearer ${process.env.TOKEN}` } })

  let data = response.data.itemSummaries
  let urls = [];

  for (var i = 0; i < data.length; i++) {
    let price = data[i].price.value;
    if (price <= target && price > min) {
      urls.push(data[i].itemWebUrl);
    }
  }

  console.log('URL', urls);
  return urls;

}

setInterval(() => {
  looper()
}, 80000000);


