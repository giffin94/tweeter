"use strict";
//Allows us to access the ObjectId prototype (for use when finding a tweet by ID)
const ObjectId = require('mongodb').ObjectId; 
const registryHelper = require('./util/registry-helper.js');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    updateLikes: function(tweetId, likes, callback) {
      let ID = ObjectId(tweetId);
      db.collection("tweets").findOneAndUpdate({"_id": ID}, {$set: {"likes": `${likes}`}}, callback);
    },
    
    registerUser: function(userObject, callback) {
      db.collection("users").find().toArray(function(err, users) {
        let userCheck = [];
        userCheck = registryHelper.checkEmailAndTag(userObject, users);
        console.log(userCheck);
        if (userCheck[1] === false) {
          //callback with error
        } else if(userCheck[0] === false) {
          //callback with tag taken
        } else {
          // db.collection("users").insertOne(userObject, callback);
        } 
      });
    }
  };

}
