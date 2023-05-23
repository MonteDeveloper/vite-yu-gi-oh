<script>
import CardVisualizer from './components/CardVisualizer.vue'

import { store } from './data/store.js';

export default {
  name: "App",
  components: {
    CardVisualizer
  },
  data() {
    return {
      nCardsToLoad: 12,
      actualCardsVisualized: 0,
      store //equivalente a scrivere --> store: store
    }
  },
  methods: {
    loadNewCards() {
      if (!this.store.loading) {
        const saveActualStoreData = this.store.yugiCards;
        this.store.loading = true;

        this.axios.get(`${this.store.urlAPI}?num=${this.nCardsToLoad}&offset=${this.actualCardsVisualized}`).then(r => {
          //Se completata correttamente stampo il dato
          console.log("Ricevuto: ", r.data.data);
          //Aggiungo i dati nello store per riutilizzarli in altri componenti
          this.store.yugiCards.push(...r.data.data);
          console.log(this.store.yugiCards);
          this.actualCardsVisualized += this.nCardsToLoad;
          this.store.loading = false;
        }).catch(errore => {
          //In caso di problemi, mostro l'errore in console
          console.error("Qualcosa è andato storto", errore);
          //Mi assicuro che il dato nello store sia resettato a prima della chiamata
          this.store.yugiCards = saveActualStoreData;
          //Il caricamento è comunque finito anche in questo caso
          this.store.loading = false;
        });
      }
    }
  },
  mounted() {
    //carico le prime carte da visualizzare in pagina
    this.loadNewCards();
  }
}
</script>

<template>
  <div class="container">
    <CardVisualizer :cards="store.yugiCards"/>
    <div class="text-center m-3">
      <button class="btn btn-light" v-show="!store.loading" @click="loadNewCards()">LOAD MORE</button>
      <i v-show="store.loading" class="my-loader fa-solid fa-circle-notch text-white fs-3"></i>
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
