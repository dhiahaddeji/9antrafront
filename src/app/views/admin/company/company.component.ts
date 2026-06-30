import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  constructor(private sp:CompanyService , private router: Router){}
  ngOnInit(): void {
    this.get();
   
     }
     adminProjects: Company[] = [];

     get(){  
    this.sp.getAll().subscribe(
      (adminProjects: Company[]) => {
        this.adminProjects = adminProjects;
      },
      (error: any) => {
        console.error(error);
      }
    );}
    deleteEvents = (id: number) => {
      if (confirm('Are you sur?')) {
        this.sp.deleteFood(id).subscribe(() => {
          // Recharge la page après la suppression
          window.location.reload();
          
        });
      }
    }
    updateStatus(project: any) {
      // Effectuez ici votre logique de mise à jour du statut
      if (project.status === true) {
        project.status = false;
      } else {
        project.status = true;
      }
      
      // Appelez ici votre fonction ou API pour mettre à jour le statut dans la base de données
      this.sp.updateComplaint(project.id, project.status)
        .subscribe(
          () => {
            // Mise à jour réussie, effectuez les actions nécessaires
            console.log('Statut mis à jour avec succès !');
          },
          (error) => {
            // Gestion de l'erreur lors de la mise à jour du statut
            console.error('Erreur lors de la mise à jour du statut :', error);
          }
        );
    }
    
    
    updateComplaintAndSendEmail(project: Company) {
      this.isUpdating = true;
      const newStatus = !project.status; // Inversion du statut actuel
    
      this.sp.updateComplaint(project.id, newStatus).subscribe(
        () => {
          console.log('Complaint updated successfully');
          project.status = newStatus;
          this.isUpdating = false;
          this.get();
        },
        (error) => {
          console.error('Error updating complaint', error);
          this.isUpdating = false;
        }
      );
    }
    
    
    
    isUpdating = false;
    isUpdatingw = true;

    onCheckboxClick(event: Event) {
      const target = event.target as HTMLInputElement;
      const label = target.nextElementSibling as HTMLLabelElement;
  
      label.textContent = target.checked ? '' : '';
    }
    selectedStatus: string = '';

    onStatusChange() {
      if (this.selectedStatus === '') {
  this.get();    } else {
        const status = this.selectedStatus === 'true';
        this.sp.getComplaintsByStatus(status).subscribe(
          (complaints) => {
            this.adminProjects = complaints;
          },
          (error) => {
            console.error('Error filtering complaints by status', error);
          }
        );
      }
    }
    updateEvent(id: number){
      this.router.navigate(['admin/update-company', id]);
    }  
    selectedSortOrder: string = 'asc';
    getClaimsBySortOrder(sortOrder: string) {
      this.sp.getClaimsSortedByDate(sortOrder)
        .subscribe(claims => {
          this.adminProjects = claims;
        });
    }
    onSortOrderChange() {
      this.getClaimsBySortOrder(this.selectedSortOrder);
    }
}
