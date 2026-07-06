import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environement } from 'src/environement/environement.dev';
import { Coach } from '../../Models/Coach';
import { Students } from '../../Models/Students';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'https://9antrabackend-production.up.railway.app';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  signup(user:any){
    return this.http.post(`${environement.BASE_URL}/auth/Signup`, user, { headers: this.requestHeader });
  }

  signupCoach(formData: FormData){
    return this.http.post(`${environement.BASE_URL}/auth/signup`, formData, { headers: this.requestHeader });
  }
  public login(loginData: any) {
    console.log('Sending login request with data:', { username: loginData.username });
    return this.http.post(this.PATH_OF_API + '/api/auth/signin', loginData, {
      headers: this.requestHeader,
    });
  }
  public roleMatch(allowedRoles: any) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
  getRoles(): any {
    throw new Error('Method not implemented.');
  }
  // ajoutStudent(Students: Students) {
  //   return this.http.post(
  //     `${environement.BASE_URL}/auth/signupstudent`,
  //     Students
  //   );
  // }
  ajoutStudent(idRequest: number) {
    return this.http.post(
      `${environement.BASE_URL}/auth/signupstudent/${idRequest}`,
      []
    );
  }
  ajoutFormateur(Formateur: Coach) {
    return this.http.post(`${environement.BASE_URL}/auth/signup`, Formateur);
  }
  checkCode(code: any) {
    return this.http.get(
      this.PATH_OF_API + '/api/resetpassword/checkcode/' + code
    );
  }
  genCode(GenCode: any) {
    return this.http.post(
      this.PATH_OF_API + '/api/resetpassword/generatecode',
      GenCode
    );
  }
  changePassword(email: any, password: any) {
    return this.http.patch(
      this.PATH_OF_API + '/api/resetpassword/updatepassword/' + email,
      password
    );
  }

  getAllUsers() {
    return this.http.get(`${environement.BASE_URL}/user/all`);
  }
  public getUserByid(id: any) {
    return this.http.get(this.PATH_OF_API + '/api/user/finduserbyid/' + id);
  }

  getFormateursOfuser() {
    return this.http.get(`${environement.BASE_URL}/formateur/all`);
  }

  getFormateurs(page:number,pageSize:number) {
    return this.http.get(`${environement.BASE_URL}/formateur/allPaginate?page=${page}&per_page=${pageSize}`);
  }
  getFormationByTypeFormationAndStatus(typeFormation: string, status: string) {
    return this.http.get(
      `${environement.BASE_URL}/user/findByTypeFormationAndStatus?formation=${typeFormation}&status=${status}`
    );
  }

getGroupbyidUser(id:any){
  return this.http.get(`${environement.BASE_URL}/user/getGroupsForUser/${id}`);
}

  //update image
  updateImage(id: any, formData: any) {
    return this.http.patch(
      `${environement.BASE_URL}/user/updateUserImageById/${id}`,
      formData
    );
  }

  updateUserImage(userId: any, file: any) {
    return this.http.post(
      `${environement.BASE_URL}/user/imagechange/${userId}`,
      file
    );
  }
  updateEnabeld(enabled: any, id: any) {
    return this.http.put(
      `${environement.BASE_URL}/user/updateEnableDisable/${enabled}/${id}`,
      null
    );
  }


updateUser(formData:any){
  return this.http.put(`${environement.BASE_URL}/user/updateUser`,formData);
}

addNoteToUser(userId:any,note:any){
  return this.http.post(`${environement.BASE_URL}/user/${userId}/notes`,note);
}


getUserNotes(userId:any){
  return this.http.get(`${environement.BASE_URL}/user/${userId}/notes`);
}



getUserById(id:any){
  return this.http.get(`${environement.BASE_URL}/user/finduserbyid/${id}`);
}

getById2(id: number): Observable<any> {
  return this.http.get(`${environement.BASE_URL}/user/finduserbyid/${id}`);
}

getNumberOfStudents(): Observable<number> {
  return this.http.get<number>(`${environement.BASE_URL}/user/getNumberOfAccounts/Student`);
}

getNumberOfCoaches(): Observable<number> {
  return this.http.get<number>(`${environement.BASE_URL}/user/getNumberOfAccounts/Coach`);
}

getNUmberOfActivatedStudents(): Observable<number> {
  return this.http.get<number>(`${environement.BASE_URL}/user/getNumberOfActivatedAccounts/ETUDIANT`);
}

getNUmberOfActivatedCoaches(): Observable<number> {
  return this.http.get<number>(`${environement.BASE_URL}/user/getNumberOfActivatedAccounts/FORMATEUR`);
}

getTopCourses(): Observable<any[]> {
  return this.http.get<any[]>(`${environement.BASE_URL}/user/getTopCourses`);
}

verifyEmail(email:any){
  return this.http.post(`${environement.BASE_URL}/auth/verify`,email);
}

}
