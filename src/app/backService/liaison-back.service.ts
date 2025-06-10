import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Panier from '../classes/Panier';
import { interval, Observable, switchMap } from 'rxjs';
import InterfaceGravityPanier from '../classes/interfaceGravityPanier';
import InterfaceUsers from '../classes/interfaces/InterfaceUsers';
import InterfaceFacture from '../classes/interfaces/interfaceFacture';
import facture from '../classes/sousclasses/Facture';
import Log from '../classes/Log';
import interfaceLog from '../classes/interfaces/interaceLog';
import { log } from 'node:console';
import Utilisateur from '../classes/Utilisateur';
import interfacePrivateMessage from '../classes/interfaces/interfacePrivateMessage';
import PrivateMessage from '../classes/sousclasses/PrivateMessage';

@Injectable({
  providedIn: 'root'
})
export class LiaisonBackService {
  url = 'http://localhost:3000/'
  gravityCommands:Panier[]
  constructor(
    private http:HttpClient
  ) {
    this.gravityCommands = []
  }

  async logToApp(login:Log){
    return this.http.post<Utilisateur|string>(this.url+'GBL/logInApp',login)
    // return this.http.post<interfaceLog>(this.url+'GBL/test',login)
  }

  async getGroups(userId:number){
    return this.http.post(this.url+'GBL/getGroups',userId)
  }

  async getGravityCommands(){
    return this.http.get<InterfaceGravityPanier>(this.url + 'Gravity')
  }
  async getUsers(){
    return this.http.get<InterfaceUsers>(this.url+'GBL/users')
    // return true
  }

  async getFactures(){
    return this.http.get<InterfaceFacture>(this.url+'GBL/demandeCaisse')
  }
  async postFacture(facture:facture){
    return this.http.post<InterfaceFacture>(this.url+'GBL/subDemandeCaisse',facture)
  }
async validerfacture(facture:facture){
  return this.http.post<InterfaceFacture>(this.url+'GBL/validerFacture',facture)
}

async approuverfacture(facture:facture){
  return this.http.post<InterfaceFacture>(this.url+'GBL/approuverFacture',facture)
}

async getPrivateMessages(couple:PrivateMessage){
  return this.http.post<interfacePrivateMessage>(this.url+'GBL/getPrivateMessages',couple)
}

  test(){
    console.log('test');
    
  }
  async postFileGroup(groupName:string){
  return this.http.post(this.url+'GBL/createFileGroup',groupName)
  }
}


