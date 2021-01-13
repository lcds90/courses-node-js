// converter para async-await

const DB = require("./database");

/* bloco sobre insert

{
  const DADOS = [
    { name: "Portal 2", preco: 25.5 },
    { name: "GTA V", preco: 125.5 },
    { name: "Paladins", preco: 0.0 },
    { name: "Red Dead", preco: 250.5 },
  ];

  // sempre retorna uma promise
  let query = DB.insert(DADOS).into("games");
  console.log(query.toQuery());

   query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
} */

/* bloco sobre select
{
  let query = DB.select().table("games");
  console.log(query.toQuery());

  query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // nested queries
  DB.insert({ name: "Mists of Noyah", preco: 25 })
    .into("games")
    .then((data) => {
        // queries podem ser executadas como fila
      DB.select(["name"])
        .table("games")
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
} */

// bloco sobre where
/* {
  let query = DB.where({ name: "Portal" }).table("games");
  console.log(query.toQuery());

  let query2 = DB.select(["id", "preco"])
    .where({ name: "Portal" })
    .table("games");
  console.log(query2.toQuery());

  let query3 = DB.select(["id", "preco"])
    .where({ name: "Portal" })
    .orWhere({ id: 2 })
    .table("games");
  console.log(query3.toQuery());

  let query4 = DB.select(["id", "preco"])
    .where({ name: "Portal" })
    .whereRaw("preco > 5")
    .table("games");
  console.log(query4.toQuery());

  // por questões de lógicas sobre a query, utilizar somente um where

  let query5 = DB.select(["id", "preco"])
    .whereRaw(" name = 'Portal' OR preco > 5")
    .table("games");
  console.log(query5.toQuery());

  query5
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // caso o knex não ofereça flexibilidade, pode optar pelo código puro do banco
    DB.raw("SELECT * FROM games").then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
} */

// bloco sobre delete
/* {
    let query = DB.where({ id: 3 }).delete().table("games");
    console.log(query.toQuery());
  query
    .then((data) => {
      console.log(data);
    }).catch(err => {
        console.log(err)
    });
} */

// bloco sobre update
/* {
  let query = DB.where({ id: 6 }).update({ preco: 150 });
  console.log(query.toQuery());

  query.then(data => {
      console.log(data)
  }).catch(err =>{
      console.log(err)
  });
} */

// bloco sobre order by
/* {
  let query = DB.select().table("games").orderBy("preco", "desc");
  console.log(query.toQuery());

  let query2 = DB.select().table("games").orderBy("name", "asc");
  console.log(query2.toQuery());

  query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  query2
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
} */

// bloco sobre relacionamentos
/* {
  // 1 para 1
  // 1 para M
  // M para M
  // importante sempre tabelas possuir id com mesmo tamanho // unsigned // foreign key

  /* Associated Insert 
  let query = DB.insert({
    name: "valve",
    game_id: 2,
  }).table("studios");
  console.log(query.toQuery());

  query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    }); */

// Join une tabelas em um resultado para economizar recurso do servidor

// 1 para 1
/* let query = DB.select(["games.*", "studios.name as est_name"]) // as para resolver conflito de campos
    .table("games")
    .innerJoin("studios", "studios.game_id", "games.id")
    .where("games.id", 2)

    console.log(query.toQuery());

  query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
    */

// 1 para M
/*   let query = DB.select(["games.*", "studios.name as st_name"])
    .table("games")
    .innerJoin("studios", "studios.game_id", "games.id")
    .then((data) => {
      let arrStudios = data;
      let game = {
        id: 0,
        name: "",
        studios: [],
      };
      game.id = data[0].id;
      game.name = data[0].name;

      data.forEach((studio) => {
        game.studios.push({ nome: studio.st_name });
      });
      console.log(game);
    })
    .catch((err) => {
      console.log(err);
    }); */

// M para M
/*  let query = DB.select([
    "games.name as game_nome",
    "studios.name as studio_nome",
  ])
    .table("games_studios")
    .innerJoin("games", "games.id", "games_studios.game_id")
    .innerJoin("studios", "studios.id", "games_studios.studio_id")
    .where("games.id", 2);

  console.log(query.toQuery());
  query
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
} */

// bloco sobre transactions

// para sistema intolerante a erros, protegendo o banco e informando sobre o problema
{
  async function testeTransacao() {
    try {
      await DB.transaction(async (trans) => {
        await DB.insert({
          name: 'novoStudio',
        }).table("studios")
        
        await DB.insert({
          name: 'newStudio',
        }).table("studios")
        
        await DB.insert({
          name: 'novoEstudio',
        }).table("studios")

      });
    } catch (error) {
      console.log(error);
    }
  }
  testeTransacao()
}
