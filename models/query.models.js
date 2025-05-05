// query.model.js

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  message: String,
  bias: String,
},
{
  collection: 'queries',
  timestamps: true
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
