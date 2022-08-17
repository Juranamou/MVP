require('dotenv').config();
const db = require('./db.js');
const spy = require('./silentSpy.js');
const puppeteer = require('puppeteer');
var nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { response } = require('express');
const EbayAuthToken = require('ebay-oauth-nodejs-client');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


app.get('/token', async (req, res) => {
   const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUri
  });
  const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  res.send(token);
});

app.get(`/scraper/:product`, async (req, res) => {
  let product = req.params.product;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${product}&_in_kw=1&_ex_kw=&_sacat=0&LH_Sold=1&_udlo=&_udhi=&_samilow=&_samihi=&_sadis=15&_stpos=28117&_sargn=-1%26saslc%3D1&_salic=1&_sop=13&_dmd=1&_ipg=240&LH_Complete=1&_fosrp=1`, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(() => {
    let price = [];
    document.querySelectorAll('li[class="lvprice prc"] > span').forEach(element => {
      if (!element.innerText.includes('Trending') && !element.innerText.includes('to')) {
        price.push(element.innerText);
      }
    });
    return price;
  })

  // Respond with the image
  res.send(data);
  await browser.close();
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post(`${process.env.address}/form`, (req, res) => {
  db.addUser(req.body)
    .then(() => { res.sendStatus(200); })
    .catch((err) => { console.log(err); })
});

// qcblmodnpmjvfcyy
app.post(`${process.env.address}/email`, (req, res) => {
  var from = req.body.from;
  var to = req.body.to;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'johnlafayeti@gmail.com',
      pass: 'qcblmodnpmjvfcyy'
    }
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    response.redirect('/')
  })
})

app.listen(process.env.port, () => {
  console.log(`Example app listening on port 3000`);
});