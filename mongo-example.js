"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> we have a connection the the "test-tweets" db,
  // starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Get all tweets! Mongospeak: 'find'

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging tweets.");
    for(const tweet of tweets) {
      console.log(tweet);
    }
  })
  // ==> At the end we close connection
  db.close();

});