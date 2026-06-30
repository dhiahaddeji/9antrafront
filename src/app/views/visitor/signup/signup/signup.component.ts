import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isLoading: boolean = false;
  SignUpForm:FormGroup
  constructor(private formBuilder:FormBuilder,private userService : UserService,private router: Router){
    this.SignUpForm = this.formBuilder.group({
      firstName:this.FirstNameForm,
      lastName:this.LastNameForm,
      numTel:this.NumTlfForm,
      email:this.EmailForm,
      country:this.CountryForm,
      password:this.passwordForm
    })
  }

  NumTlfForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  FirstNameForm=new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]);
  LastNameForm=new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]);
  EmailForm=new FormControl('',[Validators.required,Validators.email]);
  passwordForm=new FormControl('',[Validators.required,Validators.minLength(8)]);
  CountryForm=new FormControl('',[Validators.required]);



  getFirstNameFormError(){
    if(this.FirstNameForm.touched){
      if(this.FirstNameForm.hasError("required")){
        return 'You must enter your first name';
      } else if(this.FirstNameForm.hasError("minlength")){
        return 'You must enter a valid first name';
      }else if(this.FirstNameForm.hasError("maxlength")){
        return 'You must enter a valid first name';
      }
    }
    return '';
  }



    getLastNameFormError(){
      if(this.LastNameForm.touched){
        if(this.LastNameForm.hasError("required")){
           return 'You must enter your last name';
          }else if(this.LastNameForm.hasError("minlength")){
            return 'You must enter a valid last name';
        }else if(this.LastNameForm.hasError("maxlength")){
          return 'You must enter a valid last name';
        }
      }
      return '';
    }


    getNumTlfFormError(){
      if(this.NumTlfForm.touched){
        console.log(this.NumTlfForm);
        if(this.NumTlfForm.hasError("required")){
           return 'You must enter your phone number';
        }else if(this.NumTlfForm.hasError("minlength")){
          return 'You must enter a valid phone number';
        }else if(this.NumTlfForm.hasError("maxlength")){
          return 'You must enter a valid phone number';
        }else if(this.NumTlfForm.hasError("pattern")){
           return 'You must enter Just numbers';
        }
      }
      return '';
    }


    getPasswordFormError(){
      if(this.passwordForm.touched){
        if(this.passwordForm.hasError("required")){
           return 'You must enter your password';
        }else if(this.passwordForm.hasError("minlength")){
          return 'You must enter a valid password';
        }
        //  return 'Password must contain at least one uppercase letter , one lowercase letter and one number';
        }
        return '';
      }


    getEmailFormError(){
      if(this.EmailForm.touched){
        if(this.EmailForm.hasError("required")){
            return 'You must enter your email';
        }else{
          if(this.EmailForm.hasError("email")){
            return 'You must enter a valid email';
          }
        }
        }
        return '';
      }

    getCountryFormError(){
      if(this.CountryForm.touched){
        if(this.CountryForm.hasError("required")){
            return 'You must select your Country';
        }
        }
        return '';
      }


        SignUp(){
          if(this.SignUpForm.valid){
            this.isLoading = true;
            this.userService.signup(
              {
                "firstName":this.SignUpForm.value['firstName'],
                "lastName":this.SignUpForm.value['lastName'],
                "username":this.SignUpForm.value['email'],
                "numeroTel":this.SignUpForm.value['numTel'],
                "country":this.SignUpForm.value['country'],
                "password":this.SignUpForm.value['password']
            }

            ).subscribe((res:any)=>{
              Swal.fire({
                icon: 'success',
                title: 'Signup successfully',
                text: 'Your registration went successfully! Check your email to verify your account.',
              });
              this.router.navigate(['/login']);
            },(error)=>{
              console.log(error);
              let msg = 'Something went wrong. Please try again.';
              if (error.status === 0) {
                msg = 'Cannot reach the server. Make sure the backend is running on port 8094.';
              } else if (error.status === 409) {
                msg = 'Email already used!';
              } else if (error.error?.message) {
                msg = error.error.message;
              }
              Swal.fire({ icon: 'error', title: 'Oops...', text: msg });
              this.isLoading = false;
            })
          }else{
            this.SignUpForm.markAllAsTouched();
          }
        }
}
