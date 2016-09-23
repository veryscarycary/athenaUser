const request = require('request');
const url = require('../urls.js').database;
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
