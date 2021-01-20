<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half m-4 p-3">
        <h2>Registro de usuario</h2>
        <hr />
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>
        <label>Nome</label>
        <input
          v-model="name"
          type="text"
          placeholder="Nome de usuário"
          class="input mb-4"
        />
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="email@email"
          class="input mb-4"
        />
        <label>Senha</label>
        <input
          v-model="password"
          type="password"
          placeholder="*******"
          class="input mb-4"
        />
        <button @click="register" class="button is-success mb-4">
          Cadastrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8686/user", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
          let msgErro = err.response.data.err;
          this.error = msgErro;
        });
    },
  },
};
</script>

<style scoped></style>
