import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EventService } from 'src/app/MesServices/Event/event.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.css']
})
export class CoachHomeComponent implements OnInit {
  completedTraining: number = 0;
  progressTraining: number = 0;
  eventsCount: number = 0;
  sessions: any[] = [];
  coachProfile: any = null;
  loading = true;

  private userId: any;

  constructor(
    private formationService: FormationsService,
    private authService: UserAuthService,
    private eventService: EventService,
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.userId = this.authService.getId();
  }

  ngOnInit() {
    forkJoin({
      profile:    this.userService.getUserById(this.userId),
      completed:  this.formationService.getCountFormationsCompletedCoach(this.userId),
      inProgress: this.formationService.getCountFormationsInProgressCoach(this.userId),
      events:     this.eventService.getCountEventsByUserId(this.userId),
      sessions:   this.sessionService.getSessionByFormationCoachId(this.userId),
    }).subscribe({
      next: (data: any) => {
        this.coachProfile      = data.profile;
        this.completedTraining = data.completed ?? 0;
        this.progressTraining  = data.inProgress ?? 0;
        this.eventsCount       = data.events ?? 0;
        this.sessions          = (data.sessions ?? []).map((s: any) => ({
          ...s,
          _startDate: this.parseDate(s.startDate),
          _endDate:   this.parseDate(s.finishDate),
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Coach dashboard error:', err);
        this.loading = false;
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

  getSessionMonth(d: Date | null): string {
    if (!d) return '';
    return d.toLocaleString('en-US', { month: 'long' });
  }

  getSessionDay(d: Date | null): string {
    if (!d) return '';
    return String(d.getDate()).padStart(2, '0');
  }

  getSessionTime(d: Date | null): string {
    if (!d) return '';
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  trackById(_: number, s: any) { return s.id; }
}
