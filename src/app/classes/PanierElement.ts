import pack from "./Pack"

export default class PanierElement{
    id:number
    pack:pack
    nombre:number
    constructor(pack:pack){
        this.id =0
        this.nombre = 1
        this.pack = pack
    }

}