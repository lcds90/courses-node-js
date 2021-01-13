<template>
  <div id="app">
    <div v-for="(poke, index) in pokemons" :key="index">
      <Pokemon :name="poke.name" :url="poke.url" :num="index"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from './components/Pokemon'

export default {
  name: "App",
  data() {
    return {
      pokemons: [],
    };
  },
  created:function() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=300&limit=100")
      .then((res) => {
        this.pokemons = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Pokemon
  }
};
</script>

<style>
</style>
