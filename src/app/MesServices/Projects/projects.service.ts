import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private BASE_URL = ' https://9antrabackend-production.up.railway.app/api/Projects/';

  constructor(private http: HttpClient) { }

  addProject(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token') // Remplacez par votre méthode d'authentification
    });
    return this.http.post<any>(`${this.BASE_URL}add`, formData);
  }

  
  addProject2(file: File,id:string|null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', id!);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token') // Remplacez par votre méthode d'authentification
    });
    return this.http.post<any>(`${this.BASE_URL}add`, formData);
  }
 

  updateProject(id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.put(`${this.BASE_URL}${id}/update`, formData);
  }
  getProject(): Observable<any> {
    return this.http.get(`${this.BASE_URL}allProjects`);
  }
  getProjectsByUser(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}user/${id}/projects`);
  }
  getProjectStudent(): Observable<any> {
    return this.http.get(`${this.BASE_URL}StudentProjects`);
  }
  getProjectStudent2(id:string|null): Observable<any> {
    return this.http.get(`${this.BASE_URL}StudentProjects/${id}`);
  }
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}deleteProjects/${id}`, { responseType: 'text' });
  }
  getProjectId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}getProjectsById/${id}`);
  }

  addRemarkToProject(projectId: number, remark: string): Observable<any> {
    const url = `${this.BASE_URL}${projectId}/remark`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(url, remark, { headers });
  }
  getStudentProjectsCount() {
    return this.http.get<number>(`${this.BASE_URL}countStudentProjects`);
  }
  getStudentFolder() {
    return this.http.get<number>(`${this.BASE_URL}user/project-folder`);
  }
}
