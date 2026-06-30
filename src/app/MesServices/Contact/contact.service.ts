import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  //add contacr
  ajoutContact(Contact: any): any {
    return this.http.post(`${environement.BASE_URL}/contact/addContact`, Contact);
  }


}
