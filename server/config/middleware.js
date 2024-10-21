'use strict'
let mongoose = require('mongoose');
mongoose.Promise = global.Promise; //fixes depreciated mongoose promise by implementing ES6 promise.

const express = require('express');

module.exports = {
  urls: require('./urls.js'),
  express: express,
  router: express.Router,
  mongoose: mongoose,
  bodyParser: require('body-parser'),
  chalk: require('chalk'),
  bcrypt: require('bcryptjs'),
  request: require('request')//,
  // sequelize: require('sequelize'), 
  // pg: require('pg'),
  // dbAuth: require('./dbAuth.js'),
}