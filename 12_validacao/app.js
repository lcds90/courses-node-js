const EXPRESS = require("express");
const APP = EXPRESS();
const BP = require("body-parser");
const CP = require("cookie-parser");
const SESSION = require("express-session");
const FLASH = require("express-flash");

APP.set("view engine", "ejs");
APP.use(BP.urlencoded({ extended: false }));
APP.use(BP.json());
APP.use(CP("cookie"));
APP.use(
  SESSION({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
APP.use(FLASH());

APP.get("/", (req, res) => {
  let emailError = req.flash("emailError");
  let nomeError = req.flash("nomeError");
  let pontosError = req.flash("pontosError");

  let email = req.flash("email");
  let nome = req.flash("nome");
  let pontos = req.flash("pontos");

  emailError =
    emailError == undefined || emailError.length == 0 ? undefined : emailError;
  nomeError =
    nomeError == undefined || nomeError.length == 0 ? undefined : nomeError;
  pontosError =
    pontosError == undefined || pontosError.length == 0
      ? undefined
      : pontosError;
  email = email == undefined || email.length == 0 ? "" : email;
  nome = nome == undefined || nome.length == 0 ? "" : nome;
  pontos = pontos == undefined || pontos.length == 0 ? "" : pontos;

  res.render("index", {
    emailError,
    nomeError,
    pontosError,
    nome,
    email,
    pontos,
  });
});

APP.post("/form", (req, res) => {
  let { email, nome, pontos } = req.body;
  let emailError, nomeError, pontosError;

  if (email == undefined || email == "") {
    emailError = "O email não pode ficar vazio";
  }
  if (nome == undefined || nome == "") {
    nomeError = "O nome não pode ficar vazio";
  }
  if (pontos == undefined || pontos == "" || pontos < 20) {
    pontosError = "Os pontos não podem ser menos que 20 ou vazios";
  }

  if (
    emailError != undefined ||
    nomeError != undefined ||
    pontosError != undefined
  ) {
    req.flash("emailError", emailError);
    req.flash("nomeError", nomeError);
    req.flash("pontosError", pontosError);
    req.flash("email", email);
    req.flash("nome", nome);
    req.flash("pontos", pontos);
    res.redirect("/");
  } else {
    res.send("Tudo certo");
  }
});

APP.listen(8080, (req, res) => {
  console.log("Servidor rodando em http://localhost:8080");
});
