import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.css']
})
export class AdminTrainingsComponent  implements OnInit{
  tabCategorie:any=[]
  Categorie="" ;
  Formation: any = [];
  tabFormation : any= [] ;
  id :any ;
  searchTerm = '';
  filteredCategories: any[] = [];
  openDropdownId: any = null;

    constructor(private cs:CategorieService, private fs: FormationsService, private router: Router) { }
    
    ngOnInit(): void {
      this.getAllCategorie()
      this.getAllFormation()
      this.getAllCategorie2()
      this.sortFeedbacksByDate();
    }

    toggleDropdown(formationId: any): void {
      if (this.openDropdownId === formationId) {
        this.openDropdownId = null;
      } else {
        this.openDropdownId = formationId;
      }
    }

    onUpdateClick(formationId: any): void {
      console.log('Update clicked for formation ID:', formationId);
      this.openDropdownId = null;
      this.router.navigate(['/admin/trainingsUpdate', formationId]);
    }

    onDeleteClick(formationId: any): void {
      console.log('Delete clicked for formation ID:', formationId);
      this.openDropdownId = null;
      this.confirmDelete(formationId);
    }

    confirmDelete(formationId: any): void {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Confirmed delete for formation ID:', formationId);
          this.performDelete(formationId);
        }
      });
    }

    performDelete(formationId: any): void {
      this.fs.deleteFormation(formationId).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          Swal.fire('Deleted!', 'Your training has been deleted.', 'success');
          this.getAllCategorie();
        },
        (error) => {
          console.error('Delete failed:', error);
          Swal.fire('Error!', 'Failed to delete the training.', 'error');
        }
      );
    }

    getAllCategorie() {
      this.cs.getCategories().subscribe(res => {
        this.tabCategorie = res;
        console.log('All categories loaded:', this.tabCategorie);
        this.tabCategorie.forEach((category: any) => {
          this.getFormationByCategorie(category.id, category);
        });
      });
    }

    tabCategorie2:any=[]

    getAllCategorie2() {
      this.cs.getCategories().subscribe(res => {
        this.tabCategorie2 = res;
      });
    }

    getFormationByCategorie(categoryId: any, category: any) {
      this.fs.getFormationByCategorie(categoryId).subscribe(res => {
        category.formations = res;
        console.log('Formations loaded for category ' + categoryId + ':', category.formations);
      });
    }

    getAllFormation() {
      this.fs.getFormations().subscribe(res => {
        const sortedFormations = Object.values(res).sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        this.tabFormation = [];
        let index = 0;
        const interval = setInterval(() => {
          if (index < sortedFormations.length) {
            this.tabFormation.push(sortedFormations[index]);
            index++;
          } else {
            clearInterval(interval);
          }
        }, 300);
      });
    }

    getCategoryById(categoryId: any) {
      return this.tabCategorie.find((category: any) => category.id === categoryId);
    }

    cat2:any

    searchCategorieByid() {
      this.getAllCategorie()
      this.cat2=this.Categorie
      this.filteredCategories = this.tabCategorie.filter((category: { id: any; }) => {
        return category.id == this.cat2;
      });
      console.log(this.filteredCategories);
      this.tabCategorie = this.filteredCategories;
      this.Categorie = '';
    }

    getFilteredCategories() {
      return this.filteredCategories.length > 0 ? this.filteredCategories : this.tabCategorie;
    }

    sortFeedbacksByDate() {
      this.tabFormation.forEach((category: any) => {
        category.formations.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      });
    }

    renderFormationsWithDelay(formations: any[], index: number) {
      if (index < formations.length) {
        setTimeout(() => {
          this.tabFormation.push(formations[index]);
          this.renderFormationsWithDelay(formations, index + 1);
        }, 300);
      }
    }
}
