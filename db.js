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
  max: Number
});

const Spy = mongoose.model('Spy', spySchema);

const addUser = (form) => {
  return (Spy.findOneAndUpdate(form.email, form, {upsert: true}).exec());
};
module.exports.addUser = addUser;
