<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half m-4 p-3">
        <h2>Edição de usuario</h2>
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

        <button @click="update" class="button is-success mb-4">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get("http://localhost:8686/user/" + this.$route.params.id, this.req)
      .then((res) => {
        console.log(res);
        this.id = res.data.id;
        this.name = res.data.name;
        this.email = res.data.email;
      })
      .catch((err) => {
        if(err.response.status == 404){
          this.error = "Usuário não encontrado";
        }
        setTimeout(() => {
          this.$router.push({name: 'Users'})
        }, 1500);
      });
  },
  data() {
    return {
      id: -1,
      email: "",
      name: "",
      error: undefined,
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    update() {
      axios
        .put("http://localhost:8686/user", {
          id: this.id,
          name: this.name,
          email: this.email,
        }, this.req)
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Users" });
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
