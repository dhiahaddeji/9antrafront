import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;
  selectedRole: string = 'student'; // Default to student
  cvFile: File | null = null;
  SignUpForm:FormGroup
  constructor(private formBuilder:FormBuilder,private userService : UserService,private router: Router){
    this.SignUpForm = this.formBuilder.group({
      firstName:this.FirstNameForm,
      lastName:this.LastNameForm,
      numTel:this.NumTlfForm,
      email:this.EmailForm,
      country:this.CountryForm,
      password:this.passwordForm,
      role:this.RoleForm,
      cv:this.CvForm
    })
  }

  NumTlfForm=new FormControl<string>('', {validators:[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")], nonNullable: true});
  FirstNameForm=new FormControl<string>('', {validators:[Validators.required,Validators.minLength(3),Validators.maxLength(50)], nonNullable: true});
  LastNameForm=new FormControl<string>('', {validators:[Validators.required,Validators.minLength(3),Validators.maxLength(50)], nonNullable: true});
  EmailForm=new FormControl<string>('', {validators:[Validators.required,Validators.email], nonNullable: true});
  passwordForm=new FormControl<string>('', {validators:[Validators.required,Validators.minLength(8)], nonNullable: true});
  CountryForm=new FormControl<string>('', {validators:[Validators.required], nonNullable: true});
  RoleForm=new FormControl<string>('student', {validators:[Validators.required], nonNullable: true});
  CvForm=new FormControl<string>('', {nonNullable: true});

  ngOnInit() {
    // Track role changes
    this.RoleForm.valueChanges.subscribe(role => {
      this.selectedRole = role;
    });
  }



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
          return 'Password must be at least 8 characters';
        }
        }
        return '';
      }

  get passwordStrength(): 'weak' | 'medium' | 'strong' {
    const pwd = this.passwordForm.value;
    if (!pwd) return 'weak';
    const score = [
      pwd.length >= 8,
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd)
    ].filter(Boolean).length;
    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
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

    onCvSelected(event: any) {
      this.cvFile = event.target.files[0];
    }

    SignUp(){
      const role = this.SignUpForm.value['role'];
      
      // Validate coach CV requirement
      if (role === 'coach' && !this.cvFile) {
        Swal.fire({
          icon: 'error',
          title: 'Missing CV',
          text: 'As a coach, you must upload your CV file.'
        });
        return;
      }

      if(this.SignUpForm.valid){
        this.isLoading = true;

        if (role === 'student') {
          // Student signup - send JSON
          this.userService.signup({
            "firstName":this.SignUpForm.value['firstName'],
            "lastName":this.SignUpForm.value['lastName'],
            "username":this.SignUpForm.value['email'],
            "numeroTel":this.SignUpForm.value['numTel'],
            "country":this.SignUpForm.value['country'],
            "password":this.SignUpForm.value['password']
          }).subscribe((res:any)=>{
            Swal.fire({
              icon: 'success',
              title: 'Signup successfully',
              text: 'Your registration went successfully! Check your email to verify your account.',
            });
            this.router.navigate(['/login']);
            this.isLoading = false;
          },(error)=>{
            let msg = 'Something went wrong. Please try again.';
            if (error.status === 0) {
              msg = 'Cannot reach the server. Make sure the backend is running.';
            } else if (error.status === 409) {
              msg = 'Email already used!';
            } else if (error.error?.message) {
              msg = error.error.message;
            }
            Swal.fire({ icon: 'error', title: 'Oops...', text: msg });
            this.isLoading = false;
          });
        } else if (role === 'coach') {
          // Coach signup - send FormData with CV file
          const formData = new FormData();
          formData.append('username', this.SignUpForm.value['email']);
          formData.append('password', this.SignUpForm.value['password']);
          formData.append('firstName', this.SignUpForm.value['firstName']);
          formData.append('lastName', this.SignUpForm.value['lastName']);
          formData.append('numeroTel', this.SignUpForm.value['numTel']);
          formData.append('country', this.SignUpForm.value['country']);
          formData.append('typeFormation', 'Web Development'); // Default type
          formData.append('CV', this.cvFile!);
          formData.append('Github', ''); // Optional
          formData.append('Linkedin', ''); // Optional
          formData.append('skills', ''); // Optional

          this.userService.signupCoach(formData).subscribe((res:any)=>{
            Swal.fire({
              icon: 'success',
              title: 'Signup successfully',
              text: 'Your registration went successfully! Check your email to verify your account.',
            });
            this.router.navigate(['/login']);
            this.isLoading = false;
          },(error)=>{
            let msg = 'Something went wrong. Please try again.';
            if (error.status === 0) {
              msg = 'Cannot reach the server. Make sure the backend is running.';
            } else if (error.status === 400) {
              msg = error.error?.message || 'Invalid form data. Please check all required fields.';
            } else if (error.error?.message) {
              msg = error.error.message;
            }
            Swal.fire({ icon: 'error', title: 'Oops...', text: msg });
            this.isLoading = false;
          });
        }
      }else{
        this.SignUpForm.markAllAsTouched();
      }
    }
}
