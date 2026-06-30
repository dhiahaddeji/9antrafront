import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecificOfferService } from 'src/app/MesServices/specific-Offer/specific-offer.service';
import { SpecificOffer } from 'src/app/Models/SpecificOffer';

@Component({
  selector: 'app-all-specific-offer',
  templateUrl: './all-specific-offer.component.html',
  styleUrls: ['./all-specific-offer.component.css']
})
export class AllSpecificOfferComponent implements OnInit  {
  ngOnInit(): void {
    this.get();
     }
     constructor(private router: Router,private projectService: SpecificOfferService ) { }
     adminProjects: SpecificOffer[] = [];

     get(){   
    this.projectService.getAll().subscribe(
      (adminProjects: SpecificOffer[]) => {
        this.adminProjects = adminProjects;
        this.allProjects = adminProjects;
          this.allProjectsEd = adminProjects;
          this.allProjectsEx = adminProjects;
      },
      (error: any) => {
        console.error(error);
      }
    );}
    clientProject(id: number){
      this.router.navigate(['admin/detail-specific-offer', id]);
    }
    selectedSortOrder: string = 'asc';
    getClaimsBySortOrder(sortOrder: string) {
      this.projectService.getClaimsSortedByDate(sortOrder)
        .subscribe(claims => {
          this.adminProjects = claims;
          this.allProjects = claims;
          this.allProjectsEd = claims;
          this.allProjectsEx = claims;

        });
    }
    onSortOrderChange() {
      this.getClaimsBySortOrder(this.selectedSortOrder);
    }
    allProjects: SpecificOffer[] = []; // Store all projects for filtering
    allProjectsEd: SpecificOffer[] = []; // Store all projects for filtering
    allProjectsEx: SpecificOffer[] = [];
    selectedType: string = ''; // Declare the selectedType property

    onTypeChange() {
      if (this.selectedType === '') {
        // If no type is selected, show all offers
        this.adminProjects = this.allProjects;
      } else {
        // Filter offers based on selected type
        this.adminProjects = this.allProjects.filter(offer => offer.type === this.selectedType);
      }
    }
    selectedEducation: string = ''; // Declare the selectedType property
  
    onEducationChange() {
      if (this.selectedEducation === '') {
        // If no type is selected, show all offers
        this.adminProjects = this.allProjectsEd;
      } else {
        // Filter offers based on selected type
        this.adminProjects = this.allProjectsEd.filter(offer => offer.education === this.selectedEducation);
      }
    }
    selectedExp: string = ''; // Declare the selectedType property
  
    onExpChange() {
      if (this.selectedExp === '') {
        // If no type is selected, show all offers
        this.adminProjects = this.allProjectsEx;
      } else {
        // Filter offers based on selected type
        this.adminProjects = this.allProjectsEx.filter(offer => offer.experience === this.selectedExp);
      }
    }
}
