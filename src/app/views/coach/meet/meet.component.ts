import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {
  session: any = null;
  loading = true;
  error = '';
  idSession: string = '';

  // Inline meet-link editing (coach only)
  editingLink = false;
  newMeetLink = '';
  savingLink = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private userAuth: UserAuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idSession = this.route.snapshot.paramMap.get('id') || '';
    this.sessionService.getbybyGeneratedLink(this.idSession).subscribe({
      next: (res: any) => { this.session = res; this.loading = false; },
      error: () => { this.error = 'Session not found.'; this.loading = false; }
    });
  }

  get isCoach(): boolean {
    const roles: string[] = this.userAuth.getRoles1() || [];
    return roles.some(r => r === 'FORMATEUR' || r === 'ADMINISTRATEUR');
  }

  joinMeet(): void {
    if (this.session?.meetLink) {
      window.open(this.session.meetLink, '_blank', 'noopener');
    }
  }

  startEditLink(): void {
    this.newMeetLink = this.session?.meetLink || '';
    this.editingLink = true;
  }

  cancelEditLink(): void { this.editingLink = false; }

  saveMeetLink(): void {
    const link = this.newMeetLink.trim();
    if (!link || !link.startsWith('https://meet.google.com/')) {
      return;
    }
    this.savingLink = true;
    const token = localStorage.getItem('jwtToken') || '';
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    this.http.patch(
      `${environement.BASE_URL}/session/${this.session.id}/meetLink`,
      { meetLink: link },
      { headers }
    ).subscribe({
      next: () => {
        this.session.meetLink = link;
        this.editingLink = false;
        this.savingLink = false;
      },
      error: () => { this.savingLink = false; }
    });
  }

  goBack(): void {
    this.router.navigate(['/coach/calendar']);
  }

  formatDate(d: any): string {
    if (!d) return '';
    const date = Array.isArray(d)
      ? new Date(d[0], d[1] - 1, d[2], d[3] ?? 0, d[4] ?? 0)
      : new Date(d);
    return date.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' });
  }
}
