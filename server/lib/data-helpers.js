"use strict";
//Allows us to access the ObjectId prototype (for use when finding a tweet by ID)
const ObjectId = require('mongodb').ObjectId; 

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in mongo collection
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    updateLikes: function(tweetId, likes, callback) {
      let ID = ObjectId(tweetId);
      db.collection("tweets").findOneAndUpdate({"_id": ID}, {$set: {"likes": `${likes}`}}, callback);
    },
    
    getUsers: function(callback) {
    db.collection("users").find().toArray(callback);
      //   let userCheck = [];
    // userCheck = registryHelper.checkEmailAndTag(userObject, users);
    //     if (userCheck[1] === false) {
    //       callback(402);
    //     } else if(userCheck[0] === false) {
    //       callback(402);
    //     }
    },
  //   registerUser: function(userObject, callback) {
  //     // db.collection("users").insertOne(userObject, callback); 
  //   }
  };

}
