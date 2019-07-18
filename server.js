const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
// const axios = require("axios");
// const cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;





var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.use(express.static("public"));

app.use(require("./routes/routes.js"));


app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
  });
  