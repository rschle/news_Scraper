const db = require("../models")
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
var router = express.Router();

router.get('/favicon.ico', function(req, res) {
    res.status(204)
});

router.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(results) {
        if (results.length > 0) {
            res.render("index", {articles: results});
        } else {
            res.render("index");
        }
    }).catch(function(err) {
        console.log(err);
    })
})


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
                return res.redirect("/articles")
            });


            alert("Scrape Complete!");
            // res.redirect("/")
        })

    })
})

router.get("/cleararticles", (req, res) => {
    db.Article.remove({}, function(data){
        console.log(data);
        res.redirect("/articles");
    }).catch(function(err) {
        console.log(err);
        res.json({error: err.message});
    })
});

module.exports = router;

