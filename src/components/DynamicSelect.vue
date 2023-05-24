<script>
import { yugiCardDB } from '../data/yugiCardDB.js';

export default {
    name: "DynamicSelect",
    props: {
        options: Array
    },
    data(){
        return{
            yugiCardDB
        }
    },
    methods: {
        optionChanged(){
            this.yugiCardDB.resetCardLoaded();
            this.yugiCardDB.loadNewCards();
            this.yugiCardDB.updateTotalCardsToLoad();
        }
    },
    mounted() {
        console.log("Caricato il componente 'DynamicSelect'.");
    }
}
</script>

<template>
    <select class="form-select text-center" v-model="yugiCardDB.archetypeSelected" @change="optionChanged()">
        <option>NONE</option>
        <option v-for="(option, i) in options">{{option.archetype_name}}</option>
    </select>
</template>

<style lang="scss" scoped>


</style>
