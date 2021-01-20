<template>
  <div>
    <section class="hero is-primary mb-3">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Painel Admnistrativo</h1>
          <h2 class="subtitle">Listagem de Usuários</h2>
        </div>
      </div>
    </section>

    <div class="columns is-centered">
      <table class="table column is-half">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role | processRole }}</td>
            <td>
              <router-link :to="{name: 'UserEdit', params:{id: user.id}}">
                <button class="button is-success mr-1">
                Editar
              </button>
                </router-link> 
              <button
                class="button is-danger ml-1"
                @click="showModalUser(user.id, user.name)"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="{ modal: true, 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Confirmar Ação</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Você quer realmente deletar este usuário? <br /><b>{{
                userToDelete.name
              }}</b>
            </div>
          </div>
          <footer class="card-footer">
            <a
              href="#"
              class="card-footer-item has-background-dark has-text-white"
              @click="hideModal"
              >Cancelar</a
            >
            <a
              href="#"
              class="card-footer-item has-background-danger has-text-white"
              @click="deleteUser"
              >Sim, quero deletar</a
            >
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="hideModal"
      ></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios
      .get("http://localhost:8686/users", this.req)
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
      showModal: false,
      userToDelete: {
        id: -1,
        name: "",
      },
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    showModalUser(id, name) {
      console.log(id);
      console.log(name);
      this.showModal = true;
      this.userToDelete.id = id;
      this.userToDelete.name = name;
    },
    deleteUser() {
      axios
        .delete("http://localhost:8686/user/" + this.userToDelete.id, this.req)
        .then((res) => {
          console.log(res);
          this.showModal = false;
          axios
            .get("http://localhost:8686/users", this.req)
            .then((res) => {
              this.users = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.showModal = false;
        });
    },
  },
  filters: {
    processRole: function (value) {
      if (value == 0) {
        return "Usuário";
      } else if (value == 1) {
        return "Administrador";
      } else {
        return "Sem cargo";
      }
    },
  },
};
</script>

<style scoped>
</style>