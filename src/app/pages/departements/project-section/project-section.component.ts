import { Component } from '@angular/core';
import { ProjetsComponent } from '../projets/projets.component';
import Project from '../../../classes/Project';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import ProjectType from '../../../classes/ProjectType';
import { LiaisonBackService } from '../../../backService/liaison-back.service';

@Component({
  selector: 'app-project-section',
  imports: [
    ProjetsComponent, ReactiveFormsModule
  ],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent {
  projectTypes:ProjectType[] = []
  formProject:FormGroup
  cpt = 0
  projets:Project[] = []
  constructor(
    private formB:FormBuilder,
    private liaisonBS:LiaisonBackService
  ){
    this.formProject = this.formB.group({
      type:''
    })
    this.liaisonBS.getProjectTypes().then( data => data.subscribe(element=> {
      this.projectTypes = element
    }))
  }
  newProject(type:number){
    this.liaisonBS.postProject(type,'HELIOS').then(data => data.subscribe(element => {
      this.projets = element
    }))
  }
  changeOnSelect(){
    const choice = this.formProject.get('type')?.value
    if(choice){
      this.newProject(choice)
    }
  }
}
