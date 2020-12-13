const EXPRESS = require("express")
const APP = EXPRESS()

// Definir lib  para gerar HTML
APP.set("view engine", "ejs")

APP.get("/:nome/:lang", function(req, res){
    var nome = req.params.nome
    var lang = req.params.lang
    var exibirMsg = false

    var produtos = [
        {
            nome: "Doritos",
            preco: 3.15,
        },
        {
            nome: "Coca",
            preco: 5.15,
        },
        {
            nome: "Leite",
            preco: 2.50,
        },
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        profissao: "Programador",
        msg: exibirMsg,
        produtos: produtos
    })
})

APP.listen(8080, ()=>{
    console.log("App rodando em http://localhost:8080")
})