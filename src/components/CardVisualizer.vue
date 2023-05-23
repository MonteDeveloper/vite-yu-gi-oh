<script>

export default {
    name: "CardVisualizer",
    props: {
        cards: Array
    },
    mounted() {
        console.log("Caricato il componente 'CardVisualizer'.");
    }
}
</script>

<template>
    <div class="text-center text-white">
        <div class="d-flex flex-wrap justify-content-center align-items-stretched pt-5">
            <!-- CARDS -->
            <div v-for="card in cards" class="p-2 col-2 position-relative">
                <!-- CARD INFO HOVERED -->
                <div class="my-cardInfo p-3 rounded my-bgSecondary position-absolute top-50 start-50 translate-middle">
                    Price: ${{ card.card_prices[0].cardmarket_price }}
                </div>
                <div class="my-card p-3 rounded my-bgSecondary">
                    <img class="img-fluid" :src="card.card_images[0].image_url" alt="yugiImg">
                    <h3 class="h6 mt-3">{{ card.name }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.my-card{
    transition: opacity .2s;

    &:hover{
        opacity: 0;
    }
}

.my-cardInfo{
    z-index: -999;
}
</style>
