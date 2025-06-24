import FichierGroup from "./sousclasses/FichierGroup"

export default class Project{
    id:number|null
    typeId:number
    client:string
    docs:FichierGroup[]
    constructor(id:number,typeId:number, client:string){
        this.typeId = typeId
        this.docs= []
        this.id = id
        this.client = client
    }
}