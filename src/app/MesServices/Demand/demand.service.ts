import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) { }

  addDemand(form: FormData) {
    return this.http.post(`${environement.BASE_URL}/e-learning/demand`,form)
  }

  addPathDemand(form: FormData, idPath: number) {
    return this.http.post(`${environement.BASE_URL}/e-learning/demand?idPath=${idPath}`,form)
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${environement.BASE_URL}/e-learning/demand`)
  }

  respondToDemand(message: string, subject: string, idDemand: number) {
    return this.http.put(`${environement.BASE_URL}/e-learning/demand/${idDemand}?subject=${subject}`, message)
  }
}
