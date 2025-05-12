const express = require('express');
const path = require('path');
const db = require('./db/queries');
const { text } = require('stream/consumers');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// INDEX
const index = express.Router();

index.get("/", async(req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.render("index", { title: "Mini Messageboard", messages: messages });
});


// NEW
const newform = express.Router();

newform.get("/", (req, res) => {
    res.render("form");
});

newform.use(express.urlencoded({ extended: true }));
newform.post("/", async(req, res) => {
    const { text, username } = {text: req.body.message, username: req.body.username};
    await db.insertMessage(text, username);
    res.redirect("/");
});


// DIRECT ROUTERS
app.use("/", index);
app.use("/new", newform);


// PAGE
app.get("/:id", async(req, res) => {
    const id = req.params.id;
    const message = await db.getMessage(id);
    console.log(message);
    res.render("message", {message: message})
})


app.listen(3000);