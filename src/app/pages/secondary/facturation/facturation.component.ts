import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartementsService } from '../../../services/departements.service';
import facture from '../../../classes/sousclasses/Facture';
import Utilisateur from '../../../classes/Utilisateur';

@Component({
  selector: 'app-facturation',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './facturation.component.html',
  styleUrl: './facturation.component.scss'
})
export class FacturationComponent implements AfterViewInit{
  @Input() categorie:string = ''
  @Input() demandeur:Utilisateur|null = null
  @ViewChild('dialogRef') dialogElement!:ElementRef
  @Output() canceled = new EventEmitter<void>()
  @Output() facture = new EventEmitter<facture>()
  users:Utilisateur[]
  private idCounter = 0;
  total = 0
  factureForm:FormGroup
  constructor(
    private fB:FormBuilder,
    private depS:DepartementsService
  ){
    this.users = []
    this.factureForm = this.fB.group({
      titre:'',
      elements:this.fB.array([]),
      demandant:''
    })
    this.ajoutLigne()
    this.depS.dataS.subscribe(data => {
      this.users = data
      console.log(this.users);
    })
    this.lignes.valueChanges.subscribe(() => {
      this.calculTotal()
    })
  }

  ngAfterViewInit(): void {
    // console.log(this.dialogElement);
    
  }

  get totalFacture():number{
    return 0
  }

  get lignes():FormArray{
    return this.factureForm.get('elements') as FormArray
  }

  trackById(index: number, group: AbstractControl): number {
    return group.get('id')?.value ?? index;
  }


  generateId(): number {
    this.idCounter ++
    return this.idCounter;
  }
  nouvelleLigne():FormGroup{
    return this.fB.group({
      id: this.generateId(),
      libelle:'',
      nombre:[1,[Validators.required, Validators.min(1)]],
      montant:new FormControl()
    })
  }
  ajoutLigne(){
    console.log(this.lignes.controls.map(ctrl => ctrl.get('id')?.value));
    this.lignes.push(this.nouvelleLigne())
  }
  retirerLigne(index:number){
    // console.log(index);
    this.lignes.removeAt(index)
  }
  calculTotal(){
    this.total = this.lignes.controls.reduce((acc, ligne) => {
      // const qte = ligne.get('quantite')?.value || 0;
      const montant = ligne.get('montant')?.value
      return acc + montant
    }, 0);
  }

  validerFacture(){
    console.log(this.factureForm.value);
    let demandeur = new Utilisateur(0,'',{idUserCat:0,nomCat:'',autorisation:0},this.categorie)
    if(this.demandeur){
      demandeur = this.demandeur
    }
    let tmp = 'en attente de validation'
    if(this.categorie!='simple'){
      tmp = "en attente d'approbation"
    }
    const fac = new facture(this.factureForm.get('titre')?.value, demandeur,this.factureForm.get('elements')?.value,this.categorie,tmp)
    console.log(fac);
    
    this.facture.emit(fac)
  }
  openFacturation(){
    this.dialogElement.nativeElement.style.display = 'block'
    // console.log(this.dialogElement);
    
  }
  closeFacturation(){
    this.dialogElement.nativeElement.style.display = 'none'
  }
  cancel(){
    this.canceled.emit()
  }
}
