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
      default: 'https://pixabay.com/static/uploads/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png'},
    dateSignedUp: Date,
    dateLastLogin: Date,
    dateProfileLastUpdated: Date
  },
  { versionKey: false })
);
