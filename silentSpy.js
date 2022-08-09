const db = require('./db.js');

function test () {
  db.findAll()
  .then((data) => {console.log(data)})
}

setInterval(() => {
  test()
}, 10000);