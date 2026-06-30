import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectClient } from 'src/app/Models/ProjectClient';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectsService {
  private BASE_URL = ' https://9antrabackend-production.up.railway.app/api/AdminProjects/';
  private BASE_URL2 = 'https://9antrabackend-production.up.railway.app/api/ProjectClient/';
  constructor(private http: HttpClient) {}

  addProject(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  updateProject(
    projectId: number,
    projectData: FormData
  ): Observable<AdminProjects> {
    const url = `${this.BASE_URL}update/${projectId}`;
    return this.http.put<AdminProjects>(url, projectData);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, {
      responseType: 'text',
    });
  }
  addProjectClient(
    projectClient: ProjectClient,
    adminProjectId: number
  ): Observable<ProjectClient> {
    const url = `${this.BASE_URL2}add/${adminProjectId}`;
    return this.http.post<ProjectClient>(url, projectClient);
  }
  getAllC(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}All`);
  }
  getProjectClientsByAdminProjectId(
    adminProjectId: number
  ): Observable<ProjectClient[]> {
    const url = `${this.BASE_URL2}adminProjects/${adminProjectId}/projectClients`;
    return this.http.get<ProjectClient[]>(url);
  }
  removeRelation(
    adminProjectId: number,
    projectClientId: number
  ): Observable<ProjectClient> {
    const url = `${this.BASE_URL2}removeRelation/${adminProjectId}/${projectClientId}`;
    return this.http.delete<ProjectClient>(url);
  }
  updateComplaint(id: number, status: boolean) {
    return this.http.put(
      `${this.BASE_URL2}updateStatus/${id}?status=${status}`,
      null
    );
  }
  getComplaintsByStatus(status: boolean): Observable<ProjectClient[]> {
    return this.http.get<ProjectClient[]>(
      `${this.BASE_URL2}getStatus/${status}`
    );
  }
  getClaimsSortedByDate(order: string): Observable<ProjectClient[]> {
    return this.http.get<ProjectClient[]>(
      `${this.BASE_URL2}getSortedByDate/${order}`
    );
  }
  getProjectClients(projectAdminId: number): Observable<ProjectClient[]> {
    const url = `${this.BASE_URL2}project-admins/${projectAdminId}/project-clients`;
    return this.http.get<ProjectClient[]>(url);
  }
  getById2(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL2}catId/${id}`);
  }
}
