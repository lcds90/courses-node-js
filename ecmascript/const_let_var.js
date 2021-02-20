{
  // ES6
  // const é um valor guardado na memoria que não pode ser alterado no decorrer da aplicação
  const nome_principal = "leonardo";

  /*  let e var, a diferença está no escopo
    Escopo -> É o nível de acesso
    var -> Escopo: Global e Local
    let -> Escopo: Global, Local e de Bloco

    global = variavel acessivel fora das funções, acessivel em qualquer local do arquivo
    local = variavel acessivel somente na função
    bloco = variavel acessivel somente no bloco, {} */

  let nome = "leonardo"; // Global
  var sobrenome = "santos"; // Global

  console.log(nome);
  console.log(sobrenome);

  function func1() {
    var sobrenome2 = "conceição";
    console.log("oi " + nome + " " + sobrenome2);
  }
  function func2() {
    console.log("oi " + sobrenome);
    // console.log("oi " + sobrenome2) undefined
  }

  func1();
  func2();

  var a = 10;
  let testar = true;

  if (testar) {
    var b = 20;
    console.log(a + b);
  }

  console.log(a + b); // undefined

  let c = 15;

  if (testar) {
    let d = 40;
    console.log(c + d);
  }

  console.log(a + d); // undefined
}
