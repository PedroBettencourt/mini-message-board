const express = require('express');

const index = express.Router();

index.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

module.exports = index;