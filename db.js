const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongod);
  console.log('connected to mongod')
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
