import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-admin-addprojectowner',
  templateUrl: './admin-addprojectowner.component.html',
  styleUrls: ['./admin-addprojectowner.component.css']
})
export class AdminAddprojectownerComponent implements OnInit {
  project: ProjectOwner = new ProjectOwner();
  file: File | null = null;
  submitted = false;
  projectOwners: ProjectOwner[] = [];
  imagePreview: string | undefined;
  oldImagePreview: string | undefined;
  oldImage: File | null = null;

  constructor(private router: Router,private projectOwnerService: ProjectOwnerService) {}
  ngOnInit() {
    this.getAllProjectOwners();
  }

  getAllProjectOwners() {
    this.projectOwnerService.getAll().subscribe(
      (response: ProjectOwner[]) => {
        this.projectOwners = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  // onFileChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.file = inputElement.files[0];
  //   } 
  // }


  onFileChange(event: Event) {
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
  
  deleteEvents = (id: number) => {
    if (confirm('Are you sur?')) {
      this.projectOwnerService.deleteFood(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
        
      });
    }
  }
  save() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('nom', this.project.nom);
      formData.append('prenom', this.project.prenom);
      formData.append('numtel', this.project.numtel.toString());
      formData.append('email', this.project.email);

      this.projectOwnerService.create(formData).subscribe(
        (data) => {
          console.log(data);
          this.imagePreview = undefined;

          this.project = new ProjectOwner();
          this.file = null;
          this.router.navigate(['/admin/projectowner']);

        },
        (error) => console.log(error)
      );
    }
  }
  onSubmit() {
    
    this.submitted = true;
    if (this.isEdit) {
      this.onSubmitr(); // Appelle la fonction pour la modification
    } else {
      this.save(); 
      // Appelle la fonction pour la création
    }
  }
  
  id!: number;
  isEdit = false;

  editProjectOwner(id: number) {
    this.projectOwnerService.getById(id).subscribe(
      (response: ProjectOwner) => {
        this.project = response;
        this.id = id;         // Stocke l'ID du projectOwner à modifier

        this.oldImage = null; // Réinitialise l'ancienne image
        this.isEdit = true; // Met à jour le mode à "modification"
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  
      onSubmitr() {
        if (this.file) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('nom', this.project.nom);
          formData.append('prenom', this.project.prenom);
          formData.append('numtel', this.project.numtel.toString());
          formData.append('email', this.project.email);
          
          this.projectOwnerService.update(this.id, formData).subscribe(
            (response) => {
              console.log(response);
              this.project = new ProjectOwner();
              this.file = null;
              this.getAllProjectOwners();
             
              // Gérer la réponse du serveur
              // Effectuer d'autres actions si nécessaire
            },
            (error) => {
              console.error(error); // Gérer toute erreur qui se produit
            }
          );
        }
      }
      
    }




