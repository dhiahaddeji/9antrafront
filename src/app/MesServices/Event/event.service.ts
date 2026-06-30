import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Event } from 'src/app/Models/Event';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environement.BASE_URL}/e-learning/event/getAllEvents`)
  }

  addEvent(form: FormData) {
    return this.http.post(`${environement.BASE_URL}/e-learning/event`,form)
  }

  updateEvent(form: FormData) {
    return this.http.put(`${environement.BASE_URL}/e-learning/event`,form)
  }

  updateEventNoImage(form: FormData) {
    return this.http.put(`${environement.BASE_URL}/e-learning/event/updateWithOutImage`, form)
  }

  deleteEvent(id: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/event/${id}`)
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${environement.BASE_URL}/e-learning/event/${id}`)
  }

  getEventsByUser(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environement.BASE_URL}/e-learning/event/getEventsByUser/${userId}`)
  }

  registerToEvent(eventId: number) {
    return this.http.put(`${environement.BASE_URL}/e-learning/event/registerToEvent/${eventId}`, {});
  }

  unregisterFromEvent(eventId: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/event/deleteEventReservation/${eventId}`)
  }

  getUsersByEvent(eventId: number) {
    return this.http.get(`${environement.BASE_URL}/e-learning/event/getUsersByEvent/${eventId}`)
  }

  isUserRegisteredToEvent(eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${environement.BASE_URL}/e-learning/event/isUserRegisteredToEvent/${eventId}`)
  }

  getCountEventsByUserId(id:any){
    return this.http.get(`${environement.BASE_URL}/e-learning/event/getCountEvents/${id}`)
  }
}
