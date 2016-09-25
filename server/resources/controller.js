const mw = require('../config/middleware.js');
const request = mw.request;
const db = require('./db.js');
const url = mw.database;
const Sequelize = mw.sequelize;
const bcrypt = require('bcrypt');
module.exports = {
  getUser(req, res) {
    res.status(200).send(req.params.username);
    // request(`${url}/${req.params.username}`, (err, res, body) => err ?
    //   res.status(404).send(err)
    //   : res.status(200).send(res)
    // );
  },
  checkAuth(req, res) {

  },
  createUser(req, res) {

  },
  editUser(req, res) {

  },
  deleteUser(req, res) {

  }
};
