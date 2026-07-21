import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environement } from 'src/environement/environement.prod';

interface LogEntry {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  description: string;
  username: string;
  ipAddress: string;
  timestamp: string;
  statusCode: number;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit {
  logs: LogEntry[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 50;
  loading = false;

  // filters
  filterAction   = '';
  filterUsername = '';
  filterFrom     = '';
  filterTo       = '';

  // stats
  stats: { [key: string]: number } = {};

  readonly ACTIONS = ['LOGIN', 'CREATE', 'UPDATE', 'DELETE'];

  private filterTrigger = new Subject<void>();

  constructor(private http: HttpClient) {
    this.filterTrigger.pipe(debounceTime(400)).subscribe(() => {
      this.currentPage = 0;
      this.loadLogs();
    });
  }

  ngOnInit() {
    this.loadStats();
    this.loadLogs();
  }

  private headers() {
    const token = localStorage.getItem('jwtToken') || '';
    return { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) };
  }

  loadLogs() {
    this.loading = true;
    const params: any = { page: this.currentPage, size: this.pageSize };
    if (this.filterAction)   params.action   = this.filterAction;
    if (this.filterUsername) params.username  = this.filterUsername;
    if (this.filterFrom)     params.from      = this.filterFrom;
    if (this.filterTo)       params.to        = this.filterTo;

    const qs = new URLSearchParams(params).toString();
    this.http.get<Page<LogEntry>>(
      `${environement.BASE_URL}/logs?${qs}`, this.headers()
    ).subscribe({
      next: res => {
        this.logs          = res.content;
        this.totalElements = res.totalElements;
        this.totalPages    = res.totalPages;
        this.loading       = false;
      },
      error: () => { this.loading = false; }
    });
  }

  loadStats() {
    this.http.get<{ [k: string]: number }>(
      `${environement.BASE_URL}/logs/stats`, this.headers()
    ).subscribe(res => this.stats = res);
  }

  applyFilters() {
    this.filterTrigger.next();
  }

  clearFilters() {
    this.filterAction = this.filterUsername = this.filterFrom = this.filterTo = '';
    this.currentPage = 0;
    this.loadLogs();
  }

  goToPage(p: number) {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
    this.loadLogs();
  }

  actionClass(action: string): string {
    const map: { [k: string]: string } = {
      LOGIN: 'badge-login', CREATE: 'badge-create',
      UPDATE: 'badge-update', DELETE: 'badge-delete',
      ERROR: 'badge-error', LOGOUT: 'badge-logout'
    };
    return map[action] || 'badge-default';
  }

  statCount(action: string): number {
    return this.stats[action] || 0;
  }

  pages(): number[] {
    const total = Math.min(this.totalPages, 10);
    const start = Math.max(0, this.currentPage - 4);
    return Array.from({ length: total }, (_, i) => start + i).filter(p => p < this.totalPages);
  }
}
