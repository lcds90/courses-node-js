// métodos estaticos para não ser necessario que criar o objeto e acessar diretamente da classe
class Calculadora {
 static Somar(a, b) {
    console.log(a + b);
  }

  static Sub(a, b) {
    console.log(a - b);
  }
}

Calculadora.Somar(2, 2);
Calculadora.Sub(2, 2);
