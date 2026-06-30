import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { ProjectClient } from 'src/app/Models/ProjectClient';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-admin-project-client',
  templateUrl: './admin-project-client.component.html',
  styleUrls: ['./admin-project-client.component.css']
})
export class AdminProjectClientComponent implements OnInit{
  projectClients: ProjectClient[] = [];
  adminProjectId: ProjectClient[] = [];
  constructor(   private route: ActivatedRoute,private projectService: AdminProjectsService , private categorieService:ProjectOwnerService) { }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.projectService.getProjectClientsByAdminProjectId(id).subscribe(
        (event: ProjectClient[]) => {
          this.adminProjectId = event;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  adminProjectIdx!: number;

  removeRelation(projectClientId: number): void {
    if (confirm('Are you sure?')) {
      const id = this.route.snapshot.params['id'];
  
      this.projectService.removeRelation(id, projectClientId)
        .subscribe((projectClient: ProjectClient) => {
          // Handle successful removal here
          // For example, remove the projectClient from the projectClients array
          this.projectClients = this.projectClients.filter(pc => pc.id !== projectClient.id);
          window.location.reload(); // Reload the page after successful removal
        }, (error: any) => {
          console.error(error);
          // Handle error case here
        });
    }
  }
  
}
