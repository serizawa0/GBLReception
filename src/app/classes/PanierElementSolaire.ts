import Item from "./Item";

export default class PanierElementSolaire{
    item:Item
    nombre:number
    constructor(item:Item){
        this.item = item
        this.nombre = 1
    }
}