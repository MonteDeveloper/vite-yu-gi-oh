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
    totalCardsToLoad: 0,
    //FUNZIONI---------------------
    loadNewCards() {
        if (!this.loading) {
            let completeURL = `${this.urlAPI}${this.cardListUrlExtension}?num=${this.nCardsToLoad}&offset=${this.cardLoaded.length}`;

            if(this.archetypeSelected != "NONE"){
                completeURL += `&archetype=${this.archetypeSelected}`
            }

            const saveCardLoaded = this.cardLoaded;
            this.loading = true;

            axios.get(completeURL).then(r => {
                //Aggiungo i dati per riutilizzarli in altri componenti
                this.cardLoaded.push(...r.data.data);
                this.loading = false;
            }).catch(errore => {
                //In caso di problemi, mostro l'errore in console
                console.error("Qualcosa è andato storto", errore);
                this.cardLoaded = saveCardLoaded;
                //Il caricamento è comunque finito anche in questo caso
                this.loading = false;
            });
        }
    },
    updateTotalCardsToLoad(){
        this.totalCardsToLoad = "LOADING...";
        let completeURL = `${this.urlAPI}${this.cardListUrlExtension}`;

        if(this.archetypeSelected != "NONE"){
            completeURL += `?archetype=${this.archetypeSelected}`
        }

        axios.get(completeURL).then(r => {
            this.totalCardsToLoad = r.data.data.length;
        }).catch(errore => {
            //In caso di problemi, mostro l'errore in console
            console.error("Qualcosa è andato storto", errore);
            this.totalCardsToLoad = "ERROR";
        });
    },
    updateListOfArchetypes(){
        axios.get(`${this.urlAPI}${this.archetypesListUrlExtension}`).then(r => {
            this.listOfArchetypes = r.data;
        }).catch(errore => {
            //In caso di problemi, mostro l'errore in console
            console.error("Qualcosa è andato storto", errore);
        });
    },
    startDB(){
        this.loadNewCards();
        this.updateListOfArchetypes();
        this.updateTotalCardsToLoad();
    },
    resetCardLoaded(){
        this.loading = false;
        this.cardLoaded = [];
    }
});