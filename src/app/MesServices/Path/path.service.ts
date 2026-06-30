import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Path } from 'src/app/Models/E-learning/Path';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  
  constructor(private http: HttpClient) { }


  getPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(`${environement.BASE_URL}/e-learning/path`)
  }

  deletePath(id: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/path/${id}`)
  }

  addPath(formData: FormData) {
    return this.http.post(`${environement.BASE_URL}/e-learning/path`, formData)
  }

  updatePath(formData: FormData) {
    return this.http.put(`${environement.BASE_URL}/e-learning/path`, formData)
  }

  getOnePath(id: number): Observable<Path> {
    return this.http.get<Path>(`${environement.BASE_URL}/e-learning/path/${id}`)
  }
}
