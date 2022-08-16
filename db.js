const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/MVP');
  console.log('connected to mongodb://localhost:27017/MVP')
}

const spySchema = new mongoose.Schema({
  email: String,
  query: String,
  target: Number,
  min: Number,
});

const Spy = mongoose.model('Spy', spySchema);

const addUser = (form) => {
  return (Spy.create(form));
};

const findAll = () => {
  return (Spy.find({}).exec());
}
module.exports.addUser = addUser;
module.exports.findAll = findAll;
