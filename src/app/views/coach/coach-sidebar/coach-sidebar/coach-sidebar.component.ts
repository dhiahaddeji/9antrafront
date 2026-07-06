import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';
import { Groups } from 'src/app/Models/group.model';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { error } from 'jquery';

@Component({
  selector: 'app-coach-sidebar',
  templateUrl: './coach-sidebar.component.html',
  styleUrls: ['./coach-sidebar.component.css'],
})
export class CoachSidebarComponent implements OnInit {
  data: any = [];
  username!: string;
  photo!: any;
  groups: Groups[] = [];
  id_formateur: any;
  openMenu: string | null = null;
  sidebarOpen = false;
  private jwtToken: string;

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
    private groupsService: GroupService,
  ) {
    this.jwtToken = localStorage.getItem('jwtToken') || '';
  }

  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      this.id_formateur = this.data.id
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.photo = this.data.image;
      if (this.data.image === "imagePath") {
        this.photo = null;
      } else {
        this.photo = this.data.image;
      }
      this.getGroupsByUserId();
    });
  }

  getGroupsByUserId(){
    this.groupsService.getGroupsByFormateurId(this.id_formateur).subscribe((res:any)=>{
      this.groups=res;
    },(error)=>{
      console.log(error);
    })
  }
  currentUser: any;

  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
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

}
