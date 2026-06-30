import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { error } from 'jquery';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css'],
})
export class StudentSidebarComponent implements OnInit {
  data: any = [];
  username!: string;
  photo!: any;
  groups: any;
  openMenu: string | null = null;

  toggleMenu(name: string): void {
    this.openMenu = this.openMenu === name ? null : name;
  }
  constructor(
    private sr: UserService,
    private Auth: UserAuthService,
    private route: Router,
    private http: HttpClient,
    private groupService:GroupService,
  ) {}

  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.photo = this.data.image;
      if (this.data.image === "imagePath") {
        this.photo = null;
      } else {
        this.photo = this.data.image;
      }
    });
  }

  getGroupsByStudentId(id:any){
    this.groupService.getGroupsByStudentId(id).subscribe((res:any)=>{
      this.groups = res
      console.log(this.groups);
    },(error)=>{
      console.log(error);
    })
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear authentication data (assuming this.Auth.clear() does the job)
        this.Auth.clear();

        // Navigate to the login page
        this.route.navigate(['/login']);
      }
    });
  }

  currentUser: any;

  getCurrentUserDetails(): void {
    this.http.get<any>('https://9antrabackend-production.up.railway.app/api/user/me').subscribe(
      (response) => {
        this.currentUser = response;
        console.log('Current user:', this.currentUser);
        this.photo.currentUser?.image;
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
    this.getCurrentUserDetails();
    this.getGroupsByStudentId(localStorage.getItem('id'));
  }
}
