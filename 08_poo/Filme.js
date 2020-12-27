class Filme {
  constructor(titulo, ano, genero, diretor, duracao, atores) {
    // criação de atributos
    this.titulo = titulo;
    this.ano = ano;
    this.genero = genero;
    this.diretor = diretor;
    this.atores = atores;
    this.duracao = duracao;
  }

  Reproduzir() {
    console.log("Reproduzindo => " + this.titulo);
  }

  Pausar() {
    console.log("Pausando || " + this.titulo);
  }

  Avancar() {
    console.log("Avançando >> " + this.titulo);
  }

  Fechar() {
    console.log("Fechando X " + this.titulo);
  }

  Ficha(){
    console.log("Título do filme: " + this.titulo);
    console.log("Ano de lançamento: " + this.ano);
    console.log("Gênero: " + this.genero);
    console.log("Diretor: " + this.diretor);
    console.log("Atores: " + this.atores);
    console.log("Duração: " + this.duracao);
    this.Reproduzir();
  }

}

// instanciando classe na memoria
var midsommar = new Filme("Midsommar", 2020, "Terror", "Diretor", "2h30min", ["Ator 1", "Ator 2", "Ator 3"]);

midsommar.Ficha();
midsommar.Fechar();

/* var hulk = new Filme();
var starWars = new Filme(); */

/* 
hulk.Pausar();
starWars.Avancar();

midsommar.titulo = "Midsommar";
midsommar.ano = 2020;
midsommar.genero = "Terror";
midsommar.diretor = "Diretor";
midsommar.atores = ["Ator 1", "Ator 2", "Ator 3"];
midsommar.duracao = 2; */