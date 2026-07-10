import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private BASE_URL = 'https://9antra-chatbot-production.up.railway.app';
  constructor(private http: HttpClient) { }


  Send(question:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question };
    return this.http.post(`${this.BASE_URL}/chatbot`,body,{headers:headers})
  }

  getUnmatched(){
    return this.http.get(`${this.BASE_URL}/unmatched`,)
  }

  teach(question:any,answer:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question , answer: answer };
    return this.http.post(`${this.BASE_URL}/teach`,body,{headers:headers})
  }

  add(question:any,answer:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question , answer: answer };
    return this.http.post(`${this.BASE_URL}/add`,body,{headers:headers})
  }

  deleteByKey(question:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question  };
    return this.http.post(`${this.BASE_URL}/deletebyKey`,body,{headers:headers})
  }

  deleteAll(question:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question  };
    return this.http.post(`${this.BASE_URL}/deleteAll`,body,{headers:headers})
  }


}
