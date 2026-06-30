import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  constructor(private http:HttpClient) { }

  getFormations(){
    return this.http.get(`${environement.BASE_URL}/formation/all`);
  }
  getFormationsPaginate(page:any,pageSize:any){
    return this.http.get(`${environement.BASE_URL}/formation/allPaginate?page=${page}&per_page=${pageSize}`);
  }
  //get formation by idcategorie
  getFormationByCategorie(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationsByCategorieId/${id}`);
  }
// get formation by id
  getFormationById(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationById/${id}`);
  }
  getFormationByNomFormation(nom:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationByNomFormation/${nom}`);
  }
  //delete formation
  deleteFormation(id:any){
    return this.http.delete(`${environement.BASE_URL}/formation/deleteFormation/${id}`);
  }
  //search formation
  searchFormationsByNomFormation(nom: string) {
    return this.http.get(`${environement.BASE_URL}/formation/search/${nom}`);
  }
  updateFormation(id:any,formation:any){
    return this.http.put(`${environement.BASE_URL}/formation/updateFormation/${id}`,formation);
  }

  getCountFormationsInProgressByUserId(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getCountFormationsInProgress/${id}`);
  }

  getCountFormationsCompletedByUserId(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getCountFormationsCompleted/${id}`);
  }

  getCountFormationsCompletedCoach(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getCountFormationsCompletedCoach/${id}`)
  }

  getCountFormationsInProgressCoach(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getCountFormationsInProgressCoach/${id}`)
  }
}


