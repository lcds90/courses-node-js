// api de games

const EXPRESS = require("express");
const APP = EXPRESS();
const BP = require("body-parser");
const CORS = require("cors");
const JWT = require("jsonwebtoken");

// chave para acesso de api
const jwtSecret = "senha_super_forte";

APP.use(CORS());
APP.use(BP.urlencoded({ extended: false }));
APP.use(BP.json());

// middleware é executada antes de alguma função ser executada, ficando entre a rota e a req do usuario
function auth(req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    let token = authToken.split(" ")[1];
    console.log(token)
    JWT.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido" });
      } else {

        // as variaveis de requisição podem ser utilizadas dentro da rota desde que utilizem o midleware
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        console.log(data);
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "Token inválido" });
  }
}

// após o termino do modulo converter com utilização do sequelize
var db = {
  users: [
    {
      id: 1,
      name: "user",
      email: "user@example.com",
      password: "password",
    },
    {
      id: 2,
      name: "admin",
      email: "admin@example.com",
      password: "hard_password",
    },
  ],
  games: [
    {
      id: 1,
      title: "Portal 2",
      year: 2012,
      price: 60,
    },
    {
      id: 2,
      title: "Overwatch",
      year: 2016,
      price: 90,
    },
    {
      id: 3,
      title: "Paladins",
      year: 2010,
      price: 0,
    },
    {
      id: 4,
      title: "Left 4 Dead 2",
      year: 2008,
      price: 20,
    },
  ],
};

APP.get("/games", auth, (req, res) => {
  res.statusCode = 200;
  res.json(db.games);
});

APP.get("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let game = db.games.find((g) => g.id == id);
    if (game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

APP.post("/game", auth, (req, res) => {
  let { title, year, price } = req.body;

  let v_title = title == null || title == "";
  let v_year = year == null || isNaN(year);
  let v_price = price == null || isNaN(price);

  if (v_title && v_year && v_price) {
    res.sendStatus(400);
  } else {
    db.games.push({
      id: 5,
      title,
      price,
      year,
    });
    res.sendStatus(201);
  }
});

APP.put("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let game = db.games.find((g) => g.id == id);
    if (game != undefined) {
      let { title, year, price } = req.body;
      if (title != undefined) {
        game.title = title;
      }
      if (year != undefined) {
        if (isNaN(year)) {
          res.sendStatus(400);
        } else {
          game.year = year;
        }
      }
      if (price != undefined) {
        if (isNaN(price)) {
          res.sendStatus(400);
        } else {
          game.price = price;
        }
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

APP.delete("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let index = db.games.findIndex((g) => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      db.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

APP.post("/auth", (req, res) => {
  let { email, password } = req.body;
  if (email !== undefined) {
    let user = db.users.find((u) => u.email == email);
    if (user != undefined) {
      if (user.password == password) {
        // salvando informações para carregar no token
        JWT.sign(
          {
            id: user.id,
            email: user.email,
          },
          jwtSecret,
          { expiresIn: "48h" },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
      } else {
        res.status(401);
        res.json({ err: "Credenciais inválidas" });
      }
    } else {
      res.status(404);
      res.json({ err: "E-mail não encontrado" });
    }
  } else {
    res.status(400);
    res.json({ err: "E-mail inválido" });
  }
});
APP.listen(9090, () => {
  console.log("Api rodando!");
});
