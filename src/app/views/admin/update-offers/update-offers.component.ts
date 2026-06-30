import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { Company } from 'src/app/Models/Company';
import { Offers } from 'src/app/Models/Offers';
@Component({
  selector: 'app-update-offers',
  templateUrl: './update-offers.component.html',
  styleUrls: ['./update-offers.component.css']
})
export class UpdateOffersComponent implements OnInit{
  constructor(private router: Router,private sanitizer: DomSanitizer,
    private route: ActivatedRoute,private projectService: OffersService , private categorieService:CompanyService ) {
     
    }
    id!: number;
    categories: Company[] = [];
    food!:Offers;
    project: Offers = new Offers();
      
    selectedCategory!: string; // Assuming categoryId is of type string


      ngOnInit() {
    this.get();
    this.categorieService.getById(this.id).subscribe(
      (categories: Company[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error(error);
      }
    );
  
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.projectService.getById(this.id).subscribe((food: Offers) => {
        this.food = food;
  
        // Check if the existing title is different from the new value
        if (this.project.poste !== this.food.poste) {
          // Pre-fill the form field with the existing project data
          this.project.poste = this.food.poste;
        }
  
        // Pre-fill the other form fields with the existing project data
        this.project.skills = this.food.skills;
        this.project.description = this.food.description;
        this.project.experience = this.food.experience;
        this.project.education = this.food.education;
        this.project.type = this.food.type;

       
       
    
  
        const matchingCategory = this.categories.find(category => category.nom === this.food.nom);
        if (matchingCategory) {
          this.selectedCategory = matchingCategory.id.toString();
        }
      });
    });
  }
  adminProjects: Offers[] = [];
  
  get(){   this.categorieService.getAll().subscribe(
    (categories: Company[]) => {
      this.categories = categories;
    },
    (error: any) => {
      console.error(error);
    }
  );
  this.projectService.getAll().subscribe(
    (adminProjects: Offers[]) => {
      this.adminProjects = adminProjects;
    },
    (error: any) => {
      console.error(error);
    }
  );}
  projectData: FormData = new FormData();

updateProject() {
  // Ajoutez les champs du projet à la FormData
  this.projectData.append('poste', this.project.poste);
  this.projectData.append('skills', this.project.skills);
  this.projectData.append('description', this.project.description);
  this.projectData.append('experience', this.project.experience);
  this.projectData.append('type', this.project.type);
  this.projectData.append('education', this.project.education);

  this.projectData.append('companyId', String(this.selectedCategory));



  this.projectService.updateProject(this.id, this.projectData).subscribe(
    response => {
      // Réponse réussie, effectuez les actions nécessaires
      console.log('Projet mis à jour avec succès', response);
      this.router.navigate(['/admin/list-offer']);
    },
    error => {
      // Gérez les erreurs
      console.error('Erreur lors de la mise à jour du projet', error);
    }
  );

  // Appelez le service pour mettre à jour le projet

}

  
}
