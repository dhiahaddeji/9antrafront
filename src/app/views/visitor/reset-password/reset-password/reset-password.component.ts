import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  pass1 = ""
  pass2 = ""
  email = localStorage.getItem("email")
  constructor(private sr: UserService, private router: Router) {

  }
  Change() {
    if (this.pass1 === "" || this.pass2 === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in both password fields',
      });
      return;
    }
    
    if (this.pass1 !== this.pass2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
      });
      return;
    }

    if (this.pass1.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password must be at least 6 characters long',
      });
      return;
    }
    
    let data={
      "password":this.pass2
    }
    this.sr.changePassword(this.email,data).subscribe(
      res => {
        localStorage.removeItem("email");
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password changed successfully',
        });
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to change password',
        });
      }
    );
  }

  ngOnInit(): void {
    if(localStorage.getItem("email")==null)
    {
      this.router.navigate(['/forgotpassword']);
    }
  }

}
