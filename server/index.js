"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const methodOverride = require('method-override')
const cookieSession = require('cookie-session');

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['xkcd'],
  maxAge: 24 * 60 * 60 * 1000 //24 hours
}));

MongoClient.connect(MONGODB_URI, function(err, db) {
  if (err) throw err;
  console.log("Connected correctly to server");

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const userRoutes = require("./routes/users")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.use("/users", userRoutes);

  app.listen(PORT, () => {
    console.log("Tweeter listening on port " + PORT);
  });
  
});