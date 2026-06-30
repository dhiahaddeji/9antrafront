import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Request, RequestStatus } from 'src/app/Models/Request';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  addRequest(request: FormData, idFormation: number): Observable<Request> {
    return this.http.post<Request>(`${environement.BASE_URL}/request/${idFormation}`, request)
  }

  getAll(): Observable<Request[]> {
    return this.http.get<Request[]>(`${environement.BASE_URL}/request`)
  }

  changeStatus(id: number, status: string) {
    return this.http.patch(`${environement.BASE_URL}/request/${id}/${status}`, [])
  }
}
