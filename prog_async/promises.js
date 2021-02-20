function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1500)
    })
}

function buscarEmailNoBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("lcds90@gmail.com")
        }, 2000)
    })
}

function enviarEmail(corpo, para) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var deuErro = false;
      if (!deuErro) {
        console.log("Email enviado");
        // resolve e reject só aceitam 1 parametro
        resolve({
            time: 6,
            to: "leonardo@gmail.com"
        });
      } else {
          //sempre que a promise é rejeitada, necessita trata-la (catch)
        reject("Fila cheia");
      }
    }, 4000);
  });
}

// utilizando operador destructing
/* enviarEmail("Olá mundo", "pessoa@serv.com").then(({time, to}) =>{
    
    console.log(`
Time: ${time}
-------------------
To: ${to}
`)
    console.log("Conseguiu fazer o prometido")
}).catch((erro) =>{
    console.log("Que pena, não deu certo = " + erro)
}) */


// promisses aninhadas
pegarId().then((id) => {

    // evite utilizar, conhecido como promisse hell
    buscarEmailNoBanco(id).then((email) => {
        enviarEmail("Olá, como está", email).then(()=> {
            console.log("Email enviado, para o usuário com id: " + id)
        }).catch(error => {
            console.log(error)
        })
    })
})
