interface ItemType{
    type:string
    caractName:string
}

export default class Item implements ItemType{
    id:string
    designation:string
    picLink:string
    origin:string
    desc:string
    quantite:number
    certification:string
    caracteristique:string
    type:string
    caractName:string
    constructor(
        id:string, designation:string, picLink:string, origin:string, quantite:number, certification:string, caracteristique:string,type:string, caractName:string, desc:string
    ){
        this.id = id
        this.designation = designation
        this.picLink = picLink
        this.desc = desc
        this.origin = origin
        this.quantite = quantite
        this.certification = certification
        this.caracteristique = caracteristique
        this.type = type
        this.caractName = caractName
    }
}