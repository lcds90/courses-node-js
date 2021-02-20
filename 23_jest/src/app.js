let express = require("express")
let app = express()

app.get("/", (req, res) => {
    res.json({success: true})
})

app.get("/cor/:nome", (req, res)=> {
    let nome = req.params.nome;

    if(nome == "vermelho"){
        res.json({cor: "vermelho"})
    }
})

module.exports = app

/* module.exports = {
    soma: (a, b)=>{
        return a + b;
    },
    mult: (a, b)=>{
        return a * b;
    }
} */