import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferClient } from 'src/app/Models/OfferClient';
import { Offers } from 'src/app/Models/Offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private BASE_URL = 'https://9antrabackend-production.up.railway.app/api/Offers/';
  private BASE_URL2 = 'https://9antrabackend-production.up.railway.app/api/OfferClient/';

  constructor(private http: HttpClient) { }
  addOffer(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getById2(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL2}catId/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, { responseType: 'text' });
  }
  updateProject(projectId: number, projectData: FormData): Observable<Offers> {
    const url = `${this.BASE_URL}update/${projectId}`;
    return this.http.put<Offers>(url, projectData);
  }
  getClaimsSortedByDate(order: string): Observable<Offers[]> {
    return this.http.get<Offers[]>(`${this.BASE_URL}getSortedByDate/${order}`);
  }
  getOffersByType(type: string): Observable<Offers[]> {
    const url = `${this.BASE_URL}AllType?type=${type}`;
    return this.http.get<Offers[]>(url);
  }
  addProjectClient(projectData: FormData, adminProjectId: number): Observable<OfferClient> {
    const url = `${this.BASE_URL2}add/${adminProjectId}`;
    return this.http.post<OfferClient>(url, projectData);
  }
  getProjectClientsByAdminProjectId(adminProjectId: number): Observable<OfferClient[]> {
    const url = `${this.BASE_URL2}adminProjects/${adminProjectId}/projectClients`;
    return this.http.get<OfferClient[]>(url);
  }
}
