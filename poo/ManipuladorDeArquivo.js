// composicao é construir uma classe com outras classes
// reutilização de código

class Leitor {
  Ler(caminho) {
    return "Contéudo do arquivo!";
  }
}

class Escritor {
  Escrever(arquivo, conteudo) {
    console.log(`Contéudo = ${conteudo} escrito no arquivo = ${arquivo}`);
  }
}

class Criador {
  Criar(nome) {
    console.log("Arquivo criado!");
  }
}

class CriadorPdf {
    Criar(nome){
        console.log("Criador de arquivo PDF")
    }
}

class Destruidor {
  Deletar(nome) {
    console.log("Deletando arquivo!");
  }
}

class ManipuladorDeArquivo {
  constructor(nome) {
    this.arquivo = nome;
    this.leitor = new Leitor();
    this.escritor = new Escritor();
    this.criador = new Criador();
    this.destruidor = new Destruidor();
  }

  /*  LerArquivo() {
    console.log("Lendo...");
  }

  EscreverArquivo(dados) {
    console.log("Escrevendo dados...");
  }

  CriarArquivo(nome) {
    console.log("Criando arquivo: " + nome);
  }

  DeletarArquivo(nome) {
    console.log("Deletando arquivo: " + nome);
  } */
}

class GerenciadorDeUsuarios {
  constructor() {
    this.criador = new CriadorPdf();
    this.escritor = new Escritor();
  }

  SalvarListaDeUsuarios(lista) {
    this.criador.Criar("usuarios.txt");
    this.escritor.Escrever("usuarios.txt", lista);
  }
}

var manipulador = new ManipuladorDeArquivo("arquivo.txt");
manipulador.leitor.Ler();
manipulador.escritor.Escrever();
manipulador.criador.Criar();
manipulador.destruidor.Deletar();

var usuarios = new GerenciadorDeUsuarios();
usuarios.SalvarListaDeUsuarios(["leonardo", "okay"])