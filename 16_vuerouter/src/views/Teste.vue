<template>
  <div>
      <input type="email" placeholder="E-Mail" id="email">
      <input type="text" placeholder="Nome" id="nome">
      <button>Teste</button>
      <h4>{{parametroRota}}</h4>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
 created(){
   console.log(this.$route.params.dado)
   this.parametroRota = this.$route.params.dado
 },
 data(){
   return {
     parametroRota: "Nada"
   }
 }
}
</script>

<style>

</style>