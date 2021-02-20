{
  let nome = "Lenardo Santos";
  let idade = 23;
  let cargo = "Programador";

  /*   let user = {
    nome: nome,
    idade: idade,
    cargo: cargo,
    empresa: empresa.nome,
    cidade: empresa.cidade
  }; */

  /*
  criando o json variaveis pode declarar o nome da variavel diferente
  operador spread ... copia e cole valor de variavel diretamente   
  */
  let empresa_nome = "Empresa";
  let empresa_cidade = "SP";

  let e = {
    empresa_nome,
    empresa_cidade,
  };

  let user = {
    nome,
    idade,
    cargo,
    ...e.empresa_nome,
    ...e.empresa_cidade,
  };

  console.log(user);
}
