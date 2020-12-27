/*
Sistema de Cassino
O dado retorna um número aleatório após jogar-lo 
Tendo varios tipos de dados
*/

class Dado {
    
  constructor(faces) {
    this.faces = faces;
  }

  JogarDado() {
    let min = Math.ceil(1);
    let max = Math.floor(this.faces);
    let valor = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`O resultado do dado é ${valor}, entre ${min} á ${max} faces`);
  }
}

var dado1 = new Dado(10);
var dado2 = new Dado(25);
var dado3 = new Dado(50);
var dado4 = new Dado(100);

dado1.JogarDado()
dado2.JogarDado()
dado3.JogarDado()
dado4.JogarDado()
