import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/Models/Training';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http:HttpClient) { }
  
  getTraining(){
    return this.http.get(`${environement.BASE_URL}/Training/all`);
  }
  // /api/training/addTraining/{idCategorie} 
  ajoutTraining(training:any): Observable<any>{
    return this.http.post(`${environement.BASE_URL}/formation/addFormation`,training);
  }


   


 



  
    
}
