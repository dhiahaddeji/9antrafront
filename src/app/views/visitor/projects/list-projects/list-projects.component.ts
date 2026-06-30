import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit{
  projectData: FormData = new FormData();
  files: File[] = [];
  project: AdminProjects = new AdminProjects();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: ProjectOwner[] = [];
  adminProjects: AdminProjects[] = [];

  constructor(private projectService: AdminProjectsService ,private router: Router ,private categorieService:ProjectOwnerService) { }
  
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
  toggleDescription(event:any) {
    event.preventDefault();
    const description = event.target.parentNode;
    description.classList.toggle('expanded');
  }
  
  showEventDetails(id: number) {
    this.router.navigate(['/project-details', id]);
  }
  
  
}
