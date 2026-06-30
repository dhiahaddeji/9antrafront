import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Injectable({
  providedIn: 'root'
})
export class SpecificProjectService {
  private BASE_URL = ' https://9antrabackend-production.up.railway.app/api/SpecificProject/';

  constructor(private http: HttpClient) { }
  addProject(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  getComplaintsByStatus(status: boolean): Observable<SpecificProject[]> {
    return this.http.get<SpecificProject[]>(`${this.BASE_URL}getStatus/${status}`);
  }
  getClaimsSortedByDate(order: string): Observable<SpecificProject[]> {
    return this.http.get<SpecificProject[]>(`${this.BASE_URL}getSortedByDate/${order}`);
  }
  updateComplaint(id: number, status: boolean) {
    return this.http.put(`${this.BASE_URL}updateStatus/${id}?status=${status}`, null);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
}
