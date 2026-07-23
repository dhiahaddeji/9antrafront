import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class MeetComponent implements OnInit, OnDestroy {
  session: any = null;
  loading = true;
  error = '';
  idSession: string = '';

  // Inline meet-link editing (coach only)
  editingLink = false;
  newMeetLink = '';
  savingLink = false;

  // Jitsi in-page embed
  jitsiActive = false;
  private jitsiApi: any = null;

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

  ngOnDestroy(): void {
    this.disposeJitsi();
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

  joinJitsi(): void {
    const room = this.session?.GeneratedLink || this.idSession;
    this.jitsiActive = true;
    setTimeout(() => this.initJitsi(room), 80);
  }

  private initJitsi(room: string): void {
    const container = document.getElementById('jitsi-embed');
    if (!container) return;

    const launch = () => {
      this.jitsiApi = new (window as any).JitsiMeetExternalAPI('meet.jit.si', {
        roomName: room,
        parentNode: container,
        width: '100%',
        height: '100%',
        configOverwrite: { startWithAudioMuted: true },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false }
      });
      this.jitsiApi.addEventListener('readyToClose', () => this.leaveJitsi());
    };

    if ((window as any).JitsiMeetExternalAPI) {
      launch();
    } else {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.onload = () => launch();
      document.head.appendChild(script);
    }
  }

  leaveJitsi(): void {
    this.disposeJitsi();
    this.jitsiActive = false;
  }

  private disposeJitsi(): void {
    if (this.jitsiApi) {
      try { this.jitsiApi.dispose(); } catch (_) {}
      this.jitsiApi = null;
    }
  }

  startEditLink(): void {
    this.newMeetLink = this.session?.meetLink || '';
    this.editingLink = true;
  }

  cancelEditLink(): void { this.editingLink = false; }

  saveMeetLink(): void {
    const link = this.newMeetLink.trim();
    if (!link || !link.startsWith('https://meet.google.com/')) return;
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
