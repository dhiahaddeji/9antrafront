import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-update-projects',
  templateUrl: './update-projects.component.html',
  styleUrls: ['./update-projects.component.css']
})
export class UpdateProjectsComponent implements OnInit{
  projectData: FormData = new FormData();
  files: File[] = [];
  project: AdminProjects = new AdminProjects();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: ProjectOwner[] = [];
  adminProjects: AdminProjects[] = [];
food!:AdminProjects;
title!: string;
price!: number;
description!: string;
video!: string;
projectForm!: FormGroup;

  constructor(private router: Router,private sanitizer: DomSanitizer,
    private route: ActivatedRoute,private projectService: AdminProjectsService , private categorieService:ProjectOwnerService ) {
     
     }
  setSelectedCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }
  

ngOnInit() {
  this.get();
  this.categorieService.getById(this.id).subscribe(
    (categories: ProjectOwner[]) => {
      this.categories = categories;
    },
    (error: any) => {
      console.error(error);
    }
  );

  this.route.params.subscribe(params => {
    this.id = +params['id'];
    this.projectService.getById(this.id).subscribe((food: AdminProjects) => {
      this.food = food;

      // Check if the existing title is different from the new value
      if (this.project.titre !== this.food.titre) {
        // Pre-fill the form field with the existing project data
        this.project.titre = this.food.titre;
      }

      // Pre-fill the other form fields with the existing project data
      this.project.price = this.food.price;
      this.project.description = this.food.description;
      this.project.technologies = this.food.technologies;

      // Clear the thumbnails array
      this.thumbnails = [];
      
      // Set the URL of the existing video
      this.selectedVideoUrl = 'assets/adminProjects/' + this.food.video;
      this.project.video = this.food.video;
      
      // Pre-fill the multiple images array
      this.food.image.split(',').forEach(image => {
        // Assuming 'image' is the property in 'AdminProjects' class representing the image URLs
        this.thumbnails.push('assets/adminProjects/' + food.titre + '_' + food.id + '/' + image.trim());
      });

      const matchingCategory = this.categories.find(category => category.nom === this.food.name);
      if (matchingCategory) {
        this.selectedCategory = matchingCategory.id.toString();
      }
    });
  });
}


gotoList() {
  this.router.navigate(['/admin/projects']);
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
  const newFiles = event.target.files;
  if (newFiles && newFiles.length > 0) {
    this.files = Array.from(newFiles); // Convert the FileList to an array
    this.thumbnails = []; // Clear the existing thumbnails array

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const thumbnailUrl = e.target.result;
        this.thumbnails.push(thumbnailUrl);
      };

      reader.readAsDataURL(file);
    }
  }
}


selectedVideoUrl: string = '';
selectedThumbnail: string = '';
selectedImageIndex: number = 0; // Update the type to number

selectImage(index: number) {
  this.selectedImageIndex = index;
}
i: number = 0;

onFileChange2(event: any) {
  const newFiles = event.target.files;
  if (newFiles && newFiles.length > 0) {
    const file = newFiles[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const thumbnailUrl = e.target.result;
      if (this.selectedImageIndex !== -1) {
        this.thumbnails[this.selectedImageIndex] = thumbnailUrl;
      }
    };

    reader.readAsDataURL(file);
  }
}



selectedVideo: string | null = null;
onVideoChange(event: any) {
  const videoFiles = event.target.files;
  if (videoFiles && videoFiles.length > 0) {
    const videoFile = videoFiles[0];
    this.projectData.delete('video'); // Remove the previous video file from FormData
    this.projectData.append('video', videoFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedVideo = e.target.result;

      // Update the video preview
      const videoElement = document.getElementById('videoPreview') as HTMLVideoElement;
      videoElement.src = URL.createObjectURL(videoFile);
      videoElement.load();
    };
    reader.readAsDataURL(videoFile);
  }
}

thumbnails: string[] = []; // Tableau pour stocker les URL des miniatures générées






updateProject() {
  // Ajoutez les champs du projet à la FormData
  this.projectData.append('titre', this.project.titre);
  this.projectData.append('price', this.project.price.toString());
  this.projectData.append('technologies', this.project.technologies);
  this.projectData.append('description', this.project.description);
  this.projectData.append('projectOwnerId', String(this.selectedCategory));

  // Vérifiez si un fichier vidéo a été sélectionné
  if (this.files.length > 0) {
    const file = this.files[0]; // Récupérez le fichier vidéo depuis votre tableau de fichiers

    // Vérifiez si le fichier est une vidéo
    if (file.type === 'video/mp4') {
      const videoFile = new File([file], file.name, { type: 'video/mp4' });
      this.projectData.append('video', videoFile);
    }
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
      this.router.navigate(['/admin/projects']);
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

 
  editProjectOwner(id: number) {
    this.projectService.getById(id).subscribe(
      (response: AdminProjects) => {
        this.project = response;
        this.id = id;         // Stocke l'ID du projectOwner à modifier

        this.isEdit = true; // Met à jour le mode à "modification"
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
 
 
  
}
