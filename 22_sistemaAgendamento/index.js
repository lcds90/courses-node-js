const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// ====================================================

/* Live Reload Config */
const path = require("path");
const publicDirectory = path.join(__dirname, "public");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const liveReloadServer = livereload.createServer();

// ----------------------------------------------------

liveReloadServer.watch(publicDirectory);
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLivereload());

// ====================================================

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine','pug');

mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res) => {
    res.send("Oi!");
});

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080")
});