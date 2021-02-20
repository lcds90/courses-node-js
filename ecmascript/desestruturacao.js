{
    let user = {
        nome: "Leonardo",
        cargo: "Programador",
        curso: "TADS"
    }


    /*
    var nome = user.nome;
    var cargo = user.cargo;
    var curso = user.curso
    */

    // operador destructuring
    var { nome,cargo,curso } = user;

    console.log(nome)
    console.log(cargo)
    console.log(curso)
}