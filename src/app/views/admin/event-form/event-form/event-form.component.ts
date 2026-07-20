import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/MesServices/Event/event.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit{

  eventForm!: FormGroup;
  selectedSmiley: string = '';
  showDropdown: boolean = false;
  smileyOptions: string[] = [
    '😊', // Smiley face
    '😍', // Heart eyes
    '😂', // Tears of joy
    '🥰', // Smiling face with hearts
    // Add more smiley options as needed
  ];
  imagepath = '';
  successMessage: string = '';
  errorMessage: string = '';

  showSuccessModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router

  ) {
  }

  ngOnInit(): void {

    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      date: ['', Validators.required],
      facebook: ['', [Validators.required],],
      ggmeet: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(meet.google.com|meet.googleusercontent.com|hangouts.google.com|meet.jit.si)\/[\w\-\.]+\/?$/i)]],
      Image: ''
    });
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.eventForm.get('Image')!.setValue(file);
      console.log(this.eventForm.get('Image')!.value);
    } else {
      this.eventForm.get('Image')!.setValue(this.imagepath);
    }
  }

  addEvent() {
    if(this.eventForm.valid) {

      const formData = new FormData();
      const event = {
        name: this.eventForm.get('name')?.value,
        description: this.eventForm.get('description')?.value,
        price: this.eventForm.get('price')?.value,
        date: this.eventForm.get('date')?.value,
        facebookLink: this.eventForm.get('facebook')?.value,
        googleMeetLink: this.eventForm.get('ggmeet')?.value
      }
      formData.append('event', JSON.stringify(event));
      const photoFile = this.eventForm.get('Image')?.value;
      if (photoFile instanceof File) {
        formData.append('file', photoFile, photoFile.name);
      }

      this.eventService.addEvent(formData).subscribe(
        () => {
          Swal.fire({
            title: 'Event has been added successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          this.router.navigateByUrl("/admin/events")
        },
        (error) => {
          const msg = error.error?.message || error.message || 'Error adding the Event. Please try again.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: msg,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
          });
        }
      )

    } else {
      this.errorMessage = ' Please fill in all the required fields correctly.';
    }
  }

  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/admin/events']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown)
  }

  insertSmiley(smiley: string) {
    this.selectedSmiley = smiley;
    this.toggleDropdown();

    const descriptionControl = this.eventForm.get('description');
    const currentDescription = descriptionControl?.value || '';
    descriptionControl?.setValue(currentDescription + smiley);
  }

}
