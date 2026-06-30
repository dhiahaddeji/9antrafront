import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidacy } from 'src/app/Models/Candidacy';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  private BASE_URL = 'https://9antrabackend-production.up.railway.app/api/Candidacy/';

  constructor(private http: HttpClient) { }
  createCandidacy(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`${this.BASE_URL}add`, formData, { headers });
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  getClaimsSortedByDate(order: string): Observable<Candidacy[]> {
    return this.http.get<Candidacy[]>(`${this.BASE_URL}getSortedByDate/${order}`);
  }
}
