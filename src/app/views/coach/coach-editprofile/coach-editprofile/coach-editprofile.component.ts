import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coach-editprofile',
  templateUrl: './coach-editprofile.component.html',
  styleUrls: ['./coach-editprofile.component.css'],
})
export class CoachEditprofileComponent implements OnInit {
  emailInvalid: boolean = false;
  data: any = [];
  username!: string;
  country!: string;
  numeroTel!: string
  email!: string;
  photo!: any
  image!: any

  uploadInProgress!: boolean;
  showSuccessMessage!: boolean;
  isLoading!: boolean;
  UserService: any;
  Addetat!: boolean;
  showSuccessIcon!: boolean;
  msjEtat!: string;
  lastname!: string;
  firstname!: string;
  status = ""
  showEmailError: boolean = false;

  firstNameInp!: any
  lastNameInp!: any
  usernameInp!: any
  phoneInp!: any
  passwordInp!: any
  cppasswordInp!: any
  aboutInp!: any

  updateUser() {
    if (!this.isValidEmail(this.usernameInp)) {
      // Invalid email format, show error message
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid email format. Please enter a valid email.',
        showConfirmButton: true,
      });
      return; // Exit the method without updating the user
    }

    if (this.passwordInp !== this.cppasswordInp) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Passwords do not match.',
        showConfirmButton: true,
      });
      return; // Exit the method without updating the user
    }

    // If email format is valid and passwords match, proceed with the update
    let ddata: any = {
      "id": localStorage.getItem('id'),
      "firstName": this.firstNameInp,
      "lastName": this.lastNameInp,
      "username": this.usernameInp,
      "numeroTel": this.phoneInp,
      "password": this.cppasswordInp,
      "about": this.aboutInp,
    };

    this.sr.updateUser(ddata).subscribe(
      res => {
        console.log(res);
        this.status = "User Updated";
        this.getUserByid(localStorage.getItem('id'));

        // Show success message
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User updated successfully!',
          showConfirmButton: true,
        });
      },
      error => {
        console.error(error);

        // Show error message
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error updating user. Please try again later.',
          showConfirmButton: true,
        });
      }
    );
  }

  checkEmailFormat() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !emailRegex.test(this.usernameInp);
  }
  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }





  constructor(private sr: UserService, private Auth: UserAuthService, private route: Router, private http: HttpClient) { }

  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe(res => {
      this.data = res
      console.log("Ena chkoun :", this.data);
      this.firstname = this.data.firstName
      this.lastname = this.data.lastName
      this.country = this.data.Country
      this.numeroTel = this.data.numeroTel
      this.email = this.data.username
      this.photo = this.data.image;
      this.usernameInp = this.data.username
      this.firstNameInp = this.data.firstName
      this.lastNameInp = this.data.lastName
      this.phoneInp = this.data.numeroTel
      this.aboutInp = this.data.about



    })
  }
  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'))


  }

}
