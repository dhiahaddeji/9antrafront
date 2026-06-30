import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  getChapters(): Observable<any[]> {
    return this.http.get<any[]>(`${environement.BASE_URL}/e-learning/chapter`)
  }

  deleteChapter(id: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/chapter/${id}`)
  }

  getChaptersByCourse(idCourse: number) {
    return this.http.get<any[]>(`${environement.BASE_URL}/e-learning/chapter/getChaptersByCourse/${idCourse}`)
  }

  addLessonToChapter(formData: FormData, idChapter: number) {
    return this.http.put<any[]>(`${environement.BASE_URL}/e-learning/chapter/addLesson/${idChapter}`, formData)
  }

  getLessonsByChapter(idChapter: number) :Observable<any[]> {
    return this.http.get<any[]>(`${environement.BASE_URL}/e-learning/chapter/getLessonsByChapter/${idChapter}`)
  }
}
