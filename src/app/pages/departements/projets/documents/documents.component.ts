import { Component } from '@angular/core';
import DossierCat from '../../../../classes/sousclasses/DossierCat';
import FichierGroup from '../../../../classes/sousclasses/FichierGroup';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DragFilesComponent } from '../../../formulaires/drag-files/drag-files.component';
import { LiaisonBackService } from '../../../../backService/liaison-back.service';

@Component({
  selector: 'app-documents',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  groupForm:FormGroup
  groupFormState:boolean = false
  groupesFichiers:FichierGroup[] = []
  categories:DossierCat[] = [
    { id:0,nomCat:'Permis de travail' }, { id:1,nomCat:'RAMS' }, { id:2, nomCat:'Ordre de mission' }
  ] 
  liens:string[]  = []
  private overlayRef:OverlayRef|null = null
  constructor(
    private fB:FormBuilder,
    private overlay:Overlay,
    private liaisonBack:LiaisonBackService
  ){
    this.groupForm = this.fB.group({
      nomGroup:''
    })
  }
  resetForm(){
    this.groupForm.get('nomGroup')?.setValue('')
  }
  openForm(){
    this.resetForm()
    this.groupFormState = !this.groupFormState
  }
  closeForm(){
    this.groupFormState  = false
  }
  addGroup(){
    const formValue  = this.groupForm.get('nomGroup')?.value
    if(formValue){
      const newGroup= new FichierGroup(formValue)
    // console.log(newGroup);
      this.liaisonBack.postFileGroup(newGroup.nomGroup).then(data => data.subscribe(
      element => {
        console.log(element);
      }
    ))
    // this.groupesFichiers.push(newGroup)
    }
    this.openForm()
  }
  openDragFiles(groupe:FichierGroup){
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
    const portal = new ComponentPortal(DragFilesComponent)
    const componentRef = this.overlayRef.attach(portal)
    componentRef.instance.Fichiers.subscribe(data => {
      groupe.fichiers = data
      // console.log(data);
      this.closeDialog()
      
    })
    this.overlayRef.backdropClick().subscribe(()=>{
      this.closeDialog()
    })
  }
  closeDialog(){
    this.overlayRef?.dispose()
    this.overlayRef = null
  }
}
