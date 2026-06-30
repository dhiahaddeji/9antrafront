import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {


etat!:boolean
  msj=""
  code=""
  email=localStorage.getItem('emaili')
  uploadInProgress: boolean = false;
  showSuccessIcon: boolean = false;
  showSuccessMessage = false;
  isLoading: boolean = false;
  Addetat!: boolean ;
  constructor(private sr:UserService, private router:Router){

  }

  checkPassword()
  {
    this.sr.checkCode(this.code).subscribe(res=>{
      localStorage.setItem("code",this.code)

      this.router.navigate(['../resetpassword']);

    },

    (error: any) => {
      console.log(error);
      this.showSuccessIcon = false;
      this.Addetat = true;
      this.uploadInProgress = false; // Set upload in progress to false on error as well
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '  incorrect code  ',
      });
    }
  );

  }

  ngOnInit(): void {
    if(localStorage.getItem("email")==null)
    {
      this.router.navigate(['../forgotpassword']);
    }
  }
}
