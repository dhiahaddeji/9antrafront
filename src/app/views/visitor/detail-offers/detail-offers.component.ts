import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { OfferClient } from 'src/app/Models/OfferClient';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-detail-offers',
  templateUrl: './detail-offers.component.html',
  styleUrls: ['./detail-offers.component.css']
})
export class DetailOffersComponent implements OnInit{
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: OffersService,
    private router: Router,
    private categorieService: CompanyService
  ) {}
  project: Offers = new Offers();
  projectClient: OfferClient = new OfferClient();
  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    // this.get(projectId);
    this.get(projectId);
  }
  get(projectId: number): void {
   
    this.projectService.getById(projectId).subscribe(
      (project: Offers) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  formSubmitted: boolean = false;
  onCvSelected(event: any) {
    const file = event.target.files[0];
    this.projectClient.cv = file;
  }
  showLoginSection: boolean = false;

  // addProjectClient(): void {
  //   this.formSubmitted = true; // Set form submission flag to true
  //   if (this.projectClient.email && this.projectClient.nom && this.projectClient.numtel ) {

  //   const adminProjectId = this.project.id;
  //   this.projectService.addProjectClient(this.projectClient, adminProjectId).subscribe(
  //     (response: OfferClient) => {
  //       // Ajout réussi, effectuez les actions nécessaires (redirection, message, etc.)
  //       console.log('ProjectClient ajouté avec succès', response);
  //       // Réinitialisez le formulaire ou les propriétés nécessaires
  //       this.projectClient = new OfferClient();
      
  //        this.isSubmitted = true;

  //     },
  //     (error: any) => {
  //       // Gestion des erreurs, affichez un message d'erreur ou effectuez les actions nécessaires
  //       console.error('Erreur lors de l\'ajout du ProjectClient', error);
  //     }
  //   );
  // } }
  showThankYouPopup: boolean = false;

  onSubmit() {

    const formData = new FormData();
    formData.append('nom', this.projectClient.nom);
    formData.append('numtel', this.projectClient.numtel.toString());
    formData.append('email', this.projectClient.email);


    formData.append('cv', this.projectClient.cv);
    formData.append('lettre', this.projectClient.lettre);
    const adminProjectId = this.project.id;
    this.projectService.addProjectClient(formData,adminProjectId).subscribe(
      (response) => {
        // Handle successful response
        console.log('Candidacy created successfully', response);
        this.isSubmitted = true;
        this.showThankYouPopup = true; // Afficher la fenêtre contextuelle "Thank you"
        this.projectClient = new OfferClient();
      },
      (error) => {
        // Handle error response
        console.error('Error creating candidacy', error);
      }
    );
  }
  
}
