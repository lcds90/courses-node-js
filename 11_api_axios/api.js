function createGame() {
  var i_title = document.getElementById("title");
  var i_year = document.getElementById("year");
  var i_price = document.getElementById("price");

  var game = {
    title: i_title.value,
    year: i_year.value,
    price: i_price.value,
  };
  axios
    .post("http://localhost:9090/game", game)
    .then((response) => {
      if (response.status == 201) {
        alert("Game Cadastrado!");
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}

function deleteGame(listItem) {
    console.log(listItem)
}

axios
  .get("http://localhost:9090/games")
  .then((res) => {
    let games = res.data;
    var list = document.getElementById("list");
    games.forEach((game) => {
      let item = document.createElement("tr");

      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-year", game.year);
      item.setAttribute("data-price", game.price);

      let item_id = document.createElement("td");
      let item_title = document.createElement("td");
      let item_year = document.createElement("td");
      let item_price = document.createElement("td");
      let deleteBtn = document.createElement("button");

      item_id.innerHTML = game.id;
      item_title.innerHTML = game.title;
      item_year.innerHTML = game.year;
      item_price.innerHTML = game.price;
      deleteBtn.innerHTML = "Deletar";
      deleteBtn.classList.add("uk-button");
      deleteBtn.classList.add("uk-button-danger");
      deleteBtn.addEventListener("click", function(){
        deleteGame(item)
      })

      item.appendChild(item_title);
      item.appendChild(item_year);
      item.appendChild(item_price);
      item.appendChild(deleteBtn);

      list.appendChild(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });
