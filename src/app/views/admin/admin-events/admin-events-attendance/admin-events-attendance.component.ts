import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/MesServices/Event/event.service';

@Component({
  selector: 'app-admin-events-attendance',
  templateUrl: './admin-events-attendance.component.html',
  styleUrls: ['./admin-events-attendance.component.css']
})
export class AdminEventsAttendanceComponent implements OnInit {


  users: any[] = []
  idEvent!: number

  constructor(private eventService: EventService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.idEvent = Number(this.route.snapshot.paramMap.get('eventId'))
    this.eventService.getUsersByEvent(this.idEvent).subscribe(
      (users: any) => {
        this.users = users
    })
  }

}
