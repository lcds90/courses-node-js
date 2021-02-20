{
    let nome = "Leonardo"
    let sobre = "Atualmente evoluindo ao fullstack!"

    var frase = "Olá meu nome é " + nome + " e " + sobre;
    console.log(frase);

    var frase2 = `Olá meu nome é ${nome} e ${sobre}`;
    console.log(frase2);

    var frase3 = `Olá meu nome é
${nome}
e ${sobre}`;
    console.log(frase3);
}