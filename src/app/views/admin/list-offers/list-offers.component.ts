import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { Company } from 'src/app/Models/Company';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {
  ngOnInit(): void {
    this.get();
   
     }
     constructor(private router: Router,private projectService: OffersService , private categorieService:CompanyService) { }
     updateEvent(id: number){
      this.router.navigate(['admin/update-offer', id]);
    }  
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
        this.allProjects = adminProjects; // Update all projects for filtering
        this.allProjectsEd = adminProjects; // Update all projects for filtering
        this.allProjectsEx = adminProjects; // Update all projects for filtering

      },
      (error: any) => {
        console.error(error);
      }
    );}
  adminProjects: Offers[] = [];
  allProjects: Offers[] = []; // Store all projects for filtering
  allProjectsEd: Offers[] = []; // Store all projects for filtering
  allProjectsEx: Offers[] = []; // Store all projects for filtering

  categories: Company[] = [];
  deleteEvents = (id: number) => {
    if (confirm('Are you sur?')) {
      this.projectService.deleteFood(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
        
      });
    }
  }
  selectedSortOrder: string = 'asc';
  getClaimsBySortOrder(sortOrder: string) {
    this.projectService.getClaimsSortedByDate(sortOrder)
      .subscribe(claims => {
        this.adminProjects = claims;
        this.allProjects = claims; // Update all projects for filtering
        this.allProjectsEd = claims; // Update all projects for filtering
        this.allProjectsEx = claims; // Update all projects for filtering

      });
  }
  onSortOrderChange() {
    this.getClaimsBySortOrder(this.selectedSortOrder);
  }
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
  clientProject(id: number){
    this.router.navigate(['admin/detail-offer', id]);
  }
  clientProjects(id: number){
    this.router.navigate(['admin/offerclient', id]);
  }
  
}
