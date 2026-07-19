import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Formation } from 'src/app/Models/formation.model';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-admin-sessionform',
  templateUrl: './admin-sessionform.component.html',
  styleUrls: ['./admin-sessionform.component.css'],
})
export class AdminSessionformComponent implements OnInit {
  // calendar
  currentMonth!: string;
  daysInMonth!: number[];
  dayNames!: string[];
  daysOffset!: number[];
  currentDate!: Date;
  currentYear!: number;
  selectedDay!: number | null;

  // form fields
  sessionTime = '';
  sessionDuration = 2;
  sessionName = '';
  sessionDescription = '';
  selectedGroups: Groups[] = [];
  formations: any[] = [];
  selectedTraining!: number;
  groups: any[] = [];
  sessionDetails: any[] = [];

  // dialog state
  showDialog = false;
  dialogStep = 1;
  isCreating = false;
  showConfirmToday = false;
  showDeleteConfirm = false;
  sessionToDelete: any = null;

  constructor(
    private snackBar: MatSnackBar,
    private formationsService: FormationsService,
    private groupService: GroupService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.getFormations();
    this.currentDate = new Date();
    this.updateMonth(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();
  }

  // ── Calendar ──────────────────────────────────────────────────────────────

  goToPreviousMonth() {
    const idx = this.getMonthIndex(this.currentMonth);
    const prev = idx === 0 ? 11 : idx - 1;
    const year = prev === 11 ? this.currentDate.getFullYear() - 1 : this.currentDate.getFullYear();
    this.currentDate = new Date(year, prev);
    this.updateMonth(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();
    this.sessionDetails = [];
  }

  goToNextMonth() {
    const idx = this.getMonthIndex(this.currentMonth);
    const next = idx === 11 ? 0 : idx + 1;
    const year = next === 0 ? this.currentDate.getFullYear() + 1 : this.currentDate.getFullYear();
    this.currentDate = new Date(year, next);
    this.updateMonth(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();
    this.sessionDetails = [];
  }

  private updateMonth(date: Date) {
    this.currentMonth = this.getMonthName(date.getMonth());
    this.daysInMonth = this.getDaysInMonth(date.getFullYear(), date.getMonth());
    this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.daysOffset = this.getDaysOffset(date.getFullYear(), date.getMonth());
    this.selectedDay = null;
  }

  selectDay(day: number) {
    this.selectedDay = day;
    const selectedDate = new Date(this.currentYear, this.getMonthIndex(this.currentMonth), day);
    this.fetchSessionDetails(selectedDate);
  }

  isToday(day: number): boolean {
    const now = new Date();
    return day === now.getDate()
      && this.getMonthIndex(this.currentMonth) === now.getMonth()
      && this.currentYear === now.getFullYear();
  }

  private getMonthName(month: number): string {
    return ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
            'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'][month];
  }

  private getMonthIndex(name: string): number {
    return ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
            'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'].indexOf(name);
  }

  private getDaysInMonth(year: number, month: number): number[] {
    return Array(new Date(year, month + 1, 0).getDate()).fill(0).map((_, i) => i + 1);
  }

  private getDaysOffset(year: number, month: number): number[] {
    return Array(new Date(year, month, 1).getDay()).fill(null);
  }

  calculateDuration(startDate: Date, finishDate: Date): string {
    const ms = new Date(finishDate).getTime() - new Date(startDate).getTime();
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  }

  // ── Data ──────────────────────────────────────────────────────────────────

  getFormations(): void {
    this.formationsService.getFormations().subscribe((res: any) => {
      this.formations = res;
      if (res.length) this.selectedTraining = res[0].id;
    });
  }

  fetchSessionDetails(date: Date) {
    const utc = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    this.sessionService.getSessionsByDate(utc).subscribe(
      (sessions: Session[]) => {
        this.sessionDetails = sessions;
        sessions.forEach(s => {
          s.groups = [];
          if (s.id) {
            this.groupService.getGroupsBySessionId(s.id).subscribe(g => s.groups = g);
          }
        });
      },
      () => {}
    );
  }

  // ── Dialog flow ───────────────────────────────────────────────────────────

  openSessionDialog() {
    if (!this.selectedDay) {
      this.snack('Please select a date first'); return;
    }
    const sel = new Date(this.currentYear, this.getMonthIndex(this.currentMonth), this.selectedDay);
    const now = new Date();
    if (sel < now && sel.toDateString() !== now.toDateString()) {
      this.snack('Please select a future date'); return;
    }
    if (sel.toDateString() === now.toDateString()) {
      this.showConfirmToday = true; return;
    }
    this.resetForm();
    this.showDialog = true;
    this.dialogStep = 1;
  }

  confirmAddSessionToday() {
    this.showConfirmToday = false;
    this.resetForm();
    this.showDialog = true;
    this.dialogStep = 1;
  }

  cancelAddSessionToday() {
    this.showConfirmToday = false;
  }

  goToStep2() {
    if (!this.sessionName?.trim()) { this.snack('Session name is required'); return; }
    if (!this.sessionDescription?.trim()) { this.snack('Description is required'); return; }
    if (!this.sessionTime) { this.snack('Start time is required'); return; }
    if (!this.sessionDuration || this.sessionDuration < 1) { this.snack('Duration must be at least 1 hour'); return; }
    if (!this.selectedTraining) { this.snack('Please select a training'); return; }

    const sel = this.formations.find(f => f.id === Number(this.selectedTraining));
    if (!sel) { this.snack('Invalid training selected'); return; }

    this.groupService.getGroupsByFormation(sel.id).subscribe(
      groups => { this.groups = groups; this.dialogStep = 2; },
      () => this.snack('Failed to load groups')
    );
  }

  createSession() {
    if (this.selectedGroups.length === 0) { this.snack('Please select at least one group'); return; }
    if (!this.selectedDay) { this.snack('No date selected'); return; }

    const [h, m] = this.sessionTime.split(':').map(Number);
    const start = new Date(this.currentYear, this.getMonthIndex(this.currentMonth), this.selectedDay, h, m);
    const now = new Date();
    if (start < now) { this.snack('Please select a future time'); return; }

    const offset = start.getTimezoneOffset() * 60000;
    const startUTC = new Date(start.getTime() - offset);
    const finishUTC = new Date(startUTC.getTime() + this.sessionDuration * 3600000);
    const frontOffset = new Date().getTimezoneOffset() * 60000;

    const formation = new Formation();
    formation.id = this.selectedTraining;

    const session: Session = {
      sessionName: this.sessionName,
      description: this.sessionDescription,
      startDate: new Date(startUTC.getTime() + frontOffset),
      finishDate: new Date(finishUTC.getTime() + frontOffset),
      groups: this.selectedGroups,
      userPresence: {},
      formation,
    };

    const groupIds = this.selectedGroups.map(g => Number(g.id));
    this.isCreating = true;
    this.sessionService.ajoutSession(session, groupIds).subscribe(
      () => {
        this.isCreating = false;
        this.closeAll();
        this.snack('Session created successfully', true);
        this.fetchSessionDetails(new Date(this.currentYear, this.getMonthIndex(this.currentMonth), this.selectedDay!));
      },
      () => { this.isCreating = false; this.snack('Failed to create session'); }
    );
  }

  deleteSession(session: any) {
    this.sessionToDelete = session;
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    if (!this.sessionToDelete?.id) return;
    this.sessionService.deleteSession(this.sessionToDelete.id).subscribe(
      () => {
        this.sessionDetails = this.sessionDetails.filter(s => s.id !== this.sessionToDelete.id);
        this.showDeleteConfirm = false;
        this.sessionToDelete = null;
        this.snack('Session deleted', true);
      },
      () => this.snack('Failed to delete session')
    );
  }

  selectGroup(group: Groups) {
    const i = this.selectedGroups.findIndex(g => g.id === group.id);
    if (i !== -1) this.selectedGroups.splice(i, 1);
    else this.selectedGroups.push(group);
  }

  isGroupSelected(group: Groups): boolean {
    return this.selectedGroups.some(g => g.id === group.id);
  }

  getSelectedTrainingName(): string {
    const f = this.formations.find(f => f.id === Number(this.selectedTraining));
    return f ? f.nomFormation : '';
  }

  closeAll() {
    this.showDialog = false;
    this.dialogStep = 1;
    this.selectedGroups = [];
  }

  private resetForm() {
    this.sessionName = '';
    this.sessionDescription = '';
    this.sessionTime = '';
    this.sessionDuration = 2;
    this.selectedGroups = [];
    if (this.formations.length) this.selectedTraining = this.formations[0].id;
  }

  private snack(msg: string, success = false) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snack-success'] : ['snack-error'],
    });
  }
}
