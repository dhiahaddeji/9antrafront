import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/Models/E-learning/Lesson';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  
  constructor(private http:HttpClient) { }

  getLessons(): Observable<any[]> {
    return this.http.get<any[]>(`${environement.BASE_URL}/e-learning/lesson`)
  }

  deleteLesson(id: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/lesson/${id}`)
  }

  getOne(idLesson: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${environement.BASE_URL}/e-learning/lesson/${idLesson}`)
  }
}
