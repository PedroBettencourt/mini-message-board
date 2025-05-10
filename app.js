const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const cypto = require('crypto');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const messages = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: crypto.randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// INDEX
const index = express.Router();

index.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});


// NEW
const newform = express.Router();

newform.get("/", (req, res) => {
    res.render("form");
});

newform.use(express.urlencoded({ extended: true }));
newform.post("/", (req, res) => {
    const message = {id: crypto.randomUUID(), text: req.body.message, user: req.body.name, added: new Date()};
    messages.push(message);
    res.redirect("/");
});


// DIRECT ROUTERS
app.use("/", index);
app.use("/new", newform);


// PAGE
app.get("/:id", (req, res) => {
    const id = req.params.id;
    const message = messages.find(item => item.id === id);
    res.render("message", {message: message})
})


app.listen(3000);