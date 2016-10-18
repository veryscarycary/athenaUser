'use strict'
const mongoose = require('../config/middleware.js').mongoose;

module.exports = mongoose.model('User', new mongoose
  .Schema({
    username: {
      type:String,
      unique: true
    },
    password: String,
    roles: Array,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    bio: String,
    pictureUrl: {type: String,
      default: 'http://i.imgur.com/9Ysz6NX.png'},
    dateSignedUp: Date,
    dateLastLogin: Date,
    dateProfileLastUpdated: Date
  },
  { versionKey: false })
);
