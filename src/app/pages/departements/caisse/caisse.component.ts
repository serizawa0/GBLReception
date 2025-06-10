import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DepartementsService } from '../../../services/departements.service';
import facture from '../../../classes/sousclasses/Facture';
import Utilisateur from '../../../classes/Utilisateur';
import { LiaisonBackService } from '../../../backService/liaison-back.service';
import { FacturationComponent } from '../../secondary/facturation/facturation.component';
import { SocketService } from '../../../backService/socket.service';
import { AutorisationService } from '../../../autorisations/autorisation.service';
import { DatePipe } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LogService } from '../../../services/log.service';
import { FacturationCardComponent } from '../../../utilitaires/facturation-card/facturation-card.component';

@Component({
  selector: 'app-caisse',
  imports: [
    DatePipe
  ],
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.scss'
})
export class CaisseComponent implements OnInit {
  categorie = 'simple'
  @ViewChild('facturation') facturation!:FacturationComponent
  users:Utilisateur[]
  factures:facture[]
  facturesEnAttenteSimple:facture[]
  facturesEnAttenteApprouvee:facture[]
  facturesValides:facture[]
  facturesEnAttenteApprobation:facture[]
  private overlayRef:OverlayRef|null = null
  constructor(
    private depS:DepartementsService,
    private liaisonS:LiaisonBackService,
    private socketService:SocketService,
    private autorisationService:AutorisationService,
    private overlay: Overlay,
    private injector: Injector,
    private logS:LogService
  ){
    
    this.users = []
    this.facturesEnAttenteSimple = []
    this.facturesEnAttenteApprouvee = []
    this.facturesValides = []
    this.facturesEnAttenteApprobation = []
    this.depS.dataS.subscribe(data => {
      this.users = data
      // console.log(this.users);
    })
    this.factures = []
    this.liaisonS.getFactures().then(data => data.subscribe(element=>{
      this.depS.setFactures(element.data).then(t=>{
        this.depS.factureDataS.subscribe(data=> {
          console.log(data);
          
          this.factures = data
          this.diviserFActures()
          // this.facturesEnAttente = this.factures.filter(data => data.state == 'en attente')
          // this.facturesValides = this.factures.filter(data => data.state == 'valide')
        })
      })
    }))
    const dec = 1
    const decBin = dec.toString(2).padStart(2,'0')
    console.log(dec+' '+decBin+' '+decBin[1]);
    
  }
  ngOnInit(): void {
    sessionStorage.clear()
    this.socketService.onNewDemandeCaisse().subscribe(
      data => {
        this.factures = data
        this.diviserFActures()
      }
    )
  }

  diviserFActures(){
    this.facturesEnAttenteSimple = this.factures.filter(data => (data.state == 'en attente de validation')&&(data.categorie == 'simple'))
    this.facturesEnAttenteApprouvee = this.factures.filter(data => (data.state == 'en attente de validation')&&(data.categorie == 'approbation'))
    this.facturesValides = this.factures.filter(data => data.state == 'validée')
    this.facturesEnAttenteApprobation = this.factures.filter(data => data.state == "en attente d'approbation")
  }

  validerFacture(facture:facture){
    this.depS.validateFacture(facture).then(data => {
      console.log(data);
    })
  }
  approuverFacture(facture:facture){
    this.depS.approveFacture(facture).then(data => {
      console.log(data);
    })
  }
  openFacturationDialog(){
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();                

    this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      backdropClass:'cdk-overlay-dark-backdrop',
      positionStrategy,
      scrollStrategy:this.overlay.scrollStrategies.block()
    })
    const portal = new ComponentPortal(FacturationComponent)
    const componentRef = this.overlayRef.attach(portal)
    componentRef.instance.categorie = this.categorie
    componentRef.instance.demandeur = this.logS.utilisateurEnCours
    componentRef.instance.canceled.subscribe(data=>{
      this.closeDialog()
    })
    componentRef.instance.facture.subscribe(data=>{
      this.depS.newFacture(data)
      this.closeDialog()
    })
    this.overlayRef.backdropClick().subscribe(()=> {
      this.closeDialog()
    })

    // this.facturation.openFacturation()
  }

  openDetails(facture:facture){
    console.log(facture);
    
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();                

    this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      backdropClass:'cdk-overlay-dark-backdrop',
      positionStrategy,
      scrollStrategy:this.overlay.scrollStrategies.block()
    })
    const portal = new ComponentPortal(FacturationCardComponent)
    const componentRef = this.overlayRef.attach(portal)
    componentRef.instance.facture = facture
    componentRef.instance.closed.subscribe(data => {
      this.closeDialog()
    })
    this.overlayRef.backdropClick().subscribe(()=>{
      this.closeDialog()
    })
  }

  demandeSimple(){
    this.categorie= 'simple'
    this.openFacturationDialog()
  }
  demandeApprobation(){
    this.categorie = 'approbation'
    this.openFacturationDialog()
  }
  checkAutorisation(num:number){
    return this.autorisationService.checkAutorisation(num)
  }

  closeDialog(){
    this.overlayRef?.dispose()
    this.overlayRef = null
  }
}
