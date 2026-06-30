import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandService } from 'src/app/MesServices/Demand/demand.service';
import { categorie } from 'src/app/Models/categorie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-forum',
  templateUrl: './contact-forum.component.html',
  styleUrls: ['./contact-forum.component.css']
})
export class ContactForumComponent implements OnInit {

  contactForm!: FormGroup;
  idPath!: number
  errorMessage: string = '';
  @Input() contactCategory!: string
  

  constructor(
    private formBuilder: FormBuilder,
    private ds: DemandService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      message: ['', [Validators.required]]
    });

    if (this.contactCategory === 'Path') {
      this.idPath = Number(this.route.snapshot.paramMap.get('id'))
    }

    console.log(this.contactCategory);
    

  }

  onInput(event: any) {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9]/g, '');
    event.target.value = inputValue;
  }

  addDemand() {
    if (this.contactForm.valid) {
      const formData = new FormData();
      const demand = {
        firstName: this.contactForm.get('firstname')?.value,
        lastName: this.contactForm.get('lastName')?.value,
        email: this.contactForm.get('email')?.value,
        phoneNr: this.contactForm.get('phoneNumber')?.value,
        subject: this.contactForm.get('subject')?.value,
        message: this.contactForm.get('message')?.value,
        category: this.contactCategory
      }

      formData.append('demand', JSON.stringify(demand));


      if (this.contactCategory === 'Path') {
        this.ds.addPathDemand(formData, this.idPath).subscribe(
          () => {
            Swal.fire({
              title: '',
              icon: 'success',
              text: 'We will respond to you shortly , check your email in the meantime',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            this.router.navigateByUrl("/paths")
          },
          (error) => {
            Swal.fire({
              title: '',
              icon: 'error',
              text: 'An Error occured try again',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        )
      } else {
        this.ds.addDemand(formData).subscribe(
          () => {
            Swal.fire({
              title: '',
              icon: 'success',
              text: 'We will respond to you shortly , check your email in the meantime',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            this.router.navigateByUrl("/")
          },
          (error) => {
            Swal.fire({
              title: '',
              icon: 'error',
              text: 'An Error occured try again',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        )
      }
    } else {
      this.errorMessage = ' Please fill in all the required fields correctly.';
    }

  }

}
