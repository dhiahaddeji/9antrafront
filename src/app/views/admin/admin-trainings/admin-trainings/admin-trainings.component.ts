import { Component, OnInit } from '@angular/core';
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

    constructor(private cs:CategorieService,private fs: FormationsService) { }
    ngOnInit(): void {
      this.getAllCategorie()
      this.getAllFormation()
      this.getAllCategorie2()
      this.sortFeedbacksByDate();
    }
    getAllCategorie() {
      this.cs.getCategories().subscribe(res => {
        this.tabCategorie = res;
        console.log(this.tabCategorie);

        this.tabCategorie.forEach((category: any) => {
          this.getFormationByCategorie(category.id, category);
        });
      });
    }
    tabCategorie2:any=[]
    getAllCategorie2() {
      this.cs.getCategories().subscribe(res => {
        this.tabCategorie2 = res;
        console.log(this.tabCategorie2);
      });
    }


    getFormationByCategorie(categoryId: any, category: any) {
      this.fs.getFormationByCategorie(categoryId).subscribe(res => {
        category.formations = res;
        console.log(category.formations);
      });
    }
    deleteFormation(id: any) {
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
          this.fs.deleteFormation(id).subscribe((res) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.getAllCategorie(); // Update the Page after successful deletion
          });
        }
      });
    }
    getAllFormation() {
      this.fs.getFormations().subscribe(res => {
        const sortedFormations = Object.values(res).sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        this.tabFormation = []; // Clear existing formations before rendering with delay

        let index = 0;
        const interval = setInterval(() => {
          if (index < sortedFormations.length) {
            this.tabFormation.push(sortedFormations[index]);
            index++;
          } else {
            clearInterval(interval); // Stop the interval when all formations are displayed
          }
        }, 300); // You can adjust the time delay (in milliseconds) as per your requirement
      });
    }

    getCategoryById(categoryId: any) {
      return this.tabCategorie.find((category: any) => category.id === categoryId);
    }
    cat2:any
    searchCategorieByid() {
      this.getAllCategorie()

this.cat2=this.Categorie
//filter the array to get only id categorie equal to Categorie

this.filteredCategories = this.tabCategorie.filter((category: { id: any; }) => {
  return category.id == this.cat2;
});
console.log(this.filteredCategories);

this.tabCategorie = this.filteredCategories;

this.Categorie = '';
    }

    getFilteredCategories() {
      // If a filter is applied, return the filtered categories; otherwise, return the original tabCategorie
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
        }, 300); // You can adjust the time delay (in milliseconds) as per your requirement
      }
    }


}
