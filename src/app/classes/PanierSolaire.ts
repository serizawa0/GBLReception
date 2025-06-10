import Item from "./Item";
import PanierElementSolaire from "./PanierElementSolaire";

export default class PanierSolaire{
    id:number
        nom:string
        prenom:string
        region:string
        modeLivraison:string
        adresseLivraison:string
        email:string
        packs:PanierElementSolaire[]
        modePaiement:string
        constructor(panierElements:PanierElementSolaire[],modePaiement:string,nom:string,prenom:string,region:string,modeLivraison:string,adresseLivraison:string,email:string){
            this.id=0
            this.packs = panierElements
            this.modePaiement = modePaiement
            this.nom = nom
            this.prenom = prenom
            this.region = region
            this.modeLivraison = modeLivraison
            this.adresseLivraison = adresseLivraison
            this.email = email
        }
}