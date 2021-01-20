const { Socket } = require("dgram");
const EXPRESS = require("express");
const APP = EXPRESS();
const HTTP = require("http").createServer(APP);
const IO = require("socket.io")(HTTP);

APP.set("view engine", "ejs");

APP.get("/", (req, res) => {
  res.render("index");
});

// instancia do cliente na conexão
IO.on("connection", (socket) => {
  socket.on("acesso", (data) => {
    console.log("Executando evento de acesso!");
    console.log(data);
  });

  socket.on("palavra", (data) => {
    console.log(data);
    socket.emit("resposta", data + " - Emitido do back-end");
  });

  socket.on("disconnect", () => {
    console.log("X desconectou: " + socket.id);
  });
});

HTTP.listen(8000, () => {
  console.log("App rodando em http://localhost:8000");
});
