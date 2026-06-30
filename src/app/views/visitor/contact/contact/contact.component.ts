import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoogleAuthService } from 'ng-gapi';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/MesServices/Contact/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {


  // category!: string

  // constructor(private route: ActivatedRoute) {}


  // ngOnInit(): void {
  //   this.category =  this.route.snapshot.paramMap.get('category') || ''
  // }
  
//}
  contactForm!: FormGroup;
  isLoading: boolean = false;
  uploadInProgress: boolean = false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }

  get lastName() {
    return this.contactForm.get('lastName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        subject: this.subject?.value,
        message: this.message?.value,
      };

      this.uploadInProgress = true; // Set the upload in progress

      this.contactService.ajoutContact(contactData).subscribe(
        () => {
          this.uploadInProgress = false;

          Swal.fire(
            'Success',
            'Contact form submitted successfully!',
            'success'
          );
          this.contactForm.reset();
        },
        (error: any) => {
          this.uploadInProgress = false;

          Swal.fire(
            'Error',
            'Failed to submit contact form. Please try again later.',
            'error'
          );
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Please fill in all required fields correctly.',
        'warning'
      );
    }
  }
}
