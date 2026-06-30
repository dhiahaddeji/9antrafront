import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, catchError, of } from 'rxjs';
import { Groups } from 'src/app/Models/group.model';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private groupDataSubject = new BehaviorSubject<Groups[]>([]);
  groupData$ = this.groupDataSubject.asObservable();
  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${environement.BASE_URL}/groups/all`);
  }

  updateGroupData(groups: Groups[]): void {
    this.groupDataSubject.next(groups);
  }
  addGroups(groups: Groups): Observable<Groups> {
    return this.http.post<Groups>(
      `${environement.BASE_URL}/groups/add`,
      groups
    );
  }
  getGroupsBySessionId(sessionId: number): Observable<Groups[]> {
    return this.http.get<Groups[]>(
      `${environement.BASE_URL}/groups/session/${sessionId}`
    );
  }

  getGroupsById(id: number): Observable<Groups> {
    return this.http.get<Groups>(`${environement.BASE_URL}/groups/${id}`);
  }
  updateGroups(groups: Groups): Observable<Groups> {
    return this.http.put<Groups>(
      `${environement.BASE_URL}/api/Groups/updateGroups`,
      groups
    );
  }
  checkIfGroupNameExists(groupName: string) {
    const url = `${environement.BASE_URL}/groups/check-existence?groupName=${groupName}`;
    return this.http.get<boolean>(url);
  }
  deleteGroups(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environement.BASE_URL}/groups/${id}`
    );
  }
  getGroupsByFormation(trainingId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environement.BASE_URL}/groups/by-formation/${trainingId}`
    );
  }
  addEtudiantToGroup(groupId: number, etudiantId: number): Observable<any> {
    const url = `${environement.BASE_URL}/groups/${groupId}/etudiants/${etudiantId}`;
    return this.http.post(url, {}).pipe(
      catchError((error: any) => {
        if (error.status === 400 && error.error) {
          // Handle error case
          throw new Error(error.error);
        } else {
          // Handle success case
          return of(error.error.text);
        }
      })
    );
  }
  removeEtudiantFromGroup(
    groupId: number,
    etudiantId: number
  ): Observable<string> {
    const url = `${environement.BASE_URL}/groups/${groupId}/etudiants/${etudiantId}`;
    return this.http.delete<string>(url);
  }

  getGroupsByUserId(userId: number): Observable<Groups[]> {
    const url = `${environement.BASE_URL}/groups/by-user/${userId}`;
    return this.http.get<Groups[]>(url);
  }
  getGroupsByFormateurId(formateurId: number): Observable<Groups[]> {
    const url = `${environement.BASE_URL}/groups/by-formateur/${formateurId}`;
    return this.http.get<Groups[]>(url);
  }

  getCountMembersByGroupId(id: any){
    return this.http.get(`${environement.BASE_URL}/groups/by-formateur/${id}`);
  }

  getGroupsByStudentId(id:any){
    return this.http.get(`${environement.BASE_URL}/groups/getGroupsByStudentId?id=${id}`)
  }

  addStudentsToGroup(groupId: number, studentIds: number[]): Observable<any> {
    const url = `${environement.BASE_URL}/groups/${groupId}/add-students?studentIds=${studentIds.join(',')}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  getAvailableStudents(groupId: number): Observable<any[]> {
    const url = `${environement.BASE_URL}/groups/${groupId}/available-students`;
    return this.http.get<any[]>(url);
  }

  getAllStudents(): Observable<any[]> {
    const url = `${environement.BASE_URL}/groups/all-students`;
    return this.http.get<any[]>(url);
  }
}
