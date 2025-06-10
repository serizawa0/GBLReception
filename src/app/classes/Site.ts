export default class Site{
    id:number
    name:string
    code:string
    dateDebut:Date
    dateFin:Date
    constructor(
        id:number, name:string, code:string, dateDebut:Date, dateFin:Date
    ){
        this.id = id
        this.name = name
        this.code = code
        this.dateDebut = dateDebut
        this.dateFin  = dateFin
    }
}