import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Event } from 'src/app/Models/Event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event!: Event
  userLoggedIn: boolean = false
  userRegistered: boolean = false
  id!: number
  idUser!: number

  constructor(
    private _eventService: EventService,
     private route: ActivatedRoute,
     private userAuthService: UserAuthService,
     private router: Router ) {
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne()
    this.userLoggedIn = this.userAuthService.isLoggedIn1()

    if (this.userLoggedIn) {
      this.idUser = this.userAuthService.getId()
      this.checkRegisteredToEvent()
    }
  }

  getOne() {
    this._eventService.getOne(this.id).subscribe(
      data => {
        this.event = data
    })
  }

  getImage(imageName: string) {
    return "assets/Events/" + imageName
  }

  redirectToExternalURL(link: string) {
    window.location.href = link
  }

  scheduleEvent(eventId: number) {
    this._eventService.registerToEvent(eventId).subscribe(
      () => {
        Swal.fire({
          title: '',
          text: 'You are now registred to this event. Use the buttons to go to the Facebook Event or go to the Google meet',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.getOne()
        this.checkRegisteredToEvent()
      }
    )
  }

  unregisterFromEvent(eventId: number) {
    this._eventService.unregisterFromEvent(eventId).subscribe(
      () => {
        Swal.fire({
          title: '',
          text: 'You have unregistred from this event',
          icon: 'warning',
          confirmButtonText: 'Okay'
        });
        this.getOne()
        this.checkRegisteredToEvent()
      }
    )
  }

  checkRegisteredToEvent() {
    this._eventService.isUserRegisteredToEvent(this.id).subscribe(
      (bool) => {
        this.userRegistered = bool
        //console.log(bool);
      }
    )
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
        //console.log("Hello");
      }
    });
  }
}
