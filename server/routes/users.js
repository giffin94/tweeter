"use strict";

const bcrypt = require('bcrypt');
const express       = require('express');
const userRoutes  = express.Router();

function getRandomString() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

// handles operations for the users collection in our mongo db
module.exports = function(DataHelpers) {
  
  userRoutes.post("/reg", function(req, res) {
    const newUser = {
      _id: getRandomString(),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      tag: req.body.tag,
      tweets: []
    }
    console.log(newUser);
    // DataHelpers.registerUser(newUser);
  });

  return userRoutes;

}
