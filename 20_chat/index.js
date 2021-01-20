const { Socket } = require("dgram");
const EXPRESS = require("express");
const APP = EXPRESS();
const HTTP = require("http").createServer(APP);
const IO = require("socket.io")(HTTP);

APP.set("view engine", "ejs");
APP.use(EXPRESS.static("assets"));

APP.get("/", (req, res) => {
  res.render("index");
});

// instancia do cliente na conexão
IO.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("X desconectou: " + socket.id);
  });

  socket.on("msg", (data) => {
    
    // broadcast é enviado a todos, menos para quem o disparou
    // socket.broadcast.emit("showmsg", data);
    // io é o servidor, e socket o cliente
    IO.emit("showmsg", data);
  });

  socket.on("showmsg", (data) => {
      console.log(data);
  })
});

HTTP.listen(8000, () => {
  console.log("App rodando em http://localhost:8000");
});
