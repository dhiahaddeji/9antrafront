import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const CALENDAR_ID = 'contact@9antra.tn';

@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css'],
})
export class StudentCalendarComponent {
  embedUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const src = encodeURIComponent(CALENDAR_ID);
    const url = `https://calendar.google.com/calendar/embed?src=${src}&ctz=Africa%2FTunis&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&showTz=0`;
    this.embedUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
