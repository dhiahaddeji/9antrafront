import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coach-calendar',
  templateUrl: './coach-calendar.component.html',
  styleUrls: ['./coach-calendar.component.css'],
})
export class CoachCalendarComponent implements OnInit {
  @ViewChild('calendarEl') calendarRef!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: false,
    selectable: false,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    height: 'auto',
  };

  selectedEvent: any = null;
  selectedEventGroups: Groups[] = [];

  showDetailModal = false;

  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    // Set the event source as a function so FullCalendar manages fetching.
    // refetchEvents() will re-call this function after any delete.
    const coachId = this.userAuthService.getId();
    this.calendarOptions = {
      ...this.calendarOptions,
      events: (info: any, successCallback: any, failureCallback: any) => {
        this.sessionService.getSessionsByFormateurId(coachId).subscribe({
          next: (sessions: any[]) => {
            successCallback((sessions ?? []).map(s => this.toEvent(s)));
          },
          error: (err: any) => {
            failureCallback(err);
          },
        });
      },
    };
  }

  /** Tell FullCalendar to re-call the event source function */
  private refetch(): void {
    this.calendarRef?.getApi().refetchEvents();
  }

  /** Map a raw session object from the API to a FullCalendar EventInput */
  private toEvent(s: any): EventInput {
    const start = this.parseDate(s.startDate);
    const end   = this.parseDate(s.finishDate);
    const expired = end ? end < new Date() : false;
    return {
      id:    String(s.id),
      title: s.sessionName,
      start: start ?? undefined,
      end:   end   ?? undefined,
      extendedProps: { description: s.description, session: s },
      backgroundColor: expired ? '#94a3b8' : '#af3065',
      borderColor:     expired ? '#94a3b8' : '#8b1f4e',
    };
  }

  /** Handle ISO strings, timestamps, and Java LocalDateTime arrays [y,m,d,h,min,s] */
  private parseDate(raw: any): Date | null {
    if (!raw) return null;
    if (raw instanceof Date) return raw;
    if (Array.isArray(raw)) {
      return new Date(raw[0], raw[1] - 1, raw[2], raw[3] ?? 0, raw[4] ?? 0, raw[5] ?? 0);
    }
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const session = clickInfo.event.extendedProps['session'];
    this.selectedEvent = { ...session, eventId: clickInfo.event.id };
    this.selectedEventGroups = [];
    if (session?.id) {
      this.groupService.getGroupsBySessionId(session.id).subscribe({
        next: (groups) => { this.selectedEventGroups = groups; },
      });
    }
    this.showDetailModal = true;
  }

  deleteSession(): void {
    if (!this.selectedEvent?.id) return;
    Swal.fire({
      title: 'Delete this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.deleteSession(this.selectedEvent.id).subscribe({
          next: () => {
            this.showDetailModal = false;
            this.refetch();
            Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false });
          },
        });
      }
    });
  }

  isExpired(session: any): boolean {
    return new Date(session?.finishDate) < new Date();
  }
}
