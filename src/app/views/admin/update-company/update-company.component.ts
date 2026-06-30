import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
  constructor(private router: Router,private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private categorieService:CompanyService ) {
     
    }
    selectedFile!: File;
    file: File | null = null;

    imagePreview: string | undefined;

    project: Company = new Company();
    food!:Company;
id!:number;
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.categorieService.getById(this.id).subscribe((food: Company) => {
          this.food = food;
    
          // Check if the existing title is different from the new value
            // Pre-fill the form field with the existing project data
            this.project.adresse = this.food.adresse;
            this.project.nom = this.food.nom;
            this.project.description = this.food.description;

    
          // Pre-fill the other form fields with the existing project data
          this.project.email = this.food.email;
          this.project.numtel = this.food.numtel;
    
          
   // Définir l'URL de l'image existante
   this.imagePreview = 'assets/' + this.food.image;
  
   // Définir la valeur de selectedFile à null pour ne pas afficher le nom du fichier
   this.selectedFile != null;
    
         
        });
      });  }
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
      onSubmitr() {
        const formData = new FormData();
        if (this.selectedFile) {
          // Le fichier a été modifié, ajoutez-le à FormData
          formData.append('file', this.selectedFile);
        } else {
          // Le fichier n'a pas été modifié, ajoutez l'URL de l'image existante à FormData
          formData.append('image', this.food.image);
        }
        formData.append('nom', this.project.nom);
        formData.append('adresse', this.project.adresse);
        formData.append('description', this.project.description);

        formData.append('numtel', this.project.numtel.toString());
        formData.append('email', this.project.email);
        
        this.categorieService.updateProject (this.id, formData).subscribe(
          (response) => {
            console.log(response);
            this.project = new Company();
            this.file = null;
            this.router.navigate(['/admin/company']);

            // Gérer la réponse du serveur
            // Effectuer d'autres actions si nécessaire
          },
          (error) => {
            console.error(error); // Gérer toute erreur qui se produit
          }
        );
      }
    

      onFileSelectedz(event: any) {
        this.selectedFile = event.target.files[0];
        this.imagePreview != null;
    
        const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
      }
}
