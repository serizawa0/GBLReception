import { Injectable } from '@angular/core';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(
    private logService:LogService
  ) { }
  
  setBinary(dec:number){
    const binary = dec.toString(2).padStart(2,'0')
    return binary
  }
  checkAutorisation(num:number){
    const autorisation = this.logService.utilisateurEnCours?.cat.autorisation
    if(autorisation){
      const val = this.setBinary(autorisation)
      if(val[num] == '1'){
        return true
      }
    }
    return false
  }
}
