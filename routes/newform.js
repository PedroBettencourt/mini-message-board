const express = require('express');

const newform = express.Router();

newform.get("/", (req, res) => {
    res.render("form");
});

newform.use(express.urlencoded({ extended: true }));
newform.post("/", (req, res) => {
    const message = {text: req.body.message, user: req.body.name, added: new Date()};
    res.redirect("/");
})

module.exports = newform;