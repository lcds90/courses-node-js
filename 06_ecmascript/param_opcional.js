{
  // valores definidos explicitamentes não tem a obrigatoriedade de ser declarado o valor na função
  function soma(a = 80, b = 50) {
    console.log(a + b);
  }
  // parametros opcionais sempre devem ser definidas no final da função
  function sub(a, b, inverter = false) {
    if (inverter) {
      console.log(b - a);
    } else {
      console.log(a - b);
    }
  }
}
