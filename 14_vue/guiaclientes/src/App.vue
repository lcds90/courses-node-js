<template>
  <div id="app">
    <input type="text" v-model="chefe.nome" />
    <!-- Prop permitem que passe os dados na construção do componente 

    <Cliente :chefe="chefe" nome="Leonardo" email="leonardo@email.com" :numero="11949040112" :showInfo="false" :isPremium="true"/>
    <Cliente :chefe="chefe" nome="Fabio" email="fabio@email.com" :numero="11949040113" :showInfo="true" :isPremium="false"/>
    
     no v-for é sempre necessario ter a key, como um id, ao abrir () para gerar index-->

    <h4>Cadastro</h4>
    <input type="text" placeholder="nome" v-model="nomeField" />
    <input type="email" placeholder="email" v-model="emailField" />
    <input type="text" placeholder="numero" v-model="numberField" />
    <button @click="cadastrarUsuario">Cadastrar</button>
    <hr />
    <div v-for="(cliente, index) in clientes" :key="cliente.id">
      <h5>{{ index + 1 }}</h5>
      <input type="text" v-model="cliente.nome" />
      <Cliente :chefe="chefe" :cliente="cliente" />
    </div>

    <Produto />
  </div>
</template>

<script>
import Cliente from "./components/Cliente.vue";
import Produto from "./components/Produto.vue";

export default {
  name: "App",
  components: {
    Cliente,
    Produto,
  },
  data() {
    return {
      nomeField: "",
      emailField: "",
      numberField: "",
      chefe: {
        nome: "Leo",
        cargo: "Programador",
      },
      clientes: [
        {
          id: 1,
          nome: "Oswaldo",
          email: "cli@cli.com",
          numero: 0,
          tipo: "comprador",
          showInfo: true,
          isPremium: true,
        },
        {
          id: 2,
          nome: "Henrique",
          email: "cli@cli.com",
          numero: 0,
          tipo: "comprador",
          showInfo: false,
          isPremium: false,
        },
      ],
    };
  },
  methods: {
    cadastrarUsuario: function () {
      this.clientes.push({
        nome: this.nomeField,
        email: this.emailField,
        number: this.numberField,
        id: Date.now(),
      });
      this.nomeField = "";
      this.emailField = "";
      this.numberField = "";
    },
  },
};
</script>

<style>
</style>
