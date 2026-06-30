import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificOffer } from 'src/app/Models/SpecificOffer';

@Injectable({
  providedIn: 'root'
})
export class SpecificOfferService {
  private BASE_URL = 'https://9antrabackend-production.up.railway.app/api/SpecificOffer/';

  constructor(private http: HttpClient) { }
  addOffer(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  getClaimsSortedByDate(order: string): Observable<SpecificOffer[]> {
    return this.http.get<SpecificOffer[]>(`${this.BASE_URL}getSortedByDate/${order}`);
  }
}
