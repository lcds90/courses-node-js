/* function enviarEmail(corpo, para, callback) {
  setTimeout(() => {
    console.log(`
Para: ${para}
-----------------------------
${corpo}
______________________
Leonardo Santos
`);
    callback("OK", 5, "8s");
  }, 8000);
}
console.log("Inicio de envio de e-mail");
enviarEmail("teste", "lcds90@gmail.com", (status, amount, time) => {
  console.log(`
Status: ${status}
-----------------------------
Contatos: ${amount}
-----------------------------
Tempo: ${status}
_________________
    `);
}); */

function enviarEmailcomTratamento(corpo, para, callback) {
  setTimeout(() => {
    var deuErro = false;

    if (deuErro) {
      callback(12, "O envio do e-mail falhou!");
    } else {
      callback(12);
    }
  }, 2000);
}
console.log("Inicio de envio de e-mail");
enviarEmailcomTratamento("teste", "lcds90@gmail.com", (time, erro) => {
  if (erro == undefined) {
    // sem erro
    console.log("Tudo okay!");
    console.log(`Tempo de envio: ${time}`);
  } else {
    // deu erro
    console.log("Ocorreu um erro: " + erro);
  }
});
