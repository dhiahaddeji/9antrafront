import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Formation } from 'src/app/Models/formation.model';
import { Groups } from 'src/app/Models/group.model';
import { environement } from 'src/environement/environement.dev';

const CALENDAR_ID = 'contact@9antra.tn';

@Component({
  selector: 'app-admin-sessionform',
  templateUrl: './admin-sessionform.component.html',
  styleUrls: ['./admin-sessionform.component.css'],
})
export class AdminSessionformComponent implements OnInit {
  embedUrl: SafeResourceUrl;

  // form fields
  sessionDate = '';
  sessionTime = '';
  sessionDuration = 2;
  sessionName = '';
  sessionDescription = '';
  selectedGroups: Groups[] = [];
  formations: any[] = [];
  selectedTraining!: number;
  groups: any[] = [];
  formateurs: any[] = [];
  selectedFormateurId: number | null = null;

  // dialog state
  showDialog = false;
  dialogStep = 1;
  isCreating = false;
  showDeleteConfirm = false;
  sessionToDelete: any = null;

  constructor(
    private http: HttpClient,
    sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private formationsService: FormationsService,
    private groupService: GroupService,
    private sessionService: SessionService
  ) {
    const src = encodeURIComponent(CALENDAR_ID);
    const url = `https://calendar.google.com/calendar/embed?src=${src}&ctz=Africa%2FTunis&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&showTz=0`;
    this.embedUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getFormations();
    this.getFormateurs();
  }

  getFormations(): void {
    this.formationsService.getFormations().subscribe((res: any) => {
      this.formations = res;
      if (res.length) this.selectedTraining = res[0].id;
    });
  }

  getFormateurs(): void {
    this.http.get<any[]>(`${environement.BASE_URL}/formateur/all`).subscribe(
      res => this.formateurs = res,
      () => {}
    );
  }

  openSessionDialog() {
    this.resetForm();
    this.showDialog = true;
    this.dialogStep = 1;
  }

  goToStep2() {
    if (!this.sessionName?.trim()) { this.snack('Session name is required'); return; }
    if (!this.sessionDescription?.trim()) { this.snack('Description is required'); return; }
    if (!this.sessionDate) { this.snack('Please select a date'); return; }
    if (!this.sessionTime) { this.snack('Start time is required'); return; }
    if (!this.sessionDuration || this.sessionDuration < 1) { this.snack('Duration must be at least 1 hour'); return; }
    if (!this.selectedTraining) { this.snack('Please select a training'); return; }

    const [y, m, d] = this.sessionDate.split('-').map(Number);
    const [h, min] = this.sessionTime.split(':').map(Number);
    const start = new Date(y, m - 1, d, h, min);
    if (start < new Date()) { this.snack('Please select a future date and time'); return; }

    const sel = this.formations.find(f => f.id === Number(this.selectedTraining));
    if (!sel) { this.snack('Invalid training selected'); return; }

    this.groupService.getGroupsByFormation(sel.id).subscribe(
      (groups: any[]) => {
        // filter by selected coach if one is chosen
        if (this.selectedFormateurId) {
          this.groups = groups.filter(g =>
            g.formateur && g.formateur.id === Number(this.selectedFormateurId)
          );
        } else {
          this.groups = groups;
        }
        this.dialogStep = 2;
      },
      () => this.snack('Failed to load groups')
    );
  }

  createSession() {
    if (this.selectedGroups.length === 0) { this.snack('Please select at least one group'); return; }

    const [y, m, d] = this.sessionDate.split('-').map(Number);
    const [h, min] = this.sessionTime.split(':').map(Number);
    const start = new Date(y, m - 1, d, h, min);
    const finish = new Date(start.getTime() + this.sessionDuration * 3600000);

    const formation = new Formation();
    formation.id = this.selectedTraining;

    const session: Session = {
      sessionName: this.sessionName,
      description: this.sessionDescription,
      startDate: start,
      finishDate: finish,
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
        this.snack('Session created — it will appear in the calendar shortly', true);
      },
      (err) => {
        this.isCreating = false;
        this.snack('Error: ' + (err?.error?.message || err?.message || 'Failed to create session'));
      }
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

  getFormateurName(f: any): string {
    return f?.user ? `${f.user.firstName} ${f.user.lastName}` : `Coach #${f?.id}`;
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
    this.sessionDate = '';
    this.selectedGroups = [];
    this.selectedFormateurId = null;
    if (this.formations.length) this.selectedTraining = this.formations[0].id;
  }

  private snack(msg: string, success = false) {
    this.snackBar.open(msg, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snack-success'] : ['snack-error'],
    });
  }
}
