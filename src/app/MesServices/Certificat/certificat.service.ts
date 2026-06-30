import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Certificat } from 'src/app/Models/Certificat';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://9antrabackend-production.up.railway.app/api/certif';

  genererCertificatForGroup(idgroupe: number, month: string, periode: string): Observable<void> {
    const url = `${this.baseUrl}/Generer/${idgroupe}`;
    const params = { month, periode };
    return this.http.post<void>(url, params);
  }
  create(idgroupe: number , formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Generer/${idgroupe}`, formData);
  } 
  deleteCertificatesForGroup(groupId: number) {
    const url = `${this.baseUrl}/Supprimer/${groupId}`;
    return this.http.delete(url);
  }
 
  update(groupId: number, value: FormData): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ModifierCertificats/${groupId}`, value);
  }
  getCertificateValuesByGroupId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/valueswe/${id}`);
  }
  getUserCertificates(userId: number): Observable<Certificat[]> {
    const url = `${this.baseUrl}/UserCertificates/${userId}`;
    return this.http.get<Certificat[]>(url);
  }
  
  getUserCertificatesFormationNames(userId: number): Observable<string[]> {
    const url = `${this.baseUrl}/UserCertificatesFormation/${userId}`;
    return this.http.get<string[]>(url);
  }
  }

