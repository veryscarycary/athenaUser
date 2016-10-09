'use strict'
const mw = require('../config/middleware.js');
const request = mw.request;
const url = mw.urls.database;
const bcrypt = mw.bcrypt;
const User = require('./schema.js');
const SALT = 10;

function checkAuth(req, res, cb) {
  let query = {};
  if(req.params.hasOwnProperty('id'))
    query._id = req.params.id;
  else
    query.username = req.params.username;
  User.findOne(query,
    (err, data) => err ?
      res.status(500).send(err)
      : !(()=> {console.log(data); return data})() ?
        res.status(404).send(JSON.stringify("invalid user"))
        : bcrypt.compare(req.params.password, data.password,
          (err, match) => err ?
            res.status(500).send(err)
            : match ?
              cb(data, match)
              : (req.params.password === data.password) ?
                cb(data, match)
                : res.status(401).send(JSON.stringify("invalid password")))
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
    checkAuth(req, res, data => res.status(200).send(data));
  },
  createUser(req, res) {
    bcrypt.hash(req.params.password, SALT,
      (err, bcPass) => err ?
        res.status(500).send(err)
        : (() => {
            let user = req.body;
            user.password = bcPass;
            user.username = req.params.username;
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
    console.log('here is the body!', req.body);
    console.log('here is the req.params.id!', req.params.id);

    checkAuth(req, res, data => User
      .findOneAndUpdate({_id: req.params.id},
        req.body,
        {new: true},
        err => err ?
          res.status(404).send(err)
          : res.status(200).send(JSON.stringify(data))
      )
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
