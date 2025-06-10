import { Component, OnInit, Injector } from '@angular/core';
import Projet from '../../../classes/Projet';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewProjetComponent } from '../../formulaires/new-projet/new-projet.component';
import { NewSiteComponent } from '../../formulaires/new-site/new-site.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { DashboardComponent } from '../../../utilitaires/dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { PlanningComponent } from './planning/planning.component';
import { PreparationComponent } from './preparation/preparation.component';
import { TravauxComponent } from './travaux/travaux.component';

@Component({
  selector: 'app-projets',
  imports: [
    ReactiveFormsModule, DocumentsComponent, PlanningComponent, PreparationComponent, TravauxComponent
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent implements OnInit{
  today:Date = new Date()
  projetEnCours:Projet
  private overlayRef:OverlayRef|null = null
  constructor(
    private fb:FormBuilder,
    private overlay: Overlay,
    private injector: Injector
  ){
    this.projetEnCours = new Projet(0,'',new Date(),new Date())
    console.log(new Date(2025,this.today.getMonth()-1,0).getDate())
  }
  projets:Projet[] = [
  ]
  ngOnInit(): void {
    sessionStorage.clear()
  }



  //ne pas supprimer le reste en dessous
  // nexProject(projet:Projet){
  //   // console.log(projet);
  //   // projet.dates.push(projet.dateFin,projet.dateFin)
  //   this.projets.push(projet)
  // }
  // receptionnerMessage(message: string) {
  //   console.log('Message reçu de l’enfant :', message);
  // }
  // setProjet(projet:Projet){
  //   this.projetEnCours = projet
  //   this.openNewSite(projet)
  // }
  // openDialog(){
  //   const positionStrategy = this.overlay.position()
  //     .global()
  //     .centerHorizontally()
  //     .centerVertically();                

  //   this.overlayRef = this.overlay.create({
  //     hasBackdrop:true,
  //     backdropClass:'cdk-overlay-dark-backdrop',
  //     positionStrategy,
  //     scrollStrategy:this.overlay.scrollStrategies.block()
  //   })
  //   const portal = new ComponentPortal(NewProjetComponent)
  //   const componentRef = this.overlayRef.attach(portal)

  //   componentRef.instance.newProjet.subscribe((data)=>{
  //     this.nexProject(data)
  //     this.closeDialog()
  //   })
  //   componentRef.instance.canceled.subscribe((data)=>{
  //     this.closeDialog()
  //   })
  // }
  // closeDialog(){
  //   this.overlayRef?.dispose()
  //   this.overlayRef = null
  // }

  // openNewSite(projet:Projet){
  //   const positionStrategy = this.overlay.position()
  //     .global()
  //     .centerHorizontally()
  //     .centerVertically();                

  //   this.overlayRef = this.overlay.create({
  //     hasBackdrop:true,
  //     backdropClass:'cdk-overlay-dark-backdrop',
  //     positionStrategy,
  //     scrollStrategy:this.overlay.scrollStrategies.block()
  //   })
  //   const portal = new ComponentPortal(NewSiteComponent)
  //   const componentRef = this.overlayRef.attach(portal)
  //   componentRef.instance.projet =  projet
  //   componentRef.instance.site.subscribe(data=>{
  //     projet.sites.push(data)
  //     let exists = projet.dates.some(date =>
  //       date.getDate() === data.dateDebut.getDate() &&
  //       date.getMonth() === data.dateDebut.getMonth()
  //     );
  //     if(!exists){
  //       projet.dates.push(data.dateDebut)
  //     }
  //     exists = projet.dates.some(date =>
  //       date.getDate() === data.dateFin.getDate() &&
  //       date.getMonth() === data.dateFin.getMonth()
  //     );
  //     if(!exists){
  //       projet.dates.push(data.dateFin)
  //     }
  //     projet.tri()
  //     this.closeDialog()
  //   })
  //   componentRef.instance.canceled.subscribe(data=>{
  //     this.closeDialog()
  //   })
  // }

  //ne pas effacer la partie commentée supérieure

}
