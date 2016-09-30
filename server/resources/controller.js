'use strict'
const mw = require('../config/middleware.js');
const request = mw.request;
const url = mw.urls.database;
const bcrypt = mw.bcrypt;
const User = require('./schema.js');
const SALT = 10;

function checkAuth(req, res, cb) {
  User.findOne({username: req.params.username},
    (err, data) => err ? 
      res.status(500).send(err)
      : !data ? 
        res.status(404).send(JSON.stringify("invalid user"))
        : bcrypt.compare(req.params.password, data.password,
          (err, match) => err ? 
            res.status(500).send(err)
            : !match ? 
              res.status(401).send(JSON.stringify("invalid password"))
              : cb(data, match))
  );
};

module.exports = {
  pingDb (req, res) {
    require('../db/index.js').readyState ? 
      res.status(200).send(JSON.stringify('db connected'))
      : res.status(503).send(JSON.stringify({name: 'MONGO_CONN_FAIL', message: 'bad MongoDB connection'}
      ));
  },
  getUser(req, res) {
    let id = req.params.id;
    User.find(id ? {_id: req.params.id} : {}, 
      (err, data) => err ? 
        res.status(404).send(err)
        : res.status(200).send(data)
    );
  },
  signin(req, res) { //returns user unique id after signin
    checkAuth(req, res, (data, match) => res.status(200).send(data._id));
  }, 
  createUser(req, res) {
    bcrypt.hash(req.params.password, SALT, 
      (err, bcPass) => err ? 
        res.status(500).send(err)
        : (() => {
            let user = req.body;
            user.password = bcPass;
            user.username = req.params.username;
            new User(user).save(err => err ? 
              (()=>{
                err = err.toJSON();
                delete err.op; //do not return attempted user data
                res.status(400).send(err)
              })()
              : res.status(201).send("User created")
            );
          })()
    );
  },
  editUser(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, 
      req.body,
      {new: true},
      (err, data) => err ?
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data))
    );
  }, 
  deleteUser(req, res) {
    User.remove({_id: req.params.id}, 
      (err, data) => err ?
        res.status(404).send(err)
        : res.status(200).send(JSON.stringify(data))
    );
  }
};
