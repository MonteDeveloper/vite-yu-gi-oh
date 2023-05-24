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
    <div class="container text-center text-white">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 justify-content-center pt-5 g-3">
            <!-- CARDS -->
            <div v-for="card in cards" class="my-card position-relative">
                <div class="my-bgSecondary rounded h-100">
                    <!-- CARD INFO HOVERED -->
                    <div class="my-hoveredBox position-absolute top-50 start-50 translate-middle">
                        Price: ${{ card.card_prices[0].cardmarket_price }}
                    </div>
                    <div class="my-box p-3">
                        <img class="img-fluid" :src="card.card_images[0].image_url" alt="yugiImg">
                        <h3 class="h6 mt-3">{{ card.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.my-card{
    .my-box{
        transition: opacity .2s;
    }

    .my-hoveredBox{
        opacity: 0;
        transition: opacity .2s;
    }    
    
    &:hover .my-box{
        opacity: 0;
    }

    &:hover .my-hoveredBox{
        opacity: 1;
    }
}

</style>
