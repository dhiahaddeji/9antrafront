import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecificProjectService } from 'src/app/MesServices/SpecificProjects/specific-project.service';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Component({
  selector: 'app-specificproject',
  templateUrl: './specificproject.component.html',
  styleUrls: ['./specificproject.component.css']
})
export class SpecificprojectComponent implements OnInit {
  constructor(private sp:SpecificProjectService , private router: Router){}
  ngOnInit(): void {
    this.get();
   
     }
     adminProjects: SpecificProject[] = [];

     get(){  
    this.sp.getAll().subscribe(
      (adminProjects: SpecificProject[]) => {
        this.adminProjects = adminProjects;
      },
      (error: any) => {
        console.error(error);
      }
    );}
    selectedStatus: string = '';
    complaints: SpecificProject[] = [];
    onStatusChange() {
      if (this.selectedStatus === '') {
  this.get();    } else {
        const status = this.selectedStatus === 'true';
        this.sp.getComplaintsByStatus(status).subscribe(
          (complaints) => {
            this.adminProjects = complaints;
          },
          (error) => {
            console.error('Error filtering complaints by status', error);
          }
        );
      }
    }
    isUpdating = false;
    updateComplaintAndSendEmail(complaint: SpecificProject) {
      this.isUpdating = true;
      this.sp.updateComplaint(complaint.id, true).subscribe(
        () => {
          console.log('Complaint updated successfully');
          complaint.status = true;
          this.isUpdating = false;
          this.get();
  
        },
        (error) => {
          console.error('Error updating complaint', error);
          this.isUpdating = false;
        }
      );
    }
    onCheckboxClick(event: Event) {
      const target = event.target as HTMLInputElement;
      const label = target.nextElementSibling as HTMLLabelElement;
  
      label.textContent = target.checked ? '' : '';
    }
    selectedSortOrder: string = 'asc';
    getClaimsBySortOrder(sortOrder: string) {
      this.sp.getClaimsSortedByDate(sortOrder)
        .subscribe(claims => {
          this.adminProjects = claims;
        });
    }
    onSortOrderChange() {
      this.getClaimsBySortOrder(this.selectedSortOrder);
    }
    copyEmail(email: string) {
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    clientProject(id: number){
      this.router.navigate(['admin/specificproject', id]);
    }
    selectedType: string = ''; // Declare the selectedType property
    
}
