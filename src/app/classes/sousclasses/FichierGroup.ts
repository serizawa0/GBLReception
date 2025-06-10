import Fichier from "./Fichier"

export default class FichierGroup{
    id:number|null
    nomGroup:string
    fichiers:File[]
    constructor( nomGroup:string ){
        this.id =  null
        this.nomGroup = nomGroup
        this.fichiers = []
    }
}