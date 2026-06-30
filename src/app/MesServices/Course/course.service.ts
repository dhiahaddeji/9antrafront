import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Models/E-learning/Course';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environement.BASE_URL}/e-learning/course`)
  }

  deleteCourse(idCourse: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/course/${idCourse}`)
  }

  addCourse(form: FormData) {
    return this.http.post(`${environement.BASE_URL}/e-learning/course`,form)
  }

  updateCourse(form: FormData) {
    return this.http.put(`${environement.BASE_URL}/e-learning/course`,form)
  }

  getCourse(idCourse: number): Observable<Course> {
    return this.http.get(`${environement.BASE_URL}/e-learning/course/${idCourse}`)
  }

  addChapterToCourse(chapter: any, idCourse: number) {
    return this.http.put(`${environement.BASE_URL}/e-learning/course/addChapter/${idCourse}`, chapter)
  }

  
}
