import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { Event } from '../../../../Models/Event'
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit{

  events: Event[] = []
  registeredEvents: Event[] = []
  userLoggedIn: boolean = false
  idUser!: number
  showLoader: boolean = true

  constructor(
    private eventsService: EventService,
     private userAuthService: UserAuthService,
     private navbarLoaderService: NavbarLoaderCommunicationService,
     private router: Router) {}

  ngOnInit(): void {
    this.getAll()
    this.userLoggedIn = this.userAuthService.isLoggedIn1()
    if(this.userLoggedIn) {
      this.idUser = this.userAuthService.getId()

      this.getRegisteredEvents()
    }
  }

  async getRegisteredEvents(): Promise<void> {
    try {
      const data = await this.eventsService.getEventsByUser(this.idUser).toPromise();
      this.registeredEvents = data || [];
    } catch (error) {
      console.error("Error fetching registered events:", error);
      throw error;
    }
  }


  getAll() {
    this.eventsService.getEvents().subscribe(
      (data: any) => {
        this.events = data
        this.showLoader=false;
      },
      (error) => {
        alert(error);
      }
    )
  }

  getImage(imageName: string) {
    return "assets/Events/" + imageName
  }


  redirectToExternalURL(link: string) {
    window.location.href = link
  }

  checkRegistered(idEvent: number): boolean {
    if(this.userLoggedIn) {
      return this.registeredEvents.some(event => event.id === idEvent)
    }
     return false
  }

  scheduleEvent(eventId: number) {
    this.eventsService.registerToEvent(eventId).subscribe(
      () => {
        Swal.fire({
          title: '',
          text: 'You are now registred to this event. Use the buttons to go to the Facebook Event or go to the Google meet',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.getAll()
        this.getRegisteredEvents()
      }
    )
  }

  unregisterFromEvent(eventId: number) {
    this.eventsService.unregisterFromEvent(eventId).subscribe(
      () => {
        Swal.fire({
          title: '',
          text: 'You have unregistred from this event',
          icon: 'warning',
          confirmButtonText: 'Okay'
        });
        this.getAll()
        this.getRegisteredEvents()
      }
    )
  }

  load() {
    setTimeout(() => {
      this.showLoader = false
    }, 1000);
  }

  login() {
    Swal.fire({
      title: '',
      text: 'You have to login',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#AF3065'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }



}
