import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';
import { RequestService } from 'src/app/MesServices/Request/request.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
})
export class FormSectionComponent implements OnInit {
  AddStudent!: FormGroup;
  Role = 'ETUDIANT';
  Addetat!: boolean;
  msjEtat: string = '';
  Allformation: any = [];
  isLoading: boolean = false;
  showSuccessIcon: boolean = false;
  uploadInProgress: boolean = false;

  constructor(
    private FormationsService: FormationsService,
    private rs: RequestService,
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
  ) {
    this.Addetat = false;
    this.msjEtat = '';
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn2();
  }
  AddStudentForm() {
    const formData = new FormData();

    const form = {
      firstName: this.AddStudent.get('fFirstName')?.value,
      lastName: this.AddStudent.get('fLastName')?.value,
      country: this.AddStudent.get('fCountry')?.value,
      phoneNumber: this.AddStudent.get('fPhoneNumber')?.value,
      email: this.AddStudent.get('fusername')?.value
    }
    let idFormation = this.AddStudent.get('fFormation')?.value

    this.isLoading = true;
    this.uploadInProgress = true;

    console.log(this.Allformation);

    formData.append('request', JSON.stringify(form));
        this.rs.addRequest(formData, idFormation).subscribe(
        (data: any) => {
          this.Addetat = true;
          this.showSuccessIcon = true;
          this.uploadInProgress = false;

          this.isLoading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:
              'Thank you for your registration. We will contact you as soon as possible.',
            showConfirmButton: true,

          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        (error) => {
          console.log(error);

          this.showSuccessIcon = false;
          this.Addetat = true;
          this.uploadInProgress = false;
          this.isLoading = false;

          if (
            error.status === 400 //&&
            // error.error?.message === 'Error: email is already taken!'
          ) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        }

      )
      }

   

  isValidEmail(email: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let Email = this.authService.getUsername;
    if(emailRegex.test(email) && Email==email){
      return true
    }else{
      return false
    }
  }

  getALLFormations() {
    this.FormationsService.getFormations().subscribe((data) => {
      this.Allformation = data;
      console.log(this.Allformation);
    });
  }

  get f() {
    return this.AddStudent.controls;
  }

  ngOnInit(): void {
    this.getALLFormations();
    this.AddStudent = this.formBuilder.group({
      fusername: ['', [Validators.required, Validators.email]],
      fFirstName: ['', [Validators.required]],
      fLastName: ['', [Validators.required]],
      fPhoneNumber: ['', [Validators.required]],
      fFormation: ['Select Training', [Validators.required]],
      fCountry: ['Select Country', [Validators.required]],
      fabout: ['', [Validators.required]],

    });

  }
  isValidNumber(number: any) {
    // Regular expression to match numbers
    const numberRegex = /^\+?\d{8,}$/;
    return numberRegex.test(number);
  }


}
