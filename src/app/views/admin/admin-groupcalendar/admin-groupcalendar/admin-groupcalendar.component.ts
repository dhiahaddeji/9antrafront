import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-admin-groupcalendar',
  templateUrl: './admin-groupcalendar.component.html',
  styleUrls: ['./admin-groupcalendar.component.css'],
})
export class AdminGroupcalendarComponent implements OnInit {
  sessions: Session[] = [];
  selectedSession!: Session;
  groupId!: number;
  selectedFilter: string = 'all';
  groups: Groups[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number },
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.groupId = params['groupId'];
      console.log(this.groupId);
      this.retrieveSessions(this.groupId);
    });
  }
  applySessionFilter(sessions: Session[], selectedFilter: string): Session[] {
    switch (selectedFilter) {
      case 'upcoming':
        return sessions.filter(session => !this.isSessionExpired(session));
      case 'expired':
        return sessions.filter(session => this.isSessionExpired(session));
      default:
        return sessions;
    }
  }
  retrieveSessions(groupId: number): void {
    this.sessionService.getSessionsByGroupId(groupId).subscribe(
      (sessions: Session[]) => {
        sessions = this.applySessionFilter(sessions, this.selectedFilter);
        this.sessions = sessions;
        this.selectedSession = sessions[0];
        const currentDate = new Date();
        const nonExpiredSessions = sessions.filter(session => !this.isSessionExpired(session));
        const expiredSessions = sessions.filter(session => this.isSessionExpired(session));
        this.sessions = nonExpiredSessions.sort((a, b) => {
          const startDateA = new Date(a.startDate);
          const startDateB = new Date(b.startDate);
          return startDateA.getTime() - startDateB.getTime();
        });
        this.sessions.push(...expiredSessions);
  
       
      },
      (error) => {
        console.log('Error retrieving sessions:', error);
      }
    );    
  }
  isSessionExpired(session: Session): boolean {
    const currentDate = new Date();
    const sessionEndDate = new Date(session.finishDate); 
  
    return sessionEndDate < currentDate;
  }

  getGroupsBySessionId(sessionId: number): void {
    this.groupService.getGroupsBySessionId(sessionId).subscribe(
      (groups: Groups[]) => {
        this.groups = groups;
        console.log('Groups:', groups);
      },
      (error) => {
        console.log('Error retrieving groups:', error);
      }
    );
  }

  selectSession(session: Session) {
    this.selectedSession = session;
    const sessionId = session.id as number;
    this.getGroupsBySessionId(sessionId);
  }

  calculateDuration(session: Session): number {
    const start = new Date(session.startDate);
    const finish = new Date(session.finishDate);
    const duration = (finish.getTime() - start.getTime()) / (1000 * 60);
    return duration;
  }
}