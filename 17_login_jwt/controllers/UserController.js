var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "superultrasecretpassword";

class UserController {
  async index(req, res) {
    var users = await User.findAll();
    res.json(users);
  }

  async create(req, res) {
    var { email, name, password } = req.body;

    // return serve para terminar função após falha
    if (email == undefined) {
      res.status(400);
      res.json({ err: "Email inválido" });
      return;
    }
    if (name == undefined) {
      res.status(400);
      res.json({ err: "Nome inválido" });
      return;
    }
    if (password == undefined) {
      res.status(400);
      res.json({ err: "Senha inválida" });
      return;
    }

    var emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406);
      res.json({ err: "Email já cadastrado" });
      return;
    }
    await User.new(email, name, password);

    res.status(200);
    res.send(`Usuário com email ${email} foi cadastrado`);
  }

  async findUser(req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    if (user == undefined) {
      res.status(404);
      res.json({});
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async edit(req, res) {
    var { id, name, email, role } = req.body;
    var result = await User.update(id, email, name, role);
    if (result != undefined) {
      if (result.status) {
        res.status(200);
        res.send(`Usuario ${name} editado`);
      } else {
        res.status(406);
        res.json(result.err);
      }
    } else {
      res.status(406);
      res.json("Erro de servidor!");
    }
  }

  async remove(req, res) {
    var id = req.params.id;
    var result = await User.delete(id);

    if (result.status) {
      res.status(200);
      res.send(`Usuário com id: ${id} deletado`);
    } else {
      res.status(406);
      res.json(result.err);
    }
  }

  async recoverPassword(req, res) {
    var email = req.body.email;
    var result = await PasswordToken.create(email);
    if (result.status) {
      // NodeMailer.Send();
      res.status(200);
      res.send("" + result.token);
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

  async changePassword(req, res) {
    var token = req.body.token;
    var password = req.body.password;

    var isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.updatePassword(
        password,
        isTokenValid.token.user_id,
        isTokenValid.token.token
      );
      res.status(200);
      res.send("Senha alterada");
    } else {
      res.status(406);
      res.send("Token invalido");
    }
  }

  async login(req, res) {
    var { email, password } = req.body;
    var user = await User.findByEmail(email);

    if (user != undefined) {
      var isLoginValid = await bcrypt.compare(password, user.password);
      if (isLoginValid) {
        var token = jwt.sign({ email: user.email, role: user.role }, secret);
        res.status(200);
        res.json({ token: token });
      } else {
        res.status(406);
        res.send("Dados incorretos");
      }
    } else {
      res.json({ status: false });
    }
  }
}

module.exports = new UserController();
