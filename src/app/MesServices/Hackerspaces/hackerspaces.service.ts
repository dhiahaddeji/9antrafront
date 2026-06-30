import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hackerspaces } from 'src/app/Models/Hackerspaces';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class HackerspacesService {

  constructor(private http:HttpClient) { }
addHackerspaces(hackerspaces:Hackerspaces){
  return this.http.post(`${environement.BASE_URL}/Hackerspaces/addHackerspaces`,hackerspaces);
}

findHackerspaceByregion(region:string){
  return this.http.get(`${environement.BASE_URL}/Hackerspaces/getHackerspacesByRegion/${region}`);
}


getAllHackerspaces(){
  return this.http.get(`${environement.BASE_URL}/Hackerspaces/allHackerspaces`);
}
deleteHackerspace(id:any){
  return this.http.delete(`${environement.BASE_URL}/Hackerspaces/deleteHackerspaces/${id}`);
}
getHackerspacesById(id:any){
  return this.http.get(`${environement.BASE_URL}/Hackerspaces/getHackerspacesById/${id}`);
}
updateHackerspaces(id:any,hackerSpace:any){
  return this.http.post(`${environement.BASE_URL}/Hackerspaces/updateHackerspaces?id=${id}`,hackerSpace);
}
}
