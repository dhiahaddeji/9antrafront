import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectClient } from 'src/app/Models/ProjectClient';

@Component({
  selector: 'app-admin-allprojectclients',
  templateUrl: './admin-allprojectclients.component.html',
  styleUrls: ['./admin-allprojectclients.component.css']
})
export class AdminAllprojectclientsComponent   implements OnInit{
   projectClients: ProjectClient[] = [];
adminProjectId: ProjectClient[] = [];
constructor(   private route: ActivatedRoute,private projectService: AdminProjectsService , private categorieService:ProjectOwnerService) { }
aa : AdminProjects[] =[];
 ngOnInit(): void {
    this.getAllProjectClients();
    this.getClaimsBySortOrder(this.selectedSortOrder);
    this.fetchAllProjects();

  }
  fetchAllProjects(): void {
    this.projectService.getAll().subscribe(
      (projects: AdminProjects[]) => {
        this.aa = projects;
      },
      (error: any) => {
        // Handle error
      }
    );
  }
   getAllProjectClients(): void {
    this.projectService.getAllC().subscribe(
      (projectClients: ProjectClient[]) => {
        this.adminProjectId = projectClients;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  @Input() claims!: ProjectClient;

  updateComplaintAndSendEmail(complaint: ProjectClient) {
    this.isUpdating = true;
    this.projectService.updateComplaint(complaint.id, true).subscribe(
      () => {
        console.log('Complaint updated successfully');
        complaint.status = true;
        this.isUpdating = false;
        this.getAllProjectClients();

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
  selectedStatus: string = '';
  complaints: ProjectClient[] = [];

  onStatusChange() {
    if (this.selectedStatus === '') {
this.getAllProjectClients();    } else {
      const status = this.selectedStatus === 'true';
      this.projectService.getComplaintsByStatus(status).subscribe(
        (complaints) => {
          this.adminProjectId = complaints;
        },
        (error) => {
          console.error('Error filtering complaints by status', error);
        }
      );
    }
  }
  getClaimsByAscendingDate() {
    this.projectService.getClaimsSortedByDate('asc')
      .subscribe(claims => {
        this.adminProjectId = claims;
      });
  }
  getClaimsByDescendingDate() {
    this.projectService.getClaimsSortedByDate('desc')
      .subscribe(claims => {
        this.adminProjectId = claims;
      });
  }
  selectedSortOrder: string = 'asc';
  getClaimsBySortOrder(sortOrder: string) {
    this.projectService.getClaimsSortedByDate(sortOrder)
      .subscribe(claims => {
        this.adminProjectId = claims;
      });
  }

  onSortOrderChange() {
    this.getClaimsBySortOrder(this.selectedSortOrder);
  }
  selectedProjectId!: number;

  onAdminChange() {
    // Call the API to fetch the filtered project clients based on the selected project ID
    if (this.selectedProjectId) {
      this.fetchProjectClients(this.selectedProjectId);
    } else {
      // If no project is selected, fetch all project clients
      this.getAllProjectClients();
    }
  }
  
  fetchProjectClients(projectId: number) {
    this.projectService.getProjectClients(projectId).subscribe(
      (projectClients: ProjectClient[]) => {
        this.adminProjectId = projectClients;
      },
      (error: any) => {
        // Handle error
      }
    );
  }
  
  fetchAllProjectClients() {
    this.projectService.getAllC().subscribe(
      (projectClients: ProjectClient[]) => {
        this.adminProjectId = projectClients;
      },
      (error: any) => {
        // Handle error
      }
    );
  }
  
  
  
  
    
}
