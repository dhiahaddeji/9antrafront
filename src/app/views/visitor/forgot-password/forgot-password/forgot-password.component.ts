import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  emaili: string;
  etat: boolean;
  msj: string;
  uploadInProgress: boolean = false;
  showSuccessIcon: boolean = false;
  showSuccessMessage = false;
  isLoading: boolean = false;
  Addetat!: boolean ;

  constructor(private sr: UserService, private router: Router) {
    this.emaili = '';
    this.etat = false;
    this.msj = '';

  }

  save() {
    console.log('=== FORGOT PASSWORD SAVE CALLED ===');
    console.log('Email entered:', this.emaili);
    
    if (!this.emaili || !this.isValidEmail(this.emaili)) {
      console.warn('Invalid email format');
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return;
    }

    this.isLoading = true;
    this.uploadInProgress = true;

    let dateno = Date.now();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let data: any = {
      "code": result,
      "email": this.emaili,
      "dateCreation": dateno
    };

    console.log('=== CALLING genCode ===');
    console.log('Data being sent:', data);

    this.sr.genCode(data).subscribe(
      (res: any) => {
        console.log('=== genCode SUCCESS ===');
        console.log('Response:', res);
        localStorage.setItem('email', this.emaili.toString());
        this.isLoading = false;
        this.uploadInProgress = false;
        this.showSuccessIcon = true;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'A verification code has been sent to your email',
        });
        this.router.navigate(['/verifyemail']);
      },
      (error: any) => {
        console.log('=== genCode ERROR ===');
        console.error('Error:', error);
        this.showSuccessIcon = false;
        this.Addetat = true;
        this.uploadInProgress = false;
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email not found. Please check your email address.',
        });
      }
    );
  }
  isValidEmail(email:any) {
    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

}
