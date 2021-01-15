<template>
  <div id="pokemon">
    <!-- <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg" :alt="'Imagem do Pokemon ' + name" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ num }} - {{ name | upper }}</p>
            <p class="subtitle is-6">{{ pokemon.type }}</p>
          </div>
        </div>
        <div class="content">
          <button
            class="button is-medium is-fullwidth"
            v-on:click="mudar($event)"
          >
            Mudar sprite
          </button>
        </div>
      </div>
    </div> -->
    <article class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="currentImg" :alt="'Imagem do Pokemon ' + name" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p class="title is-4">{{ num + 1 }} - {{ name | upper }}</p>
          <p class="subtitle is-6">{{ pokemon.type }}</p>
        </div>
      </div>
      <div class="media-right">
        <button v-on:click="mudar($event)" class="button is-dark">Mudar Sprite</button>
      </div>
    </article>
  </div>
</template>
<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(this.url).then((res) => {
      this.pokemon.type = res.data.types[0].type.name;
      this.pokemon.front = res.data.sprites.front_default;
      this.pokemon.back = res.data.sprites.back_default;
      this.currentImg = this.pokemon.front;

      // console.log(this.pokemon);
    });
  },
  data() {
    return {
      isFront: true,
      currentImg: "",
      pokemon: {
        type: "",
        front: "",
        back: "",
      },
    };
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
  methods: {
    mudar: function ($event) {
      console.log($event);
      if (this.isFront) {
        this.isFront = false;
        this.currentImg = this.pokemon.back;
      } else {
        this.isFront = true;
        this.currentImg = this.pokemon.front;
      }
    },
  },
};
</script>

<style scoped>
#pokemon {
  margin: 10% 5%;
  padding:5%;
  display:flex;
  justify-content:space-between;
  background-color: rgba(165, 42, 42, 0.37);
  filter:drop-shadow(5px 5px 15px rgba(0,0,0,.25));
  color:white;
  align-content:space-between;
  border:beige 2px solid;
  outline:5px double brown;
}
p:nth-child(1){
  color:white;
  letter-spacing:5px;
  font-size:1rem;
}

p:nth-child(2){
  font-size:3rem;
  color:whitesmoke;
  filter:drop-shadow(0px 0px 5px rgba(255,255,255,.5));
  font-style:italic;
}
</style>