import { Component } from '@angular/core';
import { ProjetsComponent } from '../projets/projets.component';

@Component({
  selector: 'app-project-section',
  imports: [ProjetsComponent],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent {
  projets = [1]
}
