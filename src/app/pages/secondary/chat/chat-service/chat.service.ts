import { Injectable } from '@angular/core';
import Utilisateur from '../../../../classes/Utilisateur';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private senderSubject = new BehaviorSubject<Utilisateur|null>(null)
  sender$ = this.senderSubject.asObservable()
  private receiverSubject = new BehaviorSubject<Utilisateur|null>(null)
  receiver$ = this.receiverSubject.asObservable()
  constructor() { }
  async setCouple(sender:Utilisateur,receiver:Utilisateur){
    this.senderSubject.next(sender)
    this.receiverSubject.next(receiver)
    return true
  }
}
