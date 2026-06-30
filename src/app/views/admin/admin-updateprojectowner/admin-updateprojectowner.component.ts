import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-admin-updateprojectowner',
  templateUrl: './admin-updateprojectowner.component.html',
  styleUrls: ['./admin-updateprojectowner.component.css']
})
export class AdminUpdateprojectownerComponent implements OnInit {
  project: ProjectOwner = new ProjectOwner();
  file: File | null = null;
  submitted = false;
  projectOwners: ProjectOwner[] = [];
  imagePreview: string | undefined;
  oldImagePreview: string | undefined;
  oldImage: File | null = null;

  constructor(private route: ActivatedRoute,private router:Router ,private projectOwnerService: ProjectOwnerService) {}
  food!:ProjectOwner;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.projectOwnerService.getById(this.id).subscribe((food: ProjectOwner) => {
        this.food = food;
  
        // Check if the existing title is different from the new value
          // Pre-fill the form field with the existing project data
          this.project.prenom = this.food.prenom;
          this.project.nom = this.food.nom;

  
        // Pre-fill the other form fields with the existing project data
        this.project.email = this.food.email;
        this.project.numtel = this.food.numtel;
  
        
 // Définir l'URL de l'image existante
 this.imagePreview = 'assets/projectOwner/' + this.food.image;

 // Définir la valeur de selectedFile à null pour ne pas afficher le nom du fichier
 this.selectedFile != null;
  
       
      });
    });  }

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

  previousImage!: string; // Ajoutez une variable pour stocker l'ancienne image

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
    } else {
      // Si aucune nouvelle image n'est sélectionnée, utilisez l'ancienne image
      this.imagePreview = this.previousImage;
    }
  }
  selectedFile!: File;

  onFileSelectedz(event: any) {
    this.selectedFile = event.target.files[0];
    this.imagePreview != null;

    const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(this.selectedFile);
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
          this.getAllProjectOwners();

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
          const formData = new FormData();
          if (this.selectedFile) {
            // Le fichier a été modifié, ajoutez-le à FormData
            formData.append('file', this.selectedFile);
          } else {
            // Le fichier n'a pas été modifié, ajoutez l'URL de l'image existante à FormData
            formData.append('image', this.food.image);
          }
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
              this.router.navigate(['/admin/projectowner']);

              // Gérer la réponse du serveur
              // Effectuer d'autres actions si nécessaire
            },
            (error) => {
              console.error(error); // Gérer toute erreur qui se produit
            }
          );
        }
      
      
    }

