<template>
  <div id="app" class="uk-container">
    <!--
    <input type="text" v-model="chefe.nome" />
     Prop permitem que passe os dados na construção do componente 

    <Cliente :chefe="chefe" nome="Leonardo" email="leonardo@email.com" :numero="11949040112" :showInfo="false" :isPremium="true"/>
    <Cliente :chefe="chefe" nome="Fabio" email="fabio@email.com" :numero="11949040113" :showInfo="true" :isPremium="false"/>
    
     no v-for é sempre necessario ter a key, como um id, ao abrir () para gerar index-->

    <ul uk-tab>
      <li class="uk-active">
        <a href="#" uk-toggle="target: .client; animation: uk-animation-fade"
          >Cadastrar</a
        >
      </li>
      <li v-for="(cliente, index) in orderClientes" :key="cliente.id">
        <a
          href="#"
          :uk-toggle="
            'target: .' + cliente.nome + '; animation: uk-animation-fade;'
          "
          >{{ index + 1 }} {{ cliente.nome }}
        </a>
      </li>
    </ul>

    <div hidden class="client">
      <div uk-grid class="uk-width-1-1">
        <fieldset class="uk-fieldset uk-width-1-1">
          <div class="uk-margin uk-width-1-1">
            <legend class="uk-legend">Cadastrar Cliente</legend>
            <br />
            <div
              v-show="isWithError"
              class="uk-alert-danger uk-child-width-1-2@s uk-grid-collapse uk-text-center"
              uk-grid
              uk-alert
            >
              <p>Atenção</p>
              <p>O nome está inválido, tente novamente.</p>
            </div>
            <input
              id="name"
              class="uk-input"
              type="text"
              placeholder="Nome"
              v-model="nomeField"
            />
          </div>

          <div class="uk-margin uk-width-1-1 uk-flex">
            <span class="uk-width-1-3 uk-flex-center uk-flex uk-flex-middle">
              <label for="isPremium">Cliente Premium </label>
              <input
                id="isPremium"
                class="uk-checkbox uk-margin-left"
                type="checkbox"
                v-model="isPremium"
              />
            </span>
            <input
              class="uk-input uk-width-1-3"
              type="email"
              placeholder="E-mail"
              v-model="emailField"
            />
            <input
              class="uk-input uk-width-1-3"
              type="text"
              placeholder="Número"
              v-model="numberField"
            />
          </div>
          <button
            class="uk-button uk-button-secondary uk-width-1-1"
            @click="cadastrarUsuario"
          >
            Cadastrar
          </button>
        </fieldset>
      </div>
    </div>

    <div class="uk-container" v-for="cliente in orderClientes" :key="cliente.id">
      <input
        class="uk-input"
        hidden
        type="text"
        v-model="cliente.nome"
        :class="cliente.nome"
      />
      <Cliente
        hidden
        :class="cliente.nome"
        :chefe="chefe"
        :cliente="cliente"
        @delete="deletarUsuario($event)"
      />
    </div>

    <Produto hidden />
  </div>
</template>

<script>
import _ from "lodash";
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
      isWithError: false,
      isPremium: Boolean,
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
      if (
        this.nomeField == "" ||
        this.nomeField == "" ||
        !isNaN(parseInt(this.nomeField)) ||
        this.nomeField.length < 3
      ) {
        this.isWithError = true;
      } else {
        this.clientes.push({
          nome: this.nomeField,
          email: this.emailField,
          number: this.numberField,
          id: Date.now(),
        });
        this.nomeField = "";
        this.emailField = "";
        this.numberField = "";
        this.isWithError = true;
      }
    },
    deletarUsuario: function ($event) {
      /* $event.component.testando()
      console.log("Recebendo evento") */
      let id = $event.idCliente;
      let filter = this.clientes.filter((cliente) => cliente.id != id);
      this.clientes = filter;
    },
  },
  computed: {
    orderClientes: function(){
      return _.orderBy(this.clientes,['nome'], ['asc'])
    }
  }
};
</script>

<style>
#app {
  background-color: rgb(99, 99, 99);
  height: 100vh;
  color: white;
}

.uk-alert-danger {
  position: absolute;
  right: 10vw;
  top: 8vh;
  width: 50vw;
  font-size: 0.7rem;
  box-shadow: 5px 5px 5px rgba(158, 152, 152, 0.4);
  border: 3px double rgba(235, 0, 0, 0.8);
  outline: 3px double rgba(235, 0, 0, 0.4);
  height: 2% !important;
  animation: fadeAlert 0.5s ease-out;
}
.uk-alert-danger p:nth-child(1) {
  background-color: rgb(44, 44, 44, 0.9);
  color: white;
}
.uk-alert-danger p:nth-child(2) {
  background-color: rgba(110, 7, 7, 0.9);
  color: red;
}

@keyframes fadeAlert {
  0% {
    transform: scale(0.01);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
