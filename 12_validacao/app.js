const EXPRESS = require("express");
const APP = EXPRESS();
const BP = require("body-parser");
const SESSION = require("express-session");
const FLASH = require("express-flash");

APP.set("view engine", "ejs");
APP.use(BP.urlencoded({ extended: false }));
APP.use(BP.json());
APP.use(SESSION({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
APP.use(FLASH());

APP.get("/", (req, res) => {
    console.log("Rodando...")
    res.render("index")
})

APP.listen(8080, (req, res) => {
    console.log("Servidor rodando em http://localhost:8080")
})