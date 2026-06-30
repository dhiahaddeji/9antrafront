import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environement } from 'src/environement/environement.dev';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getAll(id:any){
    return this.http.get(`${environement.BASE_URL}/notification/all?id=${id}`)
  }

  getAllPaginate(page:any,per_page:any,id:any){
    return this.http.get(`${environement.BASE_URL}/notification/allNotifPaginate?page=${page}&per_page=${per_page}&id=${id}`)
  }

  deleteAll(){
    return this.http.delete(`${environement.BASE_URL}/notification/deleteAll`)
  }

  deleteById(id:any){
    return this.http.delete(`${environement.BASE_URL}/notification/deleteById?id=${id}`)
  }

  changeStatus(id:any,body:any){
    return this.http.put(`${environement.BASE_URL}/notification/changeStatus?id=${id}`,body)
  }

  changeStatusToSeenDetails(id:any,body:any){
    return this.http.put(`${environement.BASE_URL}/notification/changeStatusToSeenDetails?id=${id}`,body)
  }

  changeStatusToDeleted(id:any,body:any){
    return this.http.put(`${environement.BASE_URL}/notification/changeStatusToDeleted?id=${id}`,body)
  }
}
