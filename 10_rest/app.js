// api de games
// após o termino do modulo converter com utilização do sequelize

const EXPRESS = require("express");
const APP = EXPRESS();
const BP = require("body-parser");
const CORS = require("cors");

APP.use(CORS());

APP.use(BP.urlencoded({ extended: false }));
APP.use(BP.json());

var db = {
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

APP.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(db.games);
});

APP.get("/game/:id", (req, res) => {
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

APP.post("/game", (req, res) => {
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

APP.put("/game/:id", (req, res) => {
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

APP.delete("/game/:id", (req, res) => {
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

APP.listen(9090, () => {
  console.log("Api rodando!");
});
