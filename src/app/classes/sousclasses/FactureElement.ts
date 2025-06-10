export default class FactureElement{
    libelle:string
    nombre:number
    montant:number
    constructor(libelle:string, nombre:number,montant:number){
        this.libelle = libelle
        this.nombre = nombre
        this.montant = montant
    }
}