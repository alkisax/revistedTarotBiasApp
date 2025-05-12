// query.model.js

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  question: String,
  bias: String,
  response: {
    type: String
  },
  important:{
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // This stores a reference (ID) to a user document
    ref: 'User', // This tells Mongoose to link this field to the 'User' model
    required: true
  }
},
{
  collection: 'queries',
  timestamps: true
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
