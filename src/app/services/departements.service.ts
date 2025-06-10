import { Injectable } from '@angular/core';
import facture from '../classes/sousclasses/Facture';
import Utilisateur from '../classes/Utilisateur';
import { BehaviorSubject } from 'rxjs';
import { LiaisonBackService } from '../backService/liaison-back.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {
  utilisateurs:Utilisateur[]
  private dataSource = new BehaviorSubject<Utilisateur[]>([])
  private facturedataSource = new BehaviorSubject<facture[]>([])
  public factureDataS = this.facturedataSource.asObservable()
  public dataS = this.dataSource.asObservable()

  factures:facture[]
  constructor(
    private liaisonService:LiaisonBackService
  ) {
    this.utilisateurs = []
    this.factures = []
  }
  async newFacture(facture:facture){  
    // let factures = this.facturedataSource.value
    // factures.push(facture)
    // this.facturedataSource.next(factures)
    (await this.liaisonService.postFacture(facture)).subscribe(value=> {
      this.facturedataSource.next(value.data)
    })
    return true;
    
    // this.facturedataSource.next(facture)
  }

  async validateFacture(facture:facture){
    (await this.liaisonService.validerfacture(facture)).subscribe(value=> {
      this.facturedataSource.next(value.data)
    }
      
    )
  }
  async approveFacture(facture:facture){
    (await this.liaisonService.approuverfacture(facture)).subscribe(value=> {
      this.facturedataSource.next(value.data)
    }
      
    )
  }
  async getFactures(){
    // await 
  }

  async setUsers(users:Utilisateur[]){
    this.utilisateurs = users
    this.dataSource.next(users)
    return true
  }



  async setFactures(factures:facture[]){
    this.facturedataSource.next(factures)
    return true
  }
}
