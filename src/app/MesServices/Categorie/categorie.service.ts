import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categorie } from 'src/app/Models/categorie';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(private http: HttpClient) {}
  //add categorie
  addCategorie(categorie: any) {
    return this.http.post(
      `${environement.BASE_URL}/categorie/addCategories`,
      categorie
    );
  }

  getCategories() {
    return this.http.get(`${environement.BASE_URL}/categorie/allCategories`);
  }
  deleteCategorie(id: any) {
    return this.http.delete(
      `${environement.BASE_URL}/categorie/deleteCategories/${id}`
    );
  }

//filtre categorie by nomCate
searchCategorieByNomCate(nomCate: string) {
  return this.http.get(`${environement.BASE_URL}/categorie/categories/search/${nomCate}`);
}
//update categorie

updateCategorie(id: any, updatedCategorie: categorie) {
  return this.http.put(`${environement.BASE_URL}/categorie/updateCategories/${id}`, updatedCategorie);
}



}
