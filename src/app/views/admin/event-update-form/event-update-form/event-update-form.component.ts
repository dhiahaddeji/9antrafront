import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/MesServices/Event/event.service';

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
      description: [''],
      date: ['', Validators.required],
      facebook: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/(events\/\d+|pages\/[\w\-\.]+)\/?$/i)]],
      ggmeet: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(meet.google.com|meet.googleusercontent.com|hangouts.google.com|meet.jit.si)\/[\w\-\.]+\/?$/i)]],
      Image: ''
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne(this.id)
  }

  getOne(id: number) {
    this.eventService.getOne(id).subscribe(
      (data) => {
        this.eventForm.get('name')!.setValue(data.name)
        this.eventForm.get('price')!.setValue(data.price)
        this.eventForm.get('description')!.setValue(data.description)
        this.eventForm.get('date')!.setValue(data.date)
        this.eventForm.get('Image')!.setValue(data.image)
        this.eventForm.get('facebook')!.setValue(data.facebookLink)
        this.eventForm.get('ggmeet')!.setValue(data.googleMeetLink)
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
    if(this.eventForm.valid) {

      const formData = new FormData();
      const event = {
        id: this.id,
        name: this.eventForm.get('name')?.value,
        description: this.eventForm.get('description')?.value,
        price: this.eventForm.get('price')?.value,
        date: this.eventForm.get('date')?.value,
        facebookLink: this.eventForm.get('facebook')?.value,
        googleMeetLink: this.eventForm.get('ggmeet')?.value
      }
      formData.append('event', JSON.stringify(event));
      console.log(this.eventForm.get('Image')?.value);
      
      const photoFile = this.eventForm.get('Image')?.value;
      if (photoFile instanceof File) {
        formData.append('file', photoFile, photoFile.name);

        this.eventService.updateEvent(formData).subscribe(
          () => {
            alert('Event has been updated')
            //window.location.reload()
            this.router.navigateByUrl("/admin/events")
          },
          (error) => {
            alert('Failed to add Event')
          }
        )
      } else  {
        this.eventService.updateEventNoImage(formData).subscribe(
          () => {
            alert('Event has been updated')
            //window.location.reload()
            this.router.navigateByUrl("/admin/events")
          },
          (error) => {
            alert('Failed to add Event')
          }
        )
      }
        

      

    }
  }

  getImage() {
    if (this.eventForm.get('Image')!.value) {
      return "/assets/Events/" + this.eventForm.get('Image')!.value;
    }
    return "";
  }

}
