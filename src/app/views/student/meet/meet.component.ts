import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/MesServices/Session/session.service';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit, OnDestroy {
  session: any = null;
  loading = true;
  error = '';
  idSession = 0;

  // 'lobby' | 'jitsi' | 'gmeet'
  mode: 'lobby' | 'jitsi' | 'gmeet' = 'lobby';
  private jitsiApi: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.idSession = Number(this.route.snapshot.paramMap.get('id'));
    this.sessionService.getSessionById(this.idSession).subscribe({
      next: (res: any) => {
        this.session = res;
        this.loading = false;
        // Auto-launch based on what the coach configured
        if (res.meetLink) {
          this.launchGoogleMeet();
        } else {
          this.launchJitsi();
        }
      },
      error: () => { this.error = 'Session not found.'; this.loading = false; }
    });
  }

  ngOnDestroy(): void {
    this.disposeJitsi();
  }

  // ── Google Meet ───────────────────────────────────────────────────────
  launchGoogleMeet(): void {
    this.mode = 'gmeet';
    window.open(this.session.meetLink, '_blank', 'noopener');
  }

  openMeetManually(): void {
    window.open(this.session.meetLink, '_blank', 'noopener');
  }

  // ── Jitsi ─────────────────────────────────────────────────────────────
  launchJitsi(): void {
    this.mode = 'jitsi';
    setTimeout(() => this.initJitsi(), 80);
  }

  private initJitsi(): void {
    const container = document.getElementById('jitsi-embed');
    if (!container) return;
    const room = this.session?.GeneratedLink || String(this.idSession);

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
    this.mode = 'lobby';
  }

  private disposeJitsi(): void {
    if (this.jitsiApi) {
      try { this.jitsiApi.dispose(); } catch (_) {}
      this.jitsiApi = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/student/calendar']);
  }

  formatDate(d: any): string {
    if (!d) return '';
    const date = Array.isArray(d)
      ? new Date(d[0], d[1] - 1, d[2], d[3] ?? 0, d[4] ?? 0)
      : new Date(d);
    return date.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' });
  }
}
