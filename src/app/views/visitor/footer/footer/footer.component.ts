import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Company } from 'src/app/Models/Company';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  AddCoach!: FormGroup;
  Role = 'COACH';

  // Modal visibility flags
  showCoachModal: boolean = false;
  showContributorModal: boolean = false;
  showCompanyModal: boolean = false;

  // Coach form properties
  uploadInProgress: boolean = false;
  showSuccessMessage: boolean = false;
  isLoading: boolean = false;
  Allformation: any = [];

  // Contributor/Company form properties
  file: File | null = null;
  project: ProjectOwner = new ProjectOwner();
  projects: Company = new Company();
  imagePreview: string | undefined;
  formSubmitted: boolean = false;
  formSubmitteds: boolean = false;

  constructor(
    private UserService: UserService,
    private FormationsService: FormationsService,
    private authService: UserAuthService,
    private formBuilder: FormBuilder,
    private projectOwnerService: ProjectOwnerService,
    private router: Router,
    private sp: CompanyService
  ) {}

  ngOnInit(): void {
    this.getALLFormations();
    this.initializeCoachForm();
  }

  // ===== COACH MODAL METHODS =====
  openCoachModal(): void {
    this.showCoachModal = true;
  }

  closeCoachModal(): void {
    this.showCoachModal = false;
  }

  initializeCoachForm(): void {
    this.AddCoach = this.formBuilder.group({
      fusername: ['', [Validators.required, Validators.email]],
      fFirstName: ['', [Validators.required]],
      fLastName: ['', [Validators.required]],
      fPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('[0-9]*'),
        ],
      ],
      CV: ['', [Validators.required]],
      fGithub: ['', [Validators.required]],
      fLinkedin: ['', [Validators.required]],
      fCountry: ['Select Country', [Validators.required]],
      fSkills: ['', [Validators.required]],
    });
  }

  AddCoachForm(): void {
    if (!this.AddCoach.valid || !this.AddCoach.get('CV')?.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Please complete all required fields',
        text: 'Make sure you upload your CV file',
      });
      return;
    }

    const formData = new FormData();
    formData.append('username', this.AddCoach.get('fusername')?.value);
    formData.append('firstName', this.AddCoach.get('fFirstName')?.value);
    formData.append('lastName', this.AddCoach.get('fLastName')?.value);
    formData.append('password', 'Coach123!');
    formData.append('numeroTel', this.AddCoach.get('fPhoneNumber')?.value);
    formData.append('CV', this.AddCoach.get('CV')?.value);
    formData.append('typeFormation', this.AddCoach.get('fSkills')?.value);
    formData.append('country', this.AddCoach.get('fCountry')?.value);
    formData.append('Github', this.AddCoach.get('fGithub')?.value);
    formData.append('Linkedin', this.AddCoach.get('fLinkedin')?.value);
    formData.append('skills', this.AddCoach.get('fSkills')?.value);

    this.isLoading = true;
    this.uploadInProgress = true;

    this.UserService.ajoutFormateur(formData).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.uploadInProgress = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thank you for your registration!',
          text: 'We will contact you as soon as possible. Your temporary password is: Coach123!',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.closeCoachModal();
            this.AddCoach.reset();
            location.reload();
          }
        });
      },
      (error: any) => {
        this.isLoading = false;
        this.uploadInProgress = false;

        let errorMessage = 'Something went wrong!';
        if (error.status === 400 && error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please check the console and contact support.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.AddCoach.patchValue({ CV: file });
      this.uploadInProgress = true;
      setTimeout(() => {
        this.uploadInProgress = false;
        this.showSuccessMessage = true;
      }, 1000);
    } else {
      this.uploadInProgress = false;
    }
  }

  // ===== CONTRIBUTOR MODAL METHODS =====
  openContributorModal(): void {
    this.showContributorModal = true;
  }

  closeContributorModal(): void {
    this.showContributorModal = false;
  }

  save(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('nom', this.project.nom);
      formData.append('prenom', this.project.prenom);
      formData.append('numtel', this.project.numtel.toString());
      formData.append('email', this.project.email);
      formData.append('github', this.project.github);
      formData.append('linkedin', this.project.linkedin);

      this.projectOwnerService.createContributors(formData).subscribe(
        (data: any) => {
          this.imagePreview = undefined;
          this.project = new ProjectOwner();
          this.file = null;
          this.formSubmitted = true;
        },
        (error: any) => console.log(error)
      );
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  // ===== COMPANY MODAL METHODS =====
  openCompanyModal(): void {
    this.showCompanyModal = true;
  }

  closeCompanyModal(): void {
    this.showCompanyModal = false;
  }

  saveCompany(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('nom', this.projects.nom);
      formData.append('adresse', this.projects.adresse);
      formData.append('numtel', this.projects.numtel.toString());
      formData.append('email', this.projects.email);
      formData.append('description', this.projects.description);

      this.sp.createC(formData).subscribe(
        (data: any) => {
          this.imagePreview = undefined;
          this.projects = new Company();
          this.file = null;
          this.formSubmitteds = true;
        },
        (error: any) => console.log(error)
      );
    }
  }

  // ===== HELPER METHODS =====
  getALLFormations(): void {
    this.FormationsService.getFormations().subscribe((data: any) => {
      this.Allformation = data;
    });
  }

  isLoggedIn2(): boolean {
    return this.authService.isLoggedIn2();
  }

  isValidNumber(number: any): boolean {
    const numberRegex = /^\+?\d+$/;
    return numberRegex.test(number);
  }

  isValidEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
