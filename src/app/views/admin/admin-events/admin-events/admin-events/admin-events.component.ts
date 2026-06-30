import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/Event';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit{

  events: any[] = [];

  constructor(public eventService: EventService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.eventService.getEvents().subscribe( 
      data => {
        this.events = data
      }
    )
  }

  getImage(imageName: string) {
    return "assets/Events/" + imageName
  }

  deleteEvent(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe( 
          () => {
            Swal.fire('Deleted!', 'Your Event has been deleted.', 'success');
            this.getAll()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting Event', 'error');
            this.getAll()
          }
        )
      }
    });


    
  }

  editItem(id: number) {
    this.router.navigate(['/admin/updateEvent', id]);
  }

  redirectToExternalURL(link: string) {
    window.location.href = link
  }

  redirectToList(idEvent: number) {
    this.router.navigate(['admin/events', idEvent,'attendance']);
  }

}
