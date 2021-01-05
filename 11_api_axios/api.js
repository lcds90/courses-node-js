// configurar para manter a sessão

var axiosConfig = {
  headers: {
    Authorization:
      "Bearer " +
      localStorage.getItem("token")
    },
};

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  axios
    .post("http://localhost:9090/auth", {
      email,
      password,
    })
    .then((res) => {
      let token = res.data.token
      localStorage.setItem("token", token)
      Toast.fire({
        icon: "success",
        title: "Bem vindo!",
        html: `Seja bem vindo <b>${email.split("@")[0]}</b>`,
      });
      axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token");
      startApp()
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: "Credenciais invalidas!",
      });
    });
}

axios
  .get("http://localhost:9090/games", axiosConfig)
  .then((res) => {
    let games = res.data;
    let list = document.getElementById("list");
    games.forEach((game) => {
      let item = document.createElement("tr");

      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-year", game.year);
      item.setAttribute("data-price", game.price);

      let item_actions = document.createElement("td");
      let item_title = document.createElement("td");
      let item_year = document.createElement("td");
      let item_price = document.createElement("td");
      let deleteBtn = document.createElement("button");
      let editBtn = document.createElement("button");

      item_title.innerHTML = game.title;
      item_year.innerHTML = game.year;
      item_price.innerHTML = `R$ ${game.price},00`;

      deleteBtn.innerHTML = "Deletar";
      deleteBtn.classList.add("uk-button");
      deleteBtn.classList.add("uk-button-danger");
      deleteBtn.addEventListener("click", function () {
        deleteGame(item);
      });

      editBtn.innerHTML = "Editar";
      editBtn.classList.add("uk-button");
      editBtn.classList.add("uk-button-primary");
      editBtn.classList.add("uk-margin-right");
      editBtn.addEventListener("click", function () {
        loadFormGame(item);
      });

      item_actions.appendChild(editBtn);
      item_actions.appendChild(deleteBtn);

      item.appendChild(item_title);
      item.appendChild(item_year);
      item.appendChild(item_price);
      item.appendChild(item_actions);

      list.appendChild(item);
    });
  })
  .catch((err) => {
    console.log(err);
    
  });

function createGame() {
  let i_title = document.getElementById("title");
  let i_year = document.getElementById("year");
  let i_price = document.getElementById("price");

  let game = {
    title: i_title.value,
    year: i_year.value,
    price: i_price.value,
  };
  axios
    .post("http://localhost:9090/game", game, axiosConfig)
    .then((response) => {
      if (response.status == 201) {
        Toast.fire({
          icon: "success",
          title: "Game criado!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: "Houve algum erro!",
        input: err,
      });
    });
}

function deleteGame(listItem) {
  let id = listItem.getAttribute("data-id");
  axios
    .delete("http://localhost:9090/game/" + id, axiosConfig)
    .then((response) => {
      Toast.fire({
        icon: "warning",
        title: "Game deletado!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: "Houve algum erro!",
        input: err,
      });
    });
}

function loadFormGame(listItem) {
  let id = listItem.getAttribute("data-id");
  let title = listItem.getAttribute("data-title");
  let year = listItem.getAttribute("data-year");
  let price = listItem.getAttribute("data-price");
  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}

function updateGame() {
  let i_id = document.getElementById("idEdit");
  let i_title = document.getElementById("titleEdit");
  let i_year = document.getElementById("yearEdit");
  let i_price = document.getElementById("priceEdit");

  let game = {
    title: i_title.value,
    year: i_year.value,
    price: i_price.value,
  };
  let id = i_id.value;
  axios
    .put("http://localhost:9090/game/" + id, game, axiosConfig)
    .then((response) => {
      if (response.status == 200) {
        Toast.fire({
          icon: "info",
          title: "Game atualizado!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: "Houve algum erro!",
        input: err,
      });
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  width: 600,
  padding: "3em",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
