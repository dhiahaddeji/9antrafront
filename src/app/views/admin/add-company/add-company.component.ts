import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent  {
  file: File | null = null;
  imagePreview: string | undefined;
  constructor(private router: Router,private projectOwnerService: CompanyService) {}

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      // Générer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    } 
  }
  project: Company = new Company();
  isEdit = false;

  save() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('nom', this.project.nom);
      formData.append('adresse', this.project.adresse);
      formData.append('numtel', this.project.numtel.toString());
      formData.append('email', this.project.email);
      formData.append('description', this.project.description);

      this.projectOwnerService.create(formData).subscribe(
        (data) => {
          console.log(data);
          this.imagePreview = undefined;

          this.project = new Company();
          this.file = null;
          this.router.navigate(['/admin/company']);

        },
        (error) => console.log(error)
      );
    }
  }
}
