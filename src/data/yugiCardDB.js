import { reactive } from 'vue'
import axios from 'axios'

export const yugiCardDB = reactive({
    loading: false,
    urlAPI: "https://db.ygoprodeck.com/api/v7",
    cardListUrlExtension: "/cardinfo.php",
    archetypesListUrlExtension: "/archetypes.php",
    cardLoaded: [],
    nCardsToLoad: 12,
    archetypeSelected: "NONE",
    listOfArchetypes: [],
    //FUNZIONI---------------------
    loadNewCards() {
        if (!this.loading) {
            const saveCardLoaded = this.cardLoaded;
            this.loading = true;

            axios.get(`${this.urlAPI}${this.cardListUrlExtension}?num=${this.nCardsToLoad}&offset=${this.cardLoaded.length}`).then(r => {
                //Se completata correttamente stampo il dato
                console.log("Ricevuto: ", r.data.data);
                //Aggiungo i dati nello store per riutilizzarli in altri componenti
                this.cardLoaded.push(...r.data.data);
                console.log(this.cardLoaded);
                this.loading = false;
            }).catch(errore => {
                //In caso di problemi, mostro l'errore in console
                console.error("Qualcosa è andato storto", errore);
                //Mi assicuro che il dato nello store sia resettato a prima della chiamata
                this.cardLoaded = saveCardLoaded;
                //Il caricamento è comunque finito anche in questo caso
                this.loading = false;
            });
        }
    },
    updateListOfArchetypes(){
        axios.get(`${this.urlAPI}${this.archetypesListUrlExtension}`).then(r => {
            //Se completata correttamente stampo il dato
            console.log("Ricevuto: ", r.data);
            this.listOfArchetypes = r.data;
        }).catch(errore => {
            //In caso di problemi, mostro l'errore in console
            console.error("Qualcosa è andato storto", errore);
        });
    },
    startDB(){
        this.loadNewCards();
        this.updateListOfArchetypes();
    }
});