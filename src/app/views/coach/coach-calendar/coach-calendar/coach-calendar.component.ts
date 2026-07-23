import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { Session } from 'src/app/Models/Session';
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
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    height: 'auto',
  };

  coachGroups: Groups[] = [];
  selectedGroupIds: number[] = [];
  sessionForm!: FormGroup;
  selectedEvent: any = null;
  selectedEventGroups: Groups[] = [];
  isLoading = false;

  showAddModal = false;
  showDetailModal = false;

  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sessionForm = this.fb.group({
      sessionName: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      meetLink: [''],
    });

    // Set the event source as a function so FullCalendar manages fetching.
    // refetchEvents() will re-call this function after any add/delete.
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

    this.loadGroups();
  }

  loadGroups(): void {
    const coachId = this.userAuthService.getId();
    this.groupService.getGroupsByFormateurId(coachId).subscribe({
      next: (groups) => { this.coachGroups = groups; },
      error: (err) => console.error('Error loading groups:', err),
    });
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

  handleDateSelect(selectInfo: DateSelectArg): void {
    const start = selectInfo.startStr.length === 10
      ? selectInfo.startStr + 'T09:00'
      : selectInfo.startStr.slice(0, 16);
    const end = selectInfo.startStr.length === 10
      ? selectInfo.startStr + 'T10:00'
      : selectInfo.endStr.slice(0, 16);

    this.sessionForm.reset();
    this.sessionForm.patchValue({ startDate: start, finishDate: end });
    this.selectedGroupIds = [];
    this.showAddModal = true;
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

  toggleGroup(groupId: number): void {
    const idx = this.selectedGroupIds.indexOf(groupId);
    if (idx === -1) this.selectedGroupIds.push(groupId);
    else this.selectedGroupIds.splice(idx, 1);
  }

  isGroupSelected(groupId: number): boolean {
    return this.selectedGroupIds.includes(groupId);
  }

  submitSession(): void {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      return;
    }
    if (this.selectedGroupIds.length === 0) {
      Swal.fire({ icon: 'warning', title: 'No group selected', text: 'Please assign the session to at least one group.' });
      return;
    }
    const val = this.sessionForm.value;
    const session = new Session();
    session.sessionName = val.sessionName;
    session.description = val.description;
    session.startDate = new Date(val.startDate);
    session.finishDate = new Date(val.finishDate);
    session.meetLink = val.meetLink?.trim() || undefined;
    this.isLoading = true;
    this.sessionService.ajoutSession(session, this.selectedGroupIds).subscribe({
      next: () => {
        this.isLoading = false;
        this.showAddModal = false;
        this.refetch();
        Swal.fire({ icon: 'success', title: 'Session added!', timer: 1500, showConfirmButton: false });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not save session.' });
      },
    });
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

  openAddModal(): void {
    this.sessionForm.reset({ sessionName: '', description: '', startDate: '', finishDate: '', meetLink: '' });
    this.selectedGroupIds = [];
    this.showAddModal = true;
  }
}
