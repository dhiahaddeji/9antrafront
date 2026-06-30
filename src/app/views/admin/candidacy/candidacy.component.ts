import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidacyService } from 'src/app/MesServices/Candidacy/candidacy.service';
import { Candidacy } from 'src/app/Models/Candidacy';

@Component({
  selector: 'app-candidacy',
  templateUrl: './candidacy.component.html',
  styleUrls: ['./candidacy.component.css']
})
export class CandidacyComponent {
  constructor(private sp:CandidacyService , private router: Router){}
  ngOnInit(): void {
    this.get();
   
     }
     adminProjects: Candidacy[] = [];
     viewCV(cvFilename: string) {
      const cvFilePath = `assets/Candidacy/${cvFilename}`;
      window.open(cvFilePath, '_blank');
    }
    
    
     get(){  
    this.sp.getAll().subscribe(
      (adminProjects: Candidacy[]) => {
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
      this.router.navigate(['admin/detail-candidacy', id]);
    }
    selectedSortOrder: string = 'asc';
    getClaimsBySortOrder(sortOrder: string) {
      this.sp.getClaimsSortedByDate(sortOrder)
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
    allProjects: Candidacy[] = []; // Store all projects for filtering
    allProjectsEd: Candidacy[] = []; // Store all projects for filtering
    allProjectsEx: Candidacy[] = [];
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
