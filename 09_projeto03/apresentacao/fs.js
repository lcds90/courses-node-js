const FS = require("fs"); // lib File-System para manipulação de arquivos
const SCANF = require("scanf");

/*  // leitor
FS.readFile("./exemplo.txt", {encoding: "utf-8"}, (error, data) => {
  if (error) {
    console.log("Ocorreu um erro durante a leitura do arquivo");
    console.log(error);
  } else {
    // ler o arquivo como conjunto de bytes para hexadecimal
    console.log(data);
  }
});
// escritor
console.log("Digite algo: \n")
var texto = SCANF("%s");
texto = "Texto de Exemplo"

FS.writeFile("./exemplo.txt", texto, (err) => {
    if(err){
        console.log("Ocorreu algum erro!")
    }
}) */


var texto_nome = SCANF("%s");
var texto_cargo = SCANF("%s");
var texto_idade = SCANF("%s");

modificarUsuario(texto_nome, texto_cargo, texto_idade)

function modificarUsuario(nome, cargo, idade) {
  FS.readFile("./exemplo.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log("Ocorreu algum erro!");
    } else {
      var conteudo = JSON.parse(data); // text para obj
      conteudo.nome = nome;
      conteudo.cargo = cargo;
      conteudo.idade = idade;
      console.log(conteudo);
      FS.writeFile("./exemplo.json", JSON.stringify(conteudo), (err) => {
        // obj para text
        if (err) {
          console.log("Erro durante a escrita!");
        }
      });
    }
  });
}