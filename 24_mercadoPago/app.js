const EXPRESS = require("express");
const MP = require("mercadopago");
const APP = EXPRESS();

MP.configure({
  sandbox: true, // false somente se app estiver em produção
  access_token:
    "TEST-8096602966219800-021205-f9a396839867d3a9d0611919a824773c-110215432",
});

APP.get("/", (req, res) => {
  res.send("Hello mercado pago!<hr><a href='/pagar'>Pagar</a>");
});

APP.get("/pagar", async (req, res) => {
  // let desc =
  // let preco = banco.buscar();
  // exemplo de tb
  // Pagamentos
  // id | codigo | idUsuario | pagador | status
  // 1  | 421428194 | idUsuario | email | 0(false) // não pago

  // fator importante para determinar cada venda, UUID && Data e estar salvo
  let id = "" + Date.now();
  let title = "5x produto; 1x exemplo; 2x teste"; // req.body.desc
  let email = "teste@teste.com"
  let currency_id = "BRL";
  let unit_price = parseFloat(150); // obrigatorio ser float

  let data = {
    items: [
      (item = {
        id,
        title,
        quantity: 1,
        currency_id,
        unit_price,
      }),
    ],
    payer: {
      email,
    },
    external_reference: id,
  };

  try {
    let pagamento = await MP.preferences.create(data);
    console.log(pagamento);
    // banco.salvarPagamento({id, email})
    return res.redirect(pagamento.body.init_point);
  } catch (error) {
    return res.send(error.message)
  }
});

APP.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Servidor rodando em http://localhost:4000");
});
