
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/environement/environement.dev';
import { record } from 'src/app/Models/record';
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private http: HttpClient) { }
  addRecord(record: FormData) {
    return this.http.post(`${environement.BASE_URL}/records/add`, record);

  }

  //get by idgrou^p
  getRecordsByIdGroup(idGroup: any) {
    return this.http.get<record[]>(`${environement.BASE_URL}/records/allbygroup/${idGroup}`);
  }
  //delete record by id
  deleteRecord(id: any) {
    return this.http.delete(`${environement.BASE_URL}/records/delete/${id}`);
  }
}


