<template>
  <div
    id="containerClient"
    v-bind:class="['uk-card', 'uk-card-body',
     cliente.isPremium == true ? 'uk-card-primary' : 'uk-card-secondary'
    ]"
  >
    <h3 class="uk-card-title">Cliente {{ cliente.nome }}</h3>
    <small>ID especial: {{ gerarId }}</small>
    <!-- reatividade com variaveis de script -->
    <!--
            diferença entre show e inf
            quando v-show for falso, ele não irá renderizar novamente o elemento 
            não existe else em v-show
        -->
    <p>
      <span v-show="cliente.showInfo === true"
        >Cargo: {{ cliente.tipo }}<br
      /></span>
      <span v-if="cliente.showInfo === true"
        >E-mail: {{ cliente.email | processarEmail }}<br
      /></span>
      <span v-if="cliente.showInfo === true"
        >Contato: {{ cliente.numero }}<br
      /></span>
      <span v-else>O usuário optou por ocultar as informações<br /></span>
      <b>Chefe: {{ chefe.nome }} / {{ chefe.cargo }}</b>
    </p>

    <!-- one-way-data binding colando dado somente como leitura -->
    <input class="uk-input" type="text" v-model="cliente.email" /><br />
    <input class="uk-input" type="text" v-model="cliente.numero" /><br />
    <button
      @click="mudarCor"
      class="uk-button uk-button-primary uk-width-1-1"
    >
      Mudar cor
    </button>
    <button
      @click="deleteClient"
      class="uk-button uk-button-danger uk-width-1-1"
    >
      Deletar
    </button>
  </div>
</template>
<script>
export default {
  props: {
    chefe: Object,
    cliente: Object,
  },
  methods: {
    mudarCor: function () {
      this.cliente.isPremium = !this.cliente.isPremium
    },
    deleteClient: function () {
      
      this.$emit("delete", {idCliente: this.cliente.id, endereco: "Rua da Avenida na Esquina, S/N", component: this});
    },
    testando: function(){
      // chamando metodo filho para o pai
      console.log("Emitindo do Filho");
    }
  },
  // filtro sempre recebem e retornar algum valor, no html utilizar | para filtrar
  filters: {
    processarEmail: function (value) {
      return value.toUpperCase();
    }
  },
  computed: {
    // método que retorna valor especifico
    gerarId: function () {
      return (this.cliente.email + this.cliente.nome + this.cliente.id).toUpperCase()
    }
  }
};
</script>
<style scoped>
</style>