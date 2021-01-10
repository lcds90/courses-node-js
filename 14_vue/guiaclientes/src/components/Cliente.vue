<template>
  <div
    :class="{
      'container-cliente': !cliente.isPremium,
      'container-premium': cliente.isPremium,
    }"
  >
    <h1>Cliente {{ cliente.nome }}</h1>
    <hr />
    <!-- reatividade com variaveis de script -->
    <!--
            diferença entre show e inf
            quando v-show for falso, ele não irá renderizar novamente o elemento 
            não existe else em v-show
        -->
    <p v-show="cliente.showInfo === true">Cargo: {{ cliente.tipo }}</p>
    <p v-if="cliente.showInfo === true">E-mail: {{ cliente.email }}</p>
    <p v-if="cliente.showInfo === true">Contato: {{ cliente.numero }}</p>
    <p v-else>O usuário optou por ocultar as informações</p>
    <b>Chefe: {{ chefe.nome }} / {{ chefe.cargo }}</b>
    <span v-if="cliente.isPremium">
      <input @change="mudarCor" type="checkbox" checked /> Plano Premium
    </span>
    <span v-else>
      <input @change="mudarCor($event)" type="checkbox" /> Plano Premium
    </span>

    <!-- one-way-data binding colando dado somente como leitura -->
    <input type="text" :value="cliente.email" /><br />
    <input type="text" v-model="cliente.numero" /><br />
  </div>
</template>
<script>
export default {
  props: {
    chefe: Object,
    cliente: Object
  },
  methods: {
    mudarCor: function ($event) {
      console.log($event)
      this.isPremium = !this.isPremium;
    },
  },
};
</script>
<style scoped>
.container-cliente {
  background-color: #aabbbb;
  width: 350px;
  text-align: center;
  padding: 5px;
  margin: 1%;
}
.container-premium {
  background-color: #6e6e6e;
  width: 350px;
  text-align: center;
  padding: 5px;
  margin: 1%;
}
</style>