<script>
import CardVisualizer from './components/CardVisualizer.vue'
import DynamicSelect from './components/DynamicSelect.vue'

import { yugiCardDB } from './data/yugiCardDB.js';

export default {
  name: "App",
  components: {
    CardVisualizer,
    DynamicSelect
  },
  data() {
    return {
      nCardsToLoad: 12,
      actualCardsVisualized: 0,
      yugiCardDB
    }
  },
  methods: {
  },
  mounted() {
    this.yugiCardDB.startDB();
  }
}
</script>

<template>
  <div class="container">
    <h2 class="text-white text-center my-5">CARDS NUMBER: {{ yugiCardDB.totalCardsToLoad }}</h2>
    <DynamicSelect :options="yugiCardDB.listOfArchetypes"/>
    <CardVisualizer :cards="yugiCardDB.cardLoaded"/>
    <div class="text-center m-3">
      <button class="btn btn-light" v-show="!yugiCardDB.loading && yugiCardDB.cardLoaded.length < yugiCardDB.totalCardsToLoad" @click="yugiCardDB.loadNewCards()">LOAD MORE</button>
      <i v-show="yugiCardDB.loading" class="my-loader fa-solid fa-circle-notch text-white fs-3"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$spinner-duration: .7s;
.my-loader{
  animation: spin $spinner-duration linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
$primary: #27292d;
$secondary: #353638;

body{
    background-color: $primary;
}

.my-bgPrimary{
    background-color: $primary;
}

.my-bgSecondary{
    background-color: $secondary;
}
</style>
