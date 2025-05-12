const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema({
  username:{
    type: String,
    required: [true, 'username is required'],
  },
  hashedPassword:{
    type: String,
    required: [true, 'password is required'],
  },
  roles:{
    type: [String],
    default: ['user'],
    immutable: true
  },
  query: [{
    type: mongoose.Schema.Types.ObjectId, // Each item here is an ObjectId pointing to a Query document
    ref: 'Query' // This tells Mongoose *which* collection/model to link (the 'Queries' model)
  }],
},
{
  collection: 'users',
  timestamps: true
})
module.exports = mongoose.model('User', userSchema)