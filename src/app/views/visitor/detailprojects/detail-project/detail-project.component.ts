import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectClient } from 'src/app/Models/ProjectClient';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit{
  project: AdminProjects = new AdminProjects();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: ProjectOwner[] = [];
  projectClient: ProjectClient = new ProjectClient(); // New instance of ProjectClient

  constructor(
    private route: ActivatedRoute,
    private projectService: AdminProjectsService,
    private router: Router,
    private categorieService: ProjectOwnerService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    // this.get(projectId);
    this.get(projectId);
  }
  adminProjects: AdminProjects[] = [];

  get(projectId: number): void {
   
    this.projectService.getById(projectId).subscribe(
      (project: AdminProjects) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 showLoginSection: boolean = false;

 isSubmitted = false;
 showPError: boolean = false;
 showLError: boolean = false;

 showEmailError: boolean = false;
 showNomError: boolean = false;
 formSubmitted: boolean = false;
 showUpdateLink: boolean = false;
  ownerImageUrl!: string;
  addProjectClient(): void {
    this.formSubmitted = true; // Set form submission flag to true
    if (this.projectClient.email && this.projectClient.nom) {

    const adminProjectId = this.project.id;
    this.projectService.addProjectClient(this.projectClient, adminProjectId).subscribe(
      (response: ProjectClient) => {
        // Ajout réussi, effectuez les actions nécessaires (redirection, message, etc.)
        console.log('ProjectClient ajouté avec succès', response);
        // Réinitialisez le formulaire ou les propriétés nécessaires
        this.projectClient = new ProjectClient();
      
         this.isSubmitted = true;

      },
      (error: any) => {
        // Gestion des erreurs, affichez un message d'erreur ou effectuez les actions nécessaires
        console.error('Erreur lors de l\'ajout du ProjectClient', error);
      }
    );
  } }
  
  }