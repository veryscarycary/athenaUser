'use strict'
const mw = require('../config/middleware.js');
const request = mw.request;
const url = mw.urls.database;
const bcrypt = mw.bcrypt;
const User = require('./schema.js');
const SALT = 10;

function checkAuth(req, res, cb) {
  let query = {};
  if(req.body.hasOwnProperty('id'))
    query._id = req.body.id;
  else
    query.username = req.body.username;
  User.findOne(query,
    (err, data) => err ?
      res.status(500).send(err)
      : !data ?
        res.status(404).send(JSON.stringify('invalid user'))
        : bcrypt.compare(req.body.password, data.password,
          (err, match) => err ?
            res.status(500).send(err)
            : !match ?
              res.status(401).send(JSON.stringify('invalid password'))
              : cb(data, match))
  );
};

module.exports = {
  pingDb (req, res) {
    require('../db/index.js').readyState ?
      res.status(200).send(JSON.stringify('db connected'))
      : res.status(503).send(JSON.stringify({name: 'MONGO_CONN_FAIL', message: 'bad MongoDB connection'})
      );
  },
  getUser(req, res) {
    let id = req.query.id;
    User.find(id ? {_id: id} : {},
      (err, data) => err ?
        res.status(404).send(err)
        : res.status(200).send(data)
    );
  },
  signin(req, res) { //returns user unique id after signin
    checkAuth(req, res, data => res.status(200).send(data));
  },
  createUser(req, res) {
    bcrypt.hash(req.body.password, SALT,
      (err, bcPass) => err ?
        res.status(500).send(err)
        : (() => {
            let user = req.body;
            user.password = bcPass;
            user.username = req.body.username;
            new User(user).save((err, data) => err ?
              (()=>{
                err = err.toJSON();
                delete err.op; //do not return attempted user data
                res.status(400).send(err)
              })()
              : res.status(201).send({_id: data._id, roles: data.roles})
            );
          })()
    );
  },
  editUser(req, res) {
    let id = req.body.id;
    req.body.hasOwnProperty('newPassword') ? 
      checkAuth(req, res, data => {
        req.body.password = req.body.newPassword;
        delete req.body.newPassword;
        bcrypt.hash(req.body.password, SALT, 
          (err, bcPass) => err ? 
            res.status(500).send(err)
            : updateHelper(bcPass));
      })
      : updateHelper();
    function updateHelper (password) {
      if(password)
        req.body.password = password;
      else 
        delete req.body.password;
      User.findOneAndUpdate({_id: id},
        req.body,
        //{new: true},
        err => err ?
          res.status(404).send(err)
          : res.status(200).send(id)
      );
    }
  },
  deleteUser(req, res) {
    //checkAuth(req, res, data => //commented out -- not requiring auth to delete since only admins can delete
      User.remove({_id: req.body.id},
        (err, data) => err ?
          res.status(404).send(err)
          : res.status(200).send(JSON.stringify(data))
      )
    //);
  }
};
