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
  sidebarOpen = false;
  currentUser: any;

  toggleMenu(name: string): void {
    this.openMenu = this.openMenu === name ? null : name;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
  constructor(
    private sr: UserService,
    private Auth: UserAuthService,
    private route: Router,
    private http: HttpClient,
    private groupService: GroupService,
  ) {}

  getUserByid(id: any) {
    if (!id) return; // Guard clause
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.photo = this.data.image;
      if (this.data.image === "imagePath") {
        this.photo = null;
      } else {
        this.photo = this.data.image;
      }
    }, (error) => {
      console.error('Error fetching user by ID:', error);
    });
  }

  getGroupsByStudentId(id: any) {
    if (!id) {
      this.groups = []; // Set empty array if no ID
      return;
    }
    this.groupService.getGroupsByStudentId(id).subscribe(
      (res: any) => {
        this.groups = res || [];
      },
      (error) => {
        console.warn('Groups API error (this is not critical):', error);
        this.groups = []; // Set empty array on error to prevent crash
      }
    );
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
        // Clear authentication data
        this.Auth.clear();

        // Navigate to the login page
        this.route.navigate(['/login']);
      }
    });
  }

  getCurrentUserDetails(): void {
    this.http.get<any>('https://9antrabackend-production.up.railway.app/api/user/me').subscribe(
      (response) => {
        this.currentUser = response;
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      }
    );
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.getUserByid(userId);
      this.getGroupsByStudentId(userId);
    }
    this.getCurrentUserDetails();
  }
}
