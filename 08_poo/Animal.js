// o intuito é reutilizar código, porém é mais optavel seguir pela composição para isso
// heança é uma forma mais simplória e limitada

class Animal {
  constructor(nome, idade, tipo) {
    this.nome = nome;
    this.idade = idade;
    this.tipo = tipo;
  }

  ChecarFicha() {
    console.log("Nome: " + this.nome);
    console.log("Idade: " + this.idade);
    console.log("Tipo: " + this.tipo);
  }

  MetodoMae() {
    console.log("Esse método faz parte da superclasse");
  }
}

class Cachorro extends Animal {
  constructor(nome, idade, tipo, raca) {
    // reutilização de atributos da superclasse
    super(nome, idade, tipo);
    this.raca = raca;
  }

  Latir() {
    console.log("Latindo... ROLF ROLF");
  }

  ChecarFicha() {
    console.log("Ficha do cachorro");
    super.ChecarFicha();
    console.log("Raça: " + this.raca);
  }

  MetodoFilho() {
    //super = faz referencia a superclasse, pegando o comportamento da classe
    super.MetodoMae();
    console.log("Aqui vem a funcionalidade!");
  }
}

var dog = new Cachorro("Cachorro", 2, "Canino", "Pug");

dog.ChecarFicha();
dog.Latir();
dog.MetodoFilho();

/*

Herança em multi niveis não é recomendado pois estará cheio de hieraquias podendo causar confusão no código

class PastorAlemao extends Cachorro {}
class PastorAlemaoMacho extends PastorAlemao {}

Recomendavel somente classe mães e filhas, não avós
Isso gera problema de arquitetura

*/
