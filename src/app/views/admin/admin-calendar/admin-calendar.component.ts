import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';
import Swal from 'sweetalert2';

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  monthOffset: number;
  isToday: boolean;
  sessions: any[];
}

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
})
export class AdminCalendarComponent implements OnInit {
  // ── data ──────────────────────────────────────────────────────
  sessions: any[] = [];
  selectedSession: any;
  sessionGroups: Groups[] = [];
  currentDate!: Date;
  durationInMinutes!: any;
  databaseDate!: Date;
  selectedFilter: string = 'all';

  // ── calendar state ─────────────────────────────────────────────
  currentMonth!: number;
  currentYear!: number;
  calendarDays: CalendarDay[] = [];
  calendarWeeks: CalendarDay[][] = [];
  selectedDay: CalendarDay | null = null;
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.currentDate = now;
    this.buildCalendar();
    const todayDay = this.calendarDays.find(d => d.isToday && d.monthOffset === 0);
    if (todayDay) this.selectDay(todayDay);
    this.retrieveSessions();
  }

  // ── session loading ────────────────────────────────────────────
  retrieveSessions(): void {
    this.currentDate = new Date();
    this.sessionService.getAllSessions().subscribe({
      next: (sessions: Session[]) => {
        // precompute derived fields once
        const now = new Date();
        (sessions as any[]).forEach(s => {
          s._expired = new Date(s.finishDate) < now;
          const start = new Date(s.startDate).getTime();
          const finish = new Date(s.finishDate).getTime();
          s._duration = Math.round((finish - start) / 60000);
        });

        sessions = this.applySessionFilter(sessions, this.selectedFilter);
        const upcoming = (sessions as any[]).filter(s => !s._expired)
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        const expired = (sessions as any[]).filter(s => s._expired);
        this.sessions = [...upcoming, ...expired];

        this.buildCalendar();

        const todayDay = this.calendarDays.find(d => d.isToday && d.monthOffset === 0 && d.sessions.length > 0);
        if (todayDay) {
          this.selectDay(todayDay);
        } else {
          const first = this.calendarDays.find(d => d.monthOffset === 0 && d.sessions.length > 0);
          if (first) this.selectDay(first);
        }
      },
      error: (err) => console.log('Error retrieving sessions:', err)
    });
  }

  applySessionFilter(sessions: Session[], filter: string): Session[] {
    switch (filter) {
      case 'upcoming': return (sessions as any[]).filter(s => !s._expired);
      case 'expired':  return (sessions as any[]).filter(s => s._expired);
      default:         return sessions;
    }
  }

  isSessionExpired(session: any): boolean {
    return session._expired ?? (new Date(session.finishDate) < new Date());
  }

  calculateDuration(session: any): number {
    return session._duration ?? Math.round(
      (new Date(session.finishDate).getTime() - new Date(session.startDate).getTime()) / 60000
    );
  }

  getGroupsForSession(sessionId: number): void {
    this.groupService.getGroupsBySessionId(sessionId).subscribe({
      next: (groups: Groups[]) => { this.sessionGroups = groups; },
      error: (err) => console.log('Error retrieving groups:', err)
    });
  }

  selectSession(session: Session): void {
    this.databaseDate = new Date(session.startDate);
    this.durationInMinutes = this.calculateDuration(session);
    this.selectedSession = session;
    if (session?.id) this.getGroupsForSession(session.id);
    else this.sessionGroups = [];
  }

  editSession(session: any): void {
    this.router.navigate(['/admin/sessionform', session.id]);
  }

  deleteSession(session: any): void {
    Swal.fire({
      title: 'Delete Session?',
      text: `Are you sure you want to delete "${session.sessionName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.deleteSession(session.id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Session has been deleted.', 'success');
            this.retrieveSessions();
          },
          error: (err) => {
            Swal.fire('Error!', 'Failed to delete session.', 'error');
            console.log('Error deleting session:', err);
          }
        });
      }
    });
  }

  // ── calendar building ──────────────────────────────────────────
  buildCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay  = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const days: CalendarDay[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      days.push(this.makeDay(new Date(this.currentYear, this.currentMonth, -i), -1));
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(this.makeDay(new Date(this.currentYear, this.currentMonth, d), 0));
    }
    const rem = 7 - (days.length % 7);
    if (rem < 7) {
      for (let d = 1; d <= rem; d++) {
        days.push(this.makeDay(new Date(this.currentYear, this.currentMonth + 1, d), 1));
      }
    }
    this.calendarDays = days;

    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
    this.calendarWeeks = weeks;
  }

  makeDay(date: Date, monthOffset: number): CalendarDay {
    return {
      date,
      dayNumber: date.getDate(),
      monthOffset,
      isToday: date.toDateString() === new Date().toDateString(),
      sessions: this.getSessionsForDate(date),
    };
  }

  getSessionsForDate(date: Date): any[] {
    const key = date.toDateString();
    return this.sessions.filter(s => new Date(s.startDate).toDateString() === key);
  }

  // ── navigation ─────────────────────────────────────────────────
  prevMonth(): void {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else { this.currentMonth--; }
    this.selectedDay = null;
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else { this.currentMonth++; }
    this.selectedDay = null;
    this.buildCalendar();
  }

  goToToday(): void {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.selectedDay = null;
    this.buildCalendar();
    const todayDay = this.calendarDays.find(d => d.isToday && d.monthOffset === 0);
    if (todayDay) this.selectDay(todayDay);
  }

  selectDay(day: CalendarDay): void {
    this.selectedDay = day;
    if (day.sessions.length > 0) this.selectSession(day.sessions[0]);
    else this.sessionGroups = [];
  }

  get currentMonthName(): string {
    return this.monthNames[this.currentMonth];
  }

  // trackBy functions
  trackByDay(_: number, day: CalendarDay) { return day.date.getTime(); }
  trackByWeek(i: number) { return i; }
  trackBySession(_: number, s: any) { return s.id; }
  trackByGroup(_: number, g: Groups) { return g.id; }
}
