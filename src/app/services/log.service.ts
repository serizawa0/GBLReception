import { Injectable } from '@angular/core';
import User from '../classes/User';
import Utilisateur from '../classes/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  user:User
  utilisateurEnCours:Utilisateur
  constructor() {
    this.user = new User()
    this.utilisateurEnCours = new Utilisateur(0,'',{idUserCat:0,autorisation:0,nomCat:''},'')
  }
  async setUser(user:User){
    this.user = user
    return true
  }

  async setUserEnCours(utilisateur:Utilisateur){
    this.utilisateurEnCours = utilisateur
    // console.log(this.utilisateurEnCours);
    return true
  }
}
