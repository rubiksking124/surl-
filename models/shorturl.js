const mongoose = require("mongoose")
let shortid = require("shortid")

let shortURl = mongoose.Schema({
full:{
type: String,
  required: true
},
  short:{
    type: String,
    required: true,
    default: shortid.generate,
    unique: true
  },
  clicks:{
    type: Number,
    required: true,
    default: 0
  },
  auth: {
    type: String
  },
  ip: {
type: String
  }
})
module.exports = mongoose.model('Shorturl5', shortURl)