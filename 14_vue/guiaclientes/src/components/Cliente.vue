<template>
  <div
    :class="{
      'container-cliente': !isPremium,
      'container-premium': isPremium,
    }"
  >
    <h1>Cliente {{ nome }}</h1>
    <hr />
    <!-- reatividade com variaveis de script -->
    <!--
            diferença entre show e inf
            quando v-show for falso, ele não irá renderizar novamente o elemento 
            não existe else em v-show
        -->
    <p v-show="showInfo === true">Cargo: {{ tipo }}</p>
    <p v-if="showInfo === true">E-mail: {{ email }}</p>
    <p v-if="showInfo === true">Contato: {{ numero }}</p>
    <p v-else>O usuário optou por ocultar as informações</p>
    <b>Chefe: {{ chefe.nome }} / {{ chefe.cargo }}</b>

    <!-- one-way-data binding colando dado somente como leitura -->
    <input type="text" :value="email" /><br />
    <input type="text" v-model="numero" /><br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tipo: "comprador",
    };
  },
  props: {
    chefe: Object,
    nome: String,
    email: String,
    numero: Number,
    showInfo: Boolean,
    isPremium: Boolean,
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