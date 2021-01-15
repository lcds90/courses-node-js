<template>
  <div id="app" class="columns">
    <div class="column has-text-centered is-half">
      <div class="fixed-menu">
        <img src="./assets/pokemon.png" alt="Logo de Pokemon" />
        <hr />
        <h3 class="is-size-5">Pokedex</h3>
        <div class="field">
          <div class="control">
            <input
              class="input is-medium is-rounded"
              v-model="busca"
              type="text"
              placeholder="Buscar pelo nome"
            />
            <button disabled id="buscarBtn" class="button is-fullwidth is-success mt-4" v-on:click="buscar">
              Buscar
            </button>
            <h6 class="is-size-6">Desativado para busca dinâmica</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="column has-text-centered is-half" id="menu">
      <div v-for="(poke, index) in resultadoBusca" :key="poke.url">
        <Pokemon :name="poke.name" :url="poke.url" :num="index" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/Pokemon";

export default {
  name: "App",
  data() {
    return {
      pokemons: [],
      f_pokemons: [],
      busca: "",
    };
  },
  created: function () {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=200&limit=100")
      .then((res) => {
        this.pokemons = res.data.results;
        this.f_pokemons = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Pokemon,
  },
  methods: {
    buscar: function () {
      this.f_pokemons = this.pokemons;
      console.log(this.f_pokemons)
      if (this.busca == "" || this.busca == " ") {
        this.f_pokemons = this.pokemons;
      } else {
        this.f_pokemons = this.pokemons.filter(
          (pokemon) => pokemon.name.indexOf(this.busca) > -1
        );
      }
    },
  },
  computed: {
    resultadoBusca: function(){
      console.log(this.f_pokemons)
      if (this.busca == "" || this.busca == " ") {
        return this.pokemons;
      } else {
        return this.pokemons.filter(
          (pokemon) => pokemon.name.indexOf(this.busca) > -1
        );
      }
    }
  },
};
</script>

<style>
.fixed-menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  transform: scale(0.9);
  -moz-transform: scale(0.9);
  background-color: burlywood;
  padding: 16px;
}

#menu {
  position: fixed;
  overflow: scroll;
  left: 50vw;
  height: 95vh;
  border: 1px solid white;
  background-color: beige;
  outline: black 5px double;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
</style>
