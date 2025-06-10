
import PanierElement from "./PanierElement"

export default class Panier{
    id:number
    nom:string
    prenom:string
    region:string
    modeLivraison:string
    adresseLivraison:string
    email:string
    packs:PanierElement[]
    modePaiement:string
    constructor(panierElements:PanierElement[],modePaiement:string,nom:string,prenom:string,region:string,modeLivraison:string,adresseLivraison:string,email:string){
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