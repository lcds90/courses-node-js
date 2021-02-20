{
  function soma2(a, b) {
    return a + b;
  }

  let mult2 = function (a, b) {
    return a * b;
  };

  // forma reduzida return
  let mult3 = (a, b, c) => a * b * c;

  // função reduzida, sem () se somente 1 param, e somente 1 linha sem {}
  let dobro = (a) => console.log(a * 2);

  let resultado = mult2(2, 2);
}
