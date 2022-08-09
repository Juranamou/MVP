const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.get('/scraper/:product', async (req, res) => {
  let product = req.params;
  console.log(req.params);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${product}&_in_kw=1&_ex_kw=&_sacat=0&LH_Sold=1&_udlo=&_udhi=&_samilow=&_samihi=&_sadis=15&_stpos=28117&_sargn=-1%26saslc%3D1&_salic=1&_sop=13&_dmd=1&_ipg=240&LH_Complete=1&_fosrp=1`, {waitUntil: 'networkidle2'});

  let data = await page.evaluate(() => {
    let price = [];
    document.querySelectorAll('li[class="lvprice prc"] > span').forEach(element => {
      if (!element.innerText.includes('Trending')) {
        price.push(element.innerText);
      }
    });
    return price;
  })
  console.log(JSON.stringify(data));

    // Respond with the image
    res.send(data);
    await browser.close();
})

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});