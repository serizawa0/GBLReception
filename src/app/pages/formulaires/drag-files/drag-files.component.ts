import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drag-files',
  imports: [],
  templateUrl: './drag-files.component.html',
  styleUrl: './drag-files.component.scss'
})
export class DragFilesComponent {
  @Output() Fichiers = new EventEmitter<File[]>()
  files: File[] = [];
  isHovering = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovering = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  private addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      this.files.push(fileList.item(i)!);
    }
    // console.log(this.files);
    
    // this.Fichiers.emit(this.files)
  }
  valider(){
    this.Fichiers.emit(this.files)
  }
}
