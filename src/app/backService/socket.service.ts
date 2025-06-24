import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import Panier from '../classes/Panier';
import PanierSolaire from '../classes/PanierSolaire';
import facture from '../classes/sousclasses/Facture';
import PrivateMessage from '../classes/sousclasses/PrivateMessage';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!:Socket
  private readonly URL = 'http://192.168.88.25:3000';
  constructor() {
    // this.socket = io(this.URL,{
    //   transports:['websocket']
    // })
  }

  connecte(){
    this.socket = io(this.URL, {
      transports:['websocket']
    })
  }

  register(userId: number) {
    this.socket.emit('register', userId);
  }
  // Écouter un événement
  public onMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }

  public onPrivateMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('newPrivateMessage', (data: string) => {
        observer.next(data);
      });
    });
  }

  public onGravityCommand(): Observable<Panier[]> {
    return new Observable((observer) => {
      this.socket.on('gravityCommand', (data: Panier[]) => {
        observer.next(data);
      });
    });
  }

  public onSolaireCommand(): Observable<PanierSolaire[]> {
    return new Observable((observer) => {
      this.socket.on('solaireCommand', (data: PanierSolaire[]) => {
        observer.next(data);
      });
    });
  }

  // Envoyer un message
  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
  public sendPrivateMessage(message: PrivateMessage): void {
    
    this.socket.emit('private-message', message)
    // console.log(message);
  }

  onUserConnected(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user-connected', (id: string) => observer.next(id));
    });
  }

  onMessageSent():Observable<PrivateMessage[]>{
    return new Observable(observer => {
      this.socket.on('newPrivateMessage', (data:PrivateMessage[]) => {
        observer.next(data)
      })
    })
  }

  onUserDisconnected(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user-disconnected', (id: string) => observer.next(id));
    });
  }
  onNewDemandeCaisse():Observable<facture[]>{
    return new Observable(observer => {
      this.socket.on('new-demande-caisse', (factures: facture[]) => observer.next(factures));
    });
  }
}
