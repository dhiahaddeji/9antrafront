import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';

@Component({
  selector: 'app-admin-hackerspaceform',
  templateUrl: './admin-hackerspaceform.component.html',
  styleUrls: ['./admin-hackerspaceform.component.css']
})
export class AdminHackerspaceformComponent implements OnInit {
  HackerForm!: FormGroup;
  imagepath = '';
  successMessage: string = '';
  errorMessage: string = '';

  showSuccessModal: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private hackerspaceservice: HackerspacesService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.HackerForm = this.formBuilder.group({
      region: ['', Validators.required],
      location: ['', Validators.required],
      adresse: ['', Validators.required],
      description: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Photo: ''
    });
  }
  cancelForm() {
    this.router.navigate(['/admin/categories']);
  }
  AddHackerspaceForm() {
    if (this.HackerForm.valid) {
      const email = this.HackerForm.get('email')?.value;
      const phone = this.HackerForm.get('phone')?.value;

      if (!this.isValidEmail(email)) {
        this.errorMessage = 'Invalid email address.';
        return;
      }

      if (!this.isValidPhoneNumber(phone)) {
        this.errorMessage = 'Invalid phone number.';
        return;
      }

      const formData = new FormData();
      formData.append('Region', this.HackerForm.get('region')?.value);
      formData.append('Location', this.HackerForm.get('location')?.value);
      formData.append('adresse', this.HackerForm.get('adresse')?.value);
      formData.append('Description', this.HackerForm.get('description')?.value);
      const photoFile = this.HackerForm.get('Photo')?.value;
      if (photoFile instanceof File) {
        formData.append('Photo', photoFile, photoFile.name);
      }

      formData.append('Email', email);
      formData.append('Phone', phone);

      this.hackerspaceservice.addHackerspaces(formData).subscribe(
        (data: any) => {
          this.successMessage = 'Hackerspace added successfully.';
          this.errorMessage = '';
          this.showSuccessModal = true;
          console.log(data);
        },
        (error: any) => {
          this.successMessage = '';
          this.errorMessage = 'Error adding the hackerspace. Please try again.';
          console.log(error);
        }
      );
    } else {
      this.errorMessage = ' Please fill in all the required fields.';
    }
  }

  isValidEmail(email: any) {
    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phone: any) {
    // Regular expression to match phone numbers (e.g., +1234567890, 1234567890, etc.)
    const phoneRegex = /^\+?\d+$/;
    return phoneRegex.test(phone);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.HackerForm.get('Photo')!.setValue(file);
      console.log(this.HackerForm.get('Photo')!.value);
    } else {
      this.HackerForm.get('Photo')!.setValue(this.imagepath);
    }
  }
  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/admin/hackerspace']);
  }

}
