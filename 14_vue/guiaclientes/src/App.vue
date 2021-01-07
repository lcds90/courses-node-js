<template>
  <div id="app">
    <input type="text" v-model="chefe.nome">
    <!-- Prop permitem que passe os dados na construção do componente -->
    <Cliente :chefe="chefe" nome="Leonardo" email="leonardo@email.com" :numero="11949040112" :showInfo="false" :isPremium="true"/>
    <Cliente :chefe="chefe" nome="Fabio" email="fabio@email.com" :numero="11949040113" :showInfo="true" :isPremium="false"/>
    
    <!-- no v-for é sempre necessario ter a key, como um id, ao abrir () para gerar index-->
    <div v-for="(cliente, index) in clientes" :key="cliente.id">
      <h5>{{index + 1}}</h5>
      <input type="text" v-model="cliente.nome">
      <Cliente :chefe="chefe" :nome="cliente.nome" :email="cliente.email" :numero="cliente.numero" :showInfo="cliente.showInfo" :isPremium="cliente.isPremium"/>
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
    Produto
  },
  data() {
    return {
      chefe: {
        nome: "Leo",
        cargo: "Programador"
      },
      clientes: [
        {
          id: 1,
          nome: "Oswaldo",
          email: "cli@cli.com",
          numero: 0,
          showInfo: true,
          isPremium: true,
        },
        {
          id: 2,
          nome: "Henrique",
          email: "cli@cli.com",
          numero: 0,
          showInfo: false,
          isPremium: false,
        },
      ]
    }
  }
};
</script>

<style>

</style>
