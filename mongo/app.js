const mongoose = require("mongoose");

const articleModel = require("./article");

mongoose.connect("mongodb://localhost:27017/helloMongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// no cmd as collections sempre estará em plural
const Article = mongoose.model("article", articleModel);

/*

// atribuindo dados ao model, no mongo não é necessario preencher todos as colunas

const article = new Article({
  title: "Artigo123",
  author: "AH",
  body: "Exemplo",
}); */
/*

// Criando dados

article.save().then((res) => {
    console.log(res);
    console.log("Artigo Salvo!")
}).catch((err) => {
    console.log(err);
});

*/

Article.find({

}).then((articles) => {
    console.log(articles)
}).catch(err => {
    console.log(err);
})

/* Article.find({
  //   '_id': "601de2d216fcda0f84749692",
  // 'title': 'Artigo',
  "resume.content": "",
})
  .then((article) => {
    console.log(article);
  })
  .catch((err) => {
    console.log(err);
  });

Article.findOne({
  title: "Artigo2",
})
  .then((article) => {
    console.log(article);
  })
  .catch((err) => {
    console.log(err);
  });
 */

/* Article.findByIdAndDelete("601de2d216fcda0f84749692")
  .then((article) => {
    console.log(article);
  })
  .catch((err) => {
    console.log(err);
  }); */
/* 
Article.findByIdAndUpdate("601de21862695d2500e7864f", {
  title: "Recomeçando",
  author: "Ator",
  body: "Novo Texto",
})
  .then((article) => {
    console.log("Atualizado");
  })
  .catch((err) => {
    console.log(err);
  });
 */