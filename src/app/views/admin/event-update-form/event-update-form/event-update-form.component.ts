import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-event-update-form',
  templateUrl: './event-update-form.component.html',
  styleUrls: ['./event-update-form.component.css']
})
export class EventUpdateFormComponent implements OnInit {
  eventForm!: FormGroup;
  imagepath = '';
  successMessage: string = '';
  errorMessage: string = '';
  id?:number 

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
    

  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      facebook: ['', [Validators.required, Validators.pattern(/^https?:\/\/(www\.)?facebook\.com\/.+/i)]],
      ggmeet: ['', [Validators.required, Validators.pattern(/^https?:\/\/(www\.)?(meet\.google\.com|hangouts\.google\.com|meet\.jit\.si)\/.+/i)]],
      Image: ''
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne(this.id)
  }

  getOne(id: number) {
    this.eventService.getOne(id).subscribe(
      (data) => {
        console.log('Event data loaded:', data);
        
        this.eventForm.get('name')!.setValue(data.name)
        this.eventForm.get('price')!.setValue(data.price)
        this.eventForm.get('description')!.setValue(data.description)
        
        // Format date from ISO string to YYYY-MM-DD format for date input
        if (data.date) {
          const dateObj = new Date(data.date);
          const formattedDate = dateObj.toISOString().split('T')[0];
          this.eventForm.get('date')!.setValue(formattedDate);
        }
        
        this.eventForm.get('Image')!.setValue(data.image)
        this.imagepath = data.image; // Store the original image path
        this.eventForm.get('facebook')!.setValue(data.facebookLink)
        this.eventForm.get('ggmeet')!.setValue(data.googleMeetLink)
        
        // Mark form as pristine and untouched after populating
        this.eventForm.markAsPristine();
        this.eventForm.markAsUntouched();
        
        console.log('Form validity after loading:', this.eventForm.valid);
        console.log('Form status:', this.eventForm.status);
        console.log('Form value:', this.eventForm.value);
      },
      (error) => {
        console.error('Error loading event:', error);
        this.errorMessage = 'Failed to load event details';
      }
    )
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

  updateEvent() {
    console.log('Update event called');
    console.log('Form valid:', this.eventForm.valid);
    console.log('Form value:', this.eventForm.value);
    
    if(this.eventForm.valid) {
      const event = {
        id: this.id,
        name: this.eventForm.get('name')?.value,
        description: this.eventForm.get('description')?.value,
        price: this.eventForm.get('price')?.value,
        date: this.eventForm.get('date')?.value,
        facebookLink: this.eventForm.get('facebook')?.value,
        googleMeetLink: this.eventForm.get('ggmeet')?.value
      }
      
      console.log('Event object:', event);
      
      const photoFile = this.eventForm.get('Image')?.value;
      console.log('Photo file:', photoFile, 'Type:', typeof photoFile, 'Is File:', photoFile instanceof File);
      
      if (photoFile instanceof File) {
        // User selected a new file - use update with image endpoint
        const formData = new FormData();
        formData.append('event', JSON.stringify(event));
        formData.append('file', photoFile, photoFile.name);
        
        console.log('Updating event with new image:', event);
        this.eventService.updateEvent(formData).subscribe(
          (response) => {
            console.log('Event updated successfully:', response);
            this.successMessage = 'Event has been updated successfully';
            setTimeout(() => {
              this.router.navigateByUrl("/admin/events");
            }, 1500);
          },
          (error) => {
            console.error('Error updating event:', error);
            this.errorMessage = 'Failed to update event. Please try again.';
          }
        );
      } else if (photoFile && typeof photoFile === 'string' && photoFile.length > 0) {
        // Image filename exists but no new file selected - keep existing image
        console.log('Updating event without changing image:', event);
        this.eventService.updateEventNoImage(event).subscribe(
          (response) => {
            console.log('Event updated successfully (no image change):', response);
            this.successMessage = 'Event has been updated successfully';
            setTimeout(() => {
              this.router.navigateByUrl("/admin/events");
            }, 1500);
          },
          (error) => {
            console.error('Error updating event:', error);
            this.errorMessage = 'Failed to update event. Please try again.';
          }
        );
      } else {
        this.errorMessage = 'Image is required';
        console.warn('No image provided');
      }
    } else {
      this.errorMessage = 'Please fill all required fields with valid values';
      console.warn('Form is invalid:', this.eventForm);
      console.warn('Form errors:', this.eventForm.errors);
      
      // Log individual control errors
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        if (control && control.errors) {
          console.warn(`${key} errors:`, control.errors);
        }
      });
    }
  }

  getImage() {
    if (this.eventForm.get('Image')!.value) {
      return `${environement.BASE_URL}/uploads/Events/${this.eventForm.get('Image')!.value}`;
    }
    return "";
  }

}
