import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-admin-projectowner',
  templateUrl: './admin-projectowner.component.html',
  styleUrls: ['./admin-projectowner.component.css']
})
export class AdminProjectownerComponent implements OnInit {
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
  selectedStatus: string = '';
  complaints: ProjectOwner[] = [];
  adminProjectId: ProjectOwner[] = [];

  onStatusChange() {
    if (this.selectedStatus === '') {
this.getAllProjectOwners();    } else {
      const status = this.selectedStatus === 'true';
      this.projectOwnerService.getComplaintsByStatus(status).subscribe(
        (complaints) => {
          this.projectOwners = complaints;
        },
        (error) => {
          console.error('Error filtering complaints by status', error);
        }
      );
    }
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
      updateEvent(id: number){
        this.router.navigate(['admin/update-projectowner', id]);
      }  
      @Input() claims!: ProjectOwner;

      updateComplaintAndSendEmail(complaint: ProjectOwner) {
        this.isUpdating = true;
        this.projectOwnerService.updateComplaint(complaint.id, true).subscribe(
          () => {
            console.log('Complaint updated successfully');
            complaint.status = true;
            this.isUpdating = false;
            this.getAllProjectOwners();
    
          },
          (error) => {
            console.error('Error updating complaint', error);
            this.isUpdating = false;
          }
        );
      }
      isUpdating = false;
      
      onCheckboxClick(event: Event) {
        const target = event.target as HTMLInputElement;
        const label = target.nextElementSibling as HTMLLabelElement;
    
        label.textContent = target.checked ? '' : '';
      }
    }

