import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-adminprojects',
  templateUrl: './adminprojects.component.html',
  styleUrls: ['./adminprojects.component.css']
})
export class AdminprojectsComponent implements OnInit{
  projectData: FormData = new FormData();
  files: File[] = [];
  project: AdminProjects = new AdminProjects();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: ProjectOwner[] = [];
  adminProjects: AdminProjects[] = [];
  categorie!: ProjectOwner;

  constructor(private router: Router,private projectService: AdminProjectsService , private categorieService:ProjectOwnerService) { }

  ngOnInit(): void {
 this.get();

  }
  get(){   this.categorieService.getAll().subscribe(
    (categories: ProjectOwner[]) => {
      this.categories = categories;
    },
    (error: any) => {
      console.error(error);
    }
  );
  this.projectService.getAll().subscribe(
    (adminProjects: AdminProjects[]) => {
      this.adminProjects = adminProjects;
    },
    (error: any) => {
      console.error(error);
    }
  );}
  onFileChange(event: any) {
    this.files = event.target.files;
  }
  selectedVideoUrl: string = '';
selectedThumbnail: string = '';

// onVideoChange(event: any) {
//   const videoFile = event.target.files[0];
//   this.projectData.append('video', videoFile);

//   // Récupérez l'URL de la vidéo en utilisant l'objet URL.createObjectURL
//   this.selectedVideoUrl = URL.createObjectURL(videoFile);
// }
selectedVideo: string | null = null;

onVideoChange(event: any) {
  const videoFile = event.target.files[0];
  this.projectData.append('video', videoFile);

  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.selectedVideo = e.target.result;
  };
  reader.readAsDataURL(videoFile);
}
thumbnails: string[] = []; // Tableau pour stocker les URL des miniatures générées





  addProject() {
    // Ajoutez les champs du projet à la FormData
    this.projectData.append('titre', this.project.titre);
    this.projectData.append('price', this.project.price.toString());
    this.projectData.append('technologies', this.project.technologies);
    this.projectData.append('description', this.project.description);
    this.projectData.append('projectOwnerId', String(this.selectedCategory));

    // Ajoutez le fichier vidéo à la FormData
    if (this.files.length > 0) {
      this.projectData.append('video', this.files[0]);
    }

    // Ajoutez les images à la FormData
    for (let i = 0; i < this.files.length; i++) {
      this.projectData.append('files', this.files[i]);
    }

    // Appelez le service pour ajouter le projet
    this.projectService.addProject(this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new AdminProjects();

        this.get();

      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }
  updateProject() {
   // Ajoutez les champs du projet à la FormData
   this.projectData.append('titre', this.project.titre);
   this.projectData.append('price', this.project.price.toString());
   this.projectData.append('technologies', this.project.technologies);
   this.projectData.append('description', this.project.description);
   this.projectData.append('projectOwnerId', String(this.selectedCategory));

   // Ajoutez le fichier vidéo à la FormData
   if (this.files.length > 0) {
     this.projectData.append('video', this.files[0]);
   }

   // Ajoutez les images à la FormData
   for (let i = 0; i < this.files.length; i++) {
     this.projectData.append('files', this.files[i]);
   }
    // Appelez le service pour mettre à jour le projet
    this.projectService.updateProject(this.id, this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet mis à jour avec succès', response);
      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de la mise à jour du projet', error);
      }
    );
  }
  id!: number;
  isEdit = false;
  submitted = false;

  onSubmit() {
    
    this.submitted = true;
    if (this.isEdit) {
      this.updateProject(); // Appelle la fonction pour la modification
    } else {
      this.addProject(); 
      // Appelle la fonction pour la création
    }
  }
  updateEvent(id: number){
    this.router.navigate(['admin/update-projects', id]);
  }
  clientProject(id: number){
    this.router.navigate(['admin/projectclients', id]);
  }
  editProjectOwner(id: number) {
    this.projectService.getById(id).subscribe(
      (response: AdminProjects) => {
        this.project = response;
        this.router.navigate(['admin/update-projects', id]);

        this.id = id;         // Stocke l'ID du projectOwner à modifier

        this.isEdit = true; // Met à jour le mode à "modification"
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  deleteEvents = (id: number) => {
    if (confirm('Are you sur?')) {
      this.projectService.deleteFood(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
        
      });
    }
  }
  getDecodedVideoUrl(videoUrl: string): string {
    return decodeURI(videoUrl);
  }
  
}
