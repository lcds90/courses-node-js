var jwt = require("jsonwebtoken");

var secret = "superultrasecretpassword";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    try {
      var decoded = jwt.verify(token, secret);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("Voce não tem privilegios para esta ação");
        return;
      }
    } catch (error) {
      res.status(403);
      res.send("Voce não está autenticado");
      return;
    }
  } else {
    res.status(403);
    res.send("Voce não está autenticado");
    return;
  }
};
