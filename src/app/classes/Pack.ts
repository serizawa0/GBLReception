import Item from "./Item"

export default class pack{
    id:number
    designation:string
    origin:string
    items:Item[]
    desc:string
    picLink:string
    constructor(
        id:number, designation:string, origin:string, items:Item[], desc:string, picLink:string
    ){
        this.id = id
        this.designation = designation
        this.origin = origin
        this.items = items
        this.desc = desc
        this.picLink = picLink
    }
}