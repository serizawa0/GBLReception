import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
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
import Project from '../classes/Project';
import ProjectType from '../classes/ProjectType';

@Injectable({
  providedIn: 'root'
})
export class LiaisonBackService {
  url = 'http://192.168.88.25:3000/'
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
    console.log(groupName);
    const data = {  data:groupName }
    return this.http.post(this.url+'GBL/createFileGroup',data)
  }
  async getProjectTypes(){
    return this.http.get<ProjectType[]>(this.url+'GBL/getProjectTypes')
  }
  async getProjects(){
    return this.http.get<Project[]>(this.url+'GBL/getProjects')
  }
  async postProject(typeId:number, client:string){
    const data = { typeId:typeId, client:client }
    return this.http.post<Project[]>(this.url+'GBL/createProject', data)
  }
  
}


