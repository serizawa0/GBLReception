export class Dossier{
    id:number
    nom:string|null
    fileLink:string|null
    type:number
    constructor(id:number,nom:string|null,fileLink:string|null, type:number){
        this.nom = nom
        this.id= id
        this.fileLink = fileLink
        this.type = type
    }
}