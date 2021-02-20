var http = require("http")


// recebe requisição de acesso ao servidor 8181 do usuario, e devolve como resposta html em pagina
http.createServer(function(req, res){
    res.end("<h1>Bem vindo ao site!</h1><br>Basico de HTTP, gerando resposta<br><h4>Curso de Node.js</h4>");
}).listen(8181)
console.log("Meu servidor está rodando")