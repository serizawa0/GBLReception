import Utilisateur from "../Utilisateur"
import FactureElement from "./FactureElement"

export default class facture{
    date:Date
    id:string
    titre:string
    user:Utilisateur
    elements:FactureElement[]
    total:number
    state:string
    categorie:string
    constructor(titre:string, user:Utilisateur, elements:FactureElement[],categorie:string,state:string){
        this.date = new Date()
        this.id = ''
        this.titre = titre
        this.user = user
        this.elements = elements
        let total  = 0
        this.elements.forEach(element => {
            total+=element.montant
        });
        this.total = total
        this.state = state
        this.categorie = categorie
    }
}