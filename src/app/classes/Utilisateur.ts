import UserCategorie from "./UserCatégorie"

export default class Utilisateur{
    id:number
    cat:UserCategorie
    name:string
    email:string
    avatar?:string
    constructor(id :number,email:string, cat:UserCategorie, name:string){
        this.id = id
        this.email = email
        this.cat = cat
        this.name = name
    }
}