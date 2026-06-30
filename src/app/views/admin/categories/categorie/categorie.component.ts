import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { categorie } from 'src/app/Models/categorie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  tabCategorie:any=[]
  Categorie =""

  selectedCategory: categorie = new categorie();
  updateFormVisible = false;
  constructor(private cs: CategorieService , public dialog: MatDialog) { }

  showUpdateForm(category: categorie) {
    // Set the selected category for update
    this.selectedCategory = { ...category };

    // Show SweetAlert2 popup with the update form
    Swal.fire({
      title: 'Update Category',
      html: `
        <input id="swal-input1" class="swal2-input" value="${this.selectedCategory.nomCate}" />
        <!-- Add other form fields as needed -->
      `,
      focusConfirm: false,
      preConfirm: () => {
        // Retrieve the updated values from the form
        const name = (<HTMLInputElement>document.getElementById('swal-input1')).value.trim();
        // Update the selectedCategory object with the new values
        this.selectedCategory.nomCate = name;

        // Call your update method here or subscribe to the service to handle the update
        // For example:
        this.updateCategory();

        // Close the SweetAlert2 popup
        return true;
      },
    });
  }




  updateCategory() {
    this.cs.updateCategorie(this.selectedCategory.id, this.selectedCategory).subscribe(
      (response) => {
        Swal.fire('Updated!', 'Category updated successfully.', 'success');
        this.getAllCategorie(); // Update the Page after successful update
        this.updateFormVisible = false; // Hide the update form after successful update
      },
      (error) => {
        console.error('Failed to update category!', error);
        // Handle error scenarios
      }
    );
  }






  deleteCategrie(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.deleteCategorie(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
          this.getAllCategorie(); // Update the Page after successful deletion
        });
      }
    });
  }
  getAllCategorie() {
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res;
      console.log(this.tabCategorie);
    });
  }






  ngOnInit(): void {
    this.getAllCategorie();
  }
}
