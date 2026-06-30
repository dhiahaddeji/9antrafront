import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { Company } from 'src/app/Models/Company';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{
  constructor(private router: Router,private projectService: OffersService , private categorieService:CompanyService) {}

  ngOnInit(): void {
    this.categorieService.getAllByS().subscribe(
      (categories: Company[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
      }
    );
  }
  
  projectData: FormData = new FormData();
  project: Offers = new Offers();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: Company[] = [];


  addOffer() {
    // Ajoutez les champs du projet à la FormData
    this.projectData.append('poste', this.project.poste);
    this.projectData.append('skills', this.project.skills);
    this.projectData.append('description', this.project.description);
    this.projectData.append('experience', this.project.experience);
    this.projectData.append('type', this.project.type);
    this.projectData.append('education', this.project.education);

    this.projectData.append('companyId', String(this.selectedCategory));

  
    // Appelez le service pour ajouter le projet
    this.projectService.addOffer(this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new Offers();
         this.router.navigate(['/admin/list-offer']);


      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }

}
