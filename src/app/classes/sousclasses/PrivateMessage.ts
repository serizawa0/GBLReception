export default class PrivateMessage{
    id:number
    content:string
    senderId:number
    receiverId:number
    createdAt:Date|null
    constructor(id:number,content:string,senderId:number,receiverId:number,createdAt:Date|null){
        this.id = id
        this.content = content
        this.senderId = senderId
        this.receiverId = receiverId
        this.createdAt = createdAt
    }
}