import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const CALENDAR_ID = '383ff923cf38fcb8b1e547ff3954f22de77a5ac2222f475594ac3ce7dc1e7a09@group.calendar.google.com';

@Component({
  selector: 'app-coach-calendar',
  templateUrl: './coach-calendar.component.html',
  styleUrls: ['./coach-calendar.component.css'],
})
export class CoachCalendarComponent {
  embedUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const src = encodeURIComponent(CALENDAR_ID);
    const url = `https://calendar.google.com/calendar/embed?src=${src}&ctz=Africa%2FTunis&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&showTz=0`;
    this.embedUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
