<template>
  <div>
    <h3>
      <b>{{ num }}</b> - {{ name | upper }}
    </h3>
    <i>{{ url }} </i>
  </div>
</template>
<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(this.url).then(res => {
        this.pokemon.types = res.data.types[0];
        this.pokemon.front = res.data.sprites.front_default;
        this.pokemon.back = res.data.sprites.back_default;
        
        console.log(this.pokemon)
    })
  },
  data(){
      return {
          pokemon: {}
      }
  },
  props: {
    num: Number,
    name: String,
    url: String,
  },
  filters: {
    upper: function (value) {
      let newName = value[0].toUpperCase() + value.slice(1);
      return newName;
    },
  },
};
</script>

<style scoped>
</style>