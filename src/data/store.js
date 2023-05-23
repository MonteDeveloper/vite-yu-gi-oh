import { reactive } from 'vue'

export const store = reactive({
    loading: false,
    urlAPI: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    yugiCards: []
});