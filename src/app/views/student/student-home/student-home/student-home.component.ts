import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
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
  formationsInProgressCount: number = 0;
  formationsCompletedCount:  number = 0;
  eventsCount: number = 0;
  sessions: any[] = [];
  loading = true;

  private userId: any;

  constructor(
    private formationService: FormationsService,
    private authService: UserAuthService,
    private eventService: EventService,
    private sessionService: SessionService
  ) {
    this.userId = this.authService.getId();
  }

  ngOnInit() {
    forkJoin({
      inProgress: this.formationService.getCountFormationsInProgressByUserId(this.userId).pipe(catchError(() => of(0))),
      completed:  this.formationService.getCountFormationsCompletedByUserId(this.userId).pipe(catchError(() => of(0))),
      events:     this.eventService.getCountEventsByUserId(this.userId).pipe(catchError(() => of(0))),
      sessions:   this.sessionService.getSessionByFormationId(this.userId).pipe(catchError(() => of([]))),
    }).subscribe({
      next: (data: any) => {
        this.formationsInProgressCount = data.inProgress ?? 0;
        this.formationsCompletedCount  = data.completed  ?? 0;
        this.eventsCount               = data.events     ?? 0;

        const raw: any[] = data.sessions ?? [];
        this.sessions = raw.map(s => {
          const start = this.parseDate(s.startDate);
          const end   = this.parseDate(s.finishDate);
          return {
            ...s,
            _start:     start,
            _end:       end,
            _monthName: start ? MONTHS[start.getMonth()] : '',
            _day:       start ? String(start.getDate()).padStart(2, '0') : '',
            _timeFrom:  start ? this.fmt(start) : '',
            _timeTo:    end   ? this.fmt(end)   : '',
            _coachImg:  s.formation?.user?.image ?? null,
            _coachName: s.formation?.user
              ? `${s.formation.user.firstName ?? ''} ${s.formation.user.lastName ?? ''}`.trim()
              : 'Coach',
          };
        });

        this.loading = false;
      },
      error: (err) => {
        console.warn('Student dashboard error (non-critical):', err);
        this.sessions = [];
        this.loading  = false;
      }
    });
  }

  /** Handles both ISO strings and Java LocalDateTime arrays [y, m, d, h, min] */
  private parseDate(raw: any): Date | null {
    if (!raw) return null;
    if (raw instanceof Date) return raw;
    if (Array.isArray(raw)) {
      return new Date(raw[0], raw[1] - 1, raw[2], raw[3] ?? 0, raw[4] ?? 0);
    }
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }

  private fmt(d: Date): string {
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  trackBySessionId(_: number, s: any) { return s.id; }
}
