import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Injectable({
  providedIn: 'root'
})
export class ProjectOwnerService {
  private BASE_URL = ' https://9antrabackend-production.up.railway.app/api/ProjectOwner/';

  constructor(private http: HttpClient) { }
  create(formData: FormData): Observable<ProjectOwner> {
    return this.http.post<ProjectOwner>(`${this.BASE_URL}add`, formData);
  } 
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, { responseType: 'text' });
  }
  update(id: number, value: FormData): Observable<Object> {
    return this.http.put(`${this.BASE_URL}update/${id}`, value);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  createContributors(formData: FormData): Observable<ProjectOwner> {
    return this.http.post<ProjectOwner>(`${this.BASE_URL}addContributor`, formData);
  } 
  updateComplaint(id: number, status: boolean) {
    return this.http.put(`${this.BASE_URL}updateStatus/${id}?status=${status}`, null);
  }
  getAllByS(): Observable<any> {
    return this.http.get(`${this.BASE_URL}AllByS`);
  }
  getComplaintsByStatus(status: boolean): Observable<ProjectOwner[]> {
    return this.http.get<ProjectOwner[]>(`${this.BASE_URL}getStatus/${status}`);
  }
}
