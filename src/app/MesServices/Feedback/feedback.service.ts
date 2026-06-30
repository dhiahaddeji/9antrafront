import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  ajoutFeedback(Feedback: any): Observable<any> {
    return this.http.post(
      `${environement.BASE_URL}/Feedback/addFeedback/`,
      Feedback
    );
  }

  //get all feedbacks
  getAllFeedbacks(): Observable<any> {
    return this.http.get(`${environement.BASE_URL}/Feedback/allFeedback`);
  }

  getFeedbackByFormation(id: any): Observable<any> {
    return this.http.get(
      `${environement.BASE_URL}/Feedback/getFeedbackByFormation/${id}`
    );
  }
  //delete feedback
  deleteFeedback(id: any): Observable<any> {
    return this.http.delete(
      `${environement.BASE_URL}/Feedback/deleteFeedback/${id}`
    );
  }

  updateFeedback(id: any) {
    return this.http.patch(
      `${environement.BASE_URL}/Feedback/updateFeedbackPosted/${id}`,
      null
    );
  }

  getPostedFeedback() {
    return this.http.get(
      `${environement.BASE_URL}/Feedback/getFeedbackByPosted`
    );
  }
}
