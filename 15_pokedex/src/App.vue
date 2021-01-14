<template>
  <div id="app" class="columns">
    <div class="column is-offset-one-quarter has-text-centered is-half">
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
        </div>
      </div>
      <div v-for="(poke, index) in pokemons" :key="index">
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
      busca: "",
    };
  },
  created: function () {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=200&limit=100")
      .then((res) => {
        this.pokemons = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Pokemon,
  },
};
</script>

<style>
</style>
