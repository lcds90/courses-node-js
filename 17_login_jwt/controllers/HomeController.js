class HomeController {
  async index(req, res) {
    res.send("API de Usuários");
  }

  async validate(req, res) {
    res.status(200);
    res.send("Validado pelo middleware");
  }
}

module.exports = new HomeController();
