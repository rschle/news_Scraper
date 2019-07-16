const express = require("express");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");

const app = express();


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index");
  });


app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
  