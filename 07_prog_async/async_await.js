// mais utilizado quando necessário receber dados assincronos

async function pegarId() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, 1500);
  });
}

async function buscarEmailNoBanco(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("lcds90@gmail.com");
    }, 2000);
  });
}

function enviarEmail(corpo, para) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var deuErro = true;
      if (!deuErro) {
        console.log("Email enviado");
        // resolve e reject só aceitam 1 parametro
        resolve({
          time: 6,
          to: "leonardo@gmail.com",
        });
      } else {
        //sempre que a promise é rejeitada, necessita trata-la (catch)
        reject("Fila cheia");
      }
    }, 4000);
  });
}

function listarUsuarios() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "Leonardo", lang: "JS" },
        { name: "Lucas", lang: "Phyton" },
      ]);
    }, 3000);
  });
}

// quando possue async na função, consegue utilizar o await
async function principal() {
  /* // aguardar promise ser concluida para retornar resultado em variavel
var usuarios = await listarUsuarios()
console.log(usuarios);
// o olá só exibido apos a função ser concluida
console.log("Olá...") */
  /* 
  // desafio #02
  var id = await pegarId();
  var email = await buscarEmailNoBanco(id);
  enviarEmail("Olá, como está", email)
    .then(() => {
      console.log("Email enviado, para o usuário com id: " + id);
    })
    .catch((error) => {
      console.log(error);
    }); */

  var id = await pegarId();
  var email = await buscarEmailNoBanco(id);

  // try - catch é tratamento de exceções
  try {
    await enviarEmail("Olá, como está", email);
    console.log("Email enviado!");
  } catch (erro) {
    console.log(erro);
  }
}

// o await é bloqueante, utilizar com cautela
principal();
