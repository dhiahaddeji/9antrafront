import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  data: any = [];
  username!: string;
  photo!: any;
  openMenu: string | null = null;
  sidebarOpen = false;

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
      private route: Router
    ) {}


  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.photo = this.data.image === 'imagePath' ? null : this.data.image;
    });
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

  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
  }
}
