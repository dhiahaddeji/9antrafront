import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';

@Component({
  selector: 'app-admin-hackerspaces-update',
  templateUrl: './admin-hackerspaces-update.component.html',
  styleUrls: ['./admin-hackerspaces-update.component.css']
})
export class AdminHackerspacesUpdateComponent implements OnInit{
  HackerForm!: FormGroup;
  imagepath = '';
  successMessage: string = '';
  errorMessage: string = '';
  id:any
  hackerSpace:any

  showSuccessModal: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private hackerspaceservice: HackerspacesService,
    private router: Router,
    private route:ActivatedRoute

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
    this.id = this.route.snapshot.params['id'];
    this.getHackerspacesById();
    console.log(this.HackerForm.get('Photo')?.value);

  }
  cancelForm() {
    this.router.navigate(['/admin/categories']);
  }
  updateHackerspace() {
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
      if(!photoFile){
        formData.append('Photo', 'null');
      }else{
        formData.append('Photo', photoFile, photoFile.name);
      }
      formData.append('Email', email);
      formData.append('Phone', phone);

      this.hackerspaceservice.updateHackerspaces(this.id,formData).subscribe(
        (data: any) => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Update HackerSpace',
            text: 'HackerSpace updated successfully',
          });
          this.router.navigate(['/admin/hackerspace'])
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Update HackerSpace',
            text: 'HackerSpace updated Failed',
          });
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

  getHackerspacesById(){
    this.hackerspaceservice.getHackerspacesById(this.id).subscribe((res:any)=>{
      this.hackerSpace=res;

      const regionControl = this.HackerForm.get('region');
      const adresseControl = this.HackerForm.get('adresse');
      const locationControl = this.HackerForm.get('location');
      const descriptionControl = this.HackerForm.get('description');
      const phoneControl = this.HackerForm.get('phone');
      const emailControl = this.HackerForm.get('email');

      if(regionControl){
        regionControl.setValue(this.hackerSpace.region)
      }
      if(adresseControl){
        adresseControl.setValue(this.hackerSpace.adresse)
      }
      if(locationControl){
        locationControl.setValue(this.hackerSpace.location)
      }
      if(descriptionControl){
        descriptionControl.setValue(this.hackerSpace.description)
      }
      if(phoneControl){
        phoneControl.setValue(this.hackerSpace.phone)
      }
      if(emailControl){
        emailControl.setValue(this.hackerSpace.email)
      }

      console.log(this.hackerSpace);
    },(error)=>{
      console.log(error);

    })
  }
  updateHackerspaces(){

  }
}
