const db = require("../models")
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
var router = express.Router();


router.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(results) {
        return res.render("index", {articles: results});
    }).catch(function(err) {
        console.log(err);
    })
})

router.get("/articles/:id", (req, res) => {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    db.Article.findOne({ _id: req.params.id })
    //we use findOne here because we are looking at an object and we want to find the specific one with the matching id without looping through all of the articles (since we did not use a for loop for the get route in the app side (thus no way to use the mongoose method of find here which would effectively loop through all of the articles))
      // and run the populate method with "note",
    //   .populate("note")
    //   // ^ field in our article model that we are populating
    //   // then responds with the article with the note included
    //   .then(function (dbArticle) {
    //     res.json(dbArticle);
    //   })
    //   .catch((err) => {
    //     res.json(err);
    //   });
  });

router.get("/save/:id", (req, res) =>{
    console.log(req.params.id);
    db.Article
    .findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } }, { new: true })
    res.send("Saved")
});


// router.post("/articles/:id", function(req, res) {
//     db.Article.findOneAndUpdate({ _id: req.params.id })
//     .then(function(results) {
//         console.log(results);
//     })
//     .catch((err) => console.log(err));
//     res.json(results);
// });






router.get("/scrape", (req, res) => {
    axios.get("https://www.sandiegouniontribune.com/latest").then((response) => {
        const $ = cheerio.load(response.data);

        $("div.PromoMedium-content").each(function (i, element) {
            const result = {};

            result.title = $(this)
                .find("div.PromoMedium-title").children("a").text();

            result.link = $(this)
                .find("div.PromoMedium-title").children("a").attr("href");

            db.Article.create(result)
            .then((dbArticle) => {
                console.log(dbArticle);
            })
            .catch((err) => {
                console.log(err);
                // return res.redirect("/articles")
            });
         
        })
        res.redirect("/articles");
    })
})

router.get("/cleararticles", (req, res) => {
    db.Article.remove({}, function(data){
        console.log(data);
        return res.redirect("/articles");
    }).catch(function(err) {
        console.log(err);
        res.json({error: err.message});
    })
});

// router.get("/articles/:id") {
//     db.Article.findOne({ _id: req.params.id })
// }

module.exports = router;

