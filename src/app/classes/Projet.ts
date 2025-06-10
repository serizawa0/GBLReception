import Site from "./Site"

export default class Projet{
    id:number
    name:string
    dateDebut:Date
    dateFin:Date
    sites:Site[]
    dates:Date[]
    constructor(
        id:number,name:string,dateDebut:Date,dateFin:Date
    ){
        this.id = id
        this.name = name
        this.dateDebut = dateDebut
        this.dateFin = dateFin
        this.sites = []
        this.dates = [this.dateDebut,this.dateFin]
    }
    tri(){
        this.dates = this.dates.sort((a,b)=> a.getTime()-b.getTime())
    }
}