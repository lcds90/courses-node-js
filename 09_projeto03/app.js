const FS = require("fs"); // lib File-System para manipulação de arquivos

 // leitor
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
FS.writeFile("./exemplo.txt", "Novo contéudo de arquivo", (err) => {
    if(err){
        console.log("Ocorreu algum erro!")
    }
})
