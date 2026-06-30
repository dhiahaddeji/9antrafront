import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private BASE_URL = ' https://9antrabackend-production.up.railway.app/api/quiz';
  constructor(private http: HttpClient) { }

  getAllQuiz(id:any){
    return this.http.get(`${this.BASE_URL}/getAllQuizs?id=${id}`)
  }
  addQuiz(name:any,id:any){
    return this.http.post(`${this.BASE_URL}/addQuiz?name=${name}&id=${id}`,null)

  }

  deleteQuiz(id:any){
    return this.http.delete(`${this.BASE_URL}/deleteQuizById?id=${id}`)
  }

  getCountQuestionsByQuizId(id:any){
    return this.http.get(`${this.BASE_URL}/answer/getCountQuestionsByQuizId?id=${id}`)
  }

  addQuestionsAnswers(id:any,answer:any){
    return this.http.post(`${this.BASE_URL}/answer/addQuiz?id=${id}`,answer)
  }

  getQuestionsByQuizId(id:any){
    return this.http.get(`${this.BASE_URL}/answer/getQuestionsByQuizId?id=${id}`)
  }

  deleteAnswerById(id:any){
    return this.http.delete(`${this.BASE_URL}/answer/deleteById?id=${id}`)
  }

  setQuizItemsStorage(currentQuestion:any,points:any,correctAnswer:any,inCorrectAnswer:any,progress:any,isCompleted:any){
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    localStorage.setItem('points', JSON.stringify(points));
    localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer));
    localStorage.setItem('inCorrectAnswer', JSON.stringify(inCorrectAnswer));
    localStorage.setItem('progress', JSON.stringify(progress));
    localStorage.setItem('isCompleted', JSON.stringify(isCompleted));
  }

  removeQuizItemsStorage(){
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('points');
    localStorage.removeItem('correctAnswer');
    localStorage.removeItem('inCorrectAnswer');
    localStorage.removeItem('progress');
    localStorage.removeItem('isCompleted');
  }

  getQuizItemsCurrentQuestion(){
    return JSON.parse(localStorage.getItem('currentQuestion')!);
  }
  getQuizItemsPoints(){
    return JSON.parse(localStorage.getItem('points')!);
  }
  getQuizItemsCorrectAnswer(){
    return JSON.parse(localStorage.getItem('correctAnswer')!);
  }
  getQuizItemsInCorrectAnswer(){
    return JSON.parse(localStorage.getItem('inCorrectAnswer')!);
  }
  getQuizItemsInProgress(){
    return JSON.parse(localStorage.getItem('progress')!);
  }

  getQuizItemsIsCompleted(){
    return JSON.parse(localStorage.getItem('isCompleted')!);
  }

  setQuizItemsCurrentQuestion(currentQuestion:number){
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }

  setQuizItemsPoints(Points:number){
    localStorage.setItem('points', JSON.stringify(Points));
  }

  setQuizItemsCorrectAnswer(correctAnswer:number){
    localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer));
  }

  setQuizItemsInCorrectAnswer(inCorrectAnswer:number){
    localStorage.setItem('inCorrectAnswer', JSON.stringify(inCorrectAnswer));
  }
  setQuizItemsProgress(progress:String){
    localStorage.setItem('progress', JSON.stringify(progress));
  }

  setQuizItemsIsCompleted(isCompleted:any){
    localStorage.setItem('isCompleted', JSON.stringify(isCompleted));
  }
}
