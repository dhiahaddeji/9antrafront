import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpecificProjectService } from 'src/app/MesServices/SpecificProjects/specific-project.service';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Component({
  selector: 'app-specificproject',
  templateUrl: './specificproject.component.html',
  styleUrls: ['./specificproject.component.css']
})
export class SpecificprojectComponent {
  projectData: FormData = new FormData();
  selectedVideo: string | null = null;
  formSubmitted: boolean = false;

constructor(private sp :SpecificProjectService, private router: Router){}
  onVideoChange(event: any) {
    const videoFile = event.target.files[0];
    this.projectData.append('video', videoFile);
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedVideo = e.target.result;
    };
    reader.readAsDataURL(videoFile);
  }
  files: File[] = [];
  thumbnails: string[] = []; // Tableau pour stocker les URL des miniatures générées
  onFileChange4(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      // Générer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    } 
  }
  onFileChange(event: any) {
    this.files = event.target.files;
    const files = event.target.files;
    this.thumbnails = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnails.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
  project: SpecificProject = new SpecificProject();
  file: File | null = null;
  selectedFile!: File;
  selectedFiles!: File;
  imagePreview: string | undefined;
  successMessage: string = '';
  errorMessage: string = '';

  showSuccessModal: boolean = false;
  addProject() {
      // Ajoutez les champs du projet à la FormData
    this.projectData.append('titre', this.project.titre);
    this.projectData.append('price', this.project.price.toString());
    this.projectData.append('technologies', this.project.technologies);
    this.projectData.append('description', this.project.description);
    this.projectData.append('nom', this.project.nom);
    this.projectData.append('prenom', this.project.prenom);
    this.projectData.append('email', this.project.email);
    this.projectData.append('numtel', this.project.numtel.toString());
    this.projectData.append('remark', this.project.remark);
    this.projectData.append('linkedin', this.project.linkedin);
    this.projectData.append('github', this.project.github);

    

    // Ajoutez le fichier vidéo à la FormData
    if (this.files.length > 0) {
      this.projectData.append('video', this.files[0]);
    }

    // Ajoutez les images à la FormData
    for (let i = 0; i < this.files.length; i++) {
      this.projectData.append('files', this.files[i]);
    }

    // Appelez le service pour ajouter le projet
    this.sp.addProject(this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new SpecificProject();
        this.formSubmitted = true;
       

      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }
  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/project']);
  }}
