import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) { }

  ajoutSession(session: Session, groupIds: number[]): Observable<any> {
    const groupIdParams = groupIds.join(',');
    const url = `${environement.BASE_URL}/sessions/addSession?groupIds=${groupIdParams}`;
    return this.http.post(url, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    const url = `${environement.BASE_URL}/sessions/deleteSession/${sessionId}`;
    return this.http.delete<void>(url);
  }
  getSessionsByDate(date: Date): Observable<any[]> {
    const formattedDate = this.formatDate(date);
    const url = `${environement.BASE_URL}/sessions/date/${formattedDate}`;
    return this.http.get<any[]>(url);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  getSessionsByUserId(userId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/users/${userId}`;
    return this.http.get<Session[]>(url);
  }
  getSessionsByFormateurId(formateurId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/formateur/${formateurId}`;
    return this.http.get<Session[]>(url);
  }
  getSessionsByGroupId(groupId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/byGroupId/${groupId}`;
    return this.http.get<Session[]>(url);
  }
  /*getSessionsByUserId(): Observable<Session[]> {
    const userId = this.localStorage.get('userId');
    const url = `${this.baseUrl}/sessions/users/${userId}`;
    return this.http.get<Session[]>(url);
  }*/

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${environement.BASE_URL}/sessions/getSessionById/${id}`);
  }

  getbybyGeneratedLink(generatedLink: string): Observable<Session> {
    const url = `${environement.BASE_URL}/sessions/byGeneratedLink/${generatedLink}`;
    return this.http.get<Session>(url);
  }
  getById2(id: number): Observable<any> {
    return this.http.get(`${environement.BASE_URL}/groups/session/${id}`);
  }
  getGroupsBySessionId(sessionId: number): Observable<Groups[]> {
    const url = `${environement.BASE_URL}/groups/session/${sessionId}`;
    return this.http.get<Groups[]>(url);
  }
  getUserPresenceStatus(sessionId: number): Observable<{ [key: number]: boolean }> {
    const url = `https://9antrabackend-production.up.railway.app/api/sessions/${sessionId}/userPresenceStatus`;
    return this.http.get<{ [key: number]: boolean }>(url);
  }

  getSessionByFormationId(id:any){
    return this.http.get(`${environement.BASE_URL}/sessions/byFormationId/${id}`)
  }

  getSessionByFormationCoachId(id:any){
    return this.http.get(`${environement.BASE_URL}/sessions/byFormationCoachId/${id}`)
  }

  getAllSessions(): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions`;
    return this.http.get<Session[]>(url);
  }
}


