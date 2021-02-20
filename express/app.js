const EXPRESS = require("express") // Importação
const APP = EXPRESS() // Inicializando

// Rotas
// REQ -> DADOS ENVIADOS PELO USUARIO
// RES -> RESPOSTA ENVIADA PARA USUARIO
APP.get("/", function(req, res){

    // Não é possível rota não ter resposta para devolver ao cliente
    // Resposta depois de enviada, fecha a conexão não sendo possivel ter duas respostas na mesma rota
    res.send("Entrou no site")
})

// Parametros não obrigatorios
APP.get("/blog/:musica?", function(req, res){
    var music = req.params.musica
    if(music){
        res.send("<h1>Minha musica eh</h1>" + music)
    } else {
        res.send("<h1>Nao tenho musica</h1>")
    }
    
})

// Parametros obrigatorios
APP.get("/ola/:nome/:empresa", function(req, res){
    var nome = req.params.nome
    var emp = req.params.empresa
    res.send("<h1>Olá "+nome+"</h1>da empresa "+ emp)
})


// Query params são dinamicos e opcionais porém fornecem menos segurança na aplicação
APP.get("/canal", function(req,res){
    var nomecanal = req.query["canal"]
    if (nomecanal){
        res.send("<h1>Canal do youtube:</h1> "+ nomecanal)
    } else {
        res.send("<h1>Nenhum canal fornecido</h1>")
    }
    
})

// Inicilização do servidor
APP.listen(4000,function(error){
    if(error){
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado em http://localhost:4000")
    }
})
