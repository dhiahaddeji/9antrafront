import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  formationsInProgressCount: any;
  formationsCompletedCount: any = 0;
  eventsCount: any;
  userId: any;
  sessions: any[] = [];

  constructor(
    private projectService: ProjectService,
    private formationService: FormationsService,
    private authService: UserAuthService,
    private eventService: EventService,
    private sessionService: SessionService
  ) {
    this.userId = this.authService.getId();
  }

  ngOnInit() {
    this.getCountFormationsInProgressByUserId();
    this.getCountFormationsCompletedByUserId();
    this.getCountEventsByUserId();
    this.getSessionByFormationId();
  }

  getCountFormationsInProgressByUserId() {
    this.formationService.getCountFormationsInProgressByUserId(this.userId).subscribe({
      next: (res: any) => { this.formationsInProgressCount = res; },
      error: (err) => console.log(err)
    });
  }

  getCountFormationsCompletedByUserId() {
    this.formationService.getCountFormationsCompletedByUserId(this.userId).subscribe({
      next: (res: any) => { this.formationsCompletedCount = res; },
      error: (err) => console.log(err)
    });
  }

  getCountEventsByUserId() {
    this.eventService.getCountEventsByUserId(this.userId).subscribe({
      next: (res: any) => { this.eventsCount = res; },
      error: (err) => console.log(err)
    });
  }

  getSessionByFormationId() {
    this.sessionService.getSessionByFormationId(this.userId).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          // precompute month name once per session so template never calls a method
          this.sessions = (res as any[]).map(s => ({
            ...s,
            _monthName: MONTHS[parseInt(s.startDate?.substring(5, 7), 10) - 1] ?? ''
          }));
        } else {
          this.sessions = [];
        }
      },
      error: (err) => {
        console.warn('Sessions API error (non-critical):', err);
        this.sessions = []; // Set empty array to prevent crash
      }
    });
  }

  trackBySessionId(_: number, s: any) { return s.id; }
}
