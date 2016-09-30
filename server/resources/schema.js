'use strict'
const mongoose = require('../config/middleware.js').mongoose;

module.exports = mongoose.model('User', new mongoose
  .Schema({
    username: {
      type:String,
      unique: true
    }, 
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    bio: String,
    dateSignedUp: Date,
    dateLastLogin: Date,
    dateProfileLastUpdated: Date
  },
  { versionKey: false })
);