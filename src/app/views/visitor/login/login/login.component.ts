import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { environement } from 'src/environement/environement.dev';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isLoading: boolean = false;
  private routeSubscription!: Subscription;
  
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private route : ActivatedRoute
  ) {
    this.email = '';
    this.password = '';
  }
  
  ngOnInit(): void {
    // Subscribe to the 'queryParams' observable to get query parameters
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.userService.verifyEmail(email).subscribe(
          (res: any) => {
            console.log(res);
            if(res.status==200){
              Swal.fire({
                icon: 'success',
                title: 'Verification Email',
                text: 'Your email is verified',
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  login(loginForm: any) {
    this.isLoading = true;

    // Validate form
    if (!loginForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields correctly'
      });
      this.isLoading = false;
      return;
    }

    // Get form values
    const loginData = {
      username: this.email.trim(),
      password: this.password
    };

    console.log('Login attempt with:', { username: loginData.username, password: '***' });

    this.userService.login(loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.userAuthService.setRoles(response.roles[0]);
        this.userAuthService.setToken(response.accessToken);
        this.userAuthService.setRolesSession(response.roles[0]);
        this.userAuthService.setTokenSession(response.accessToken);
        this.userAuthService.setSessionId(response.id);
        this.userAuthService.setId(response.id);
        this.userAuthService.setUsername(response.username);
        const role = localStorage.getItem('roles');
        if (role === '"ADMINISTRATEUR"') {
          this.router.navigate(['/admin']);
        } else if (role === '"ETUDIANT"') {
          this.router.navigate(['/student']);
        } else if (role === '"FORMATEUR"') {
          this.router.navigate(['/coach']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        let msg = 'Login failed. Please try again.';
        
        if (error.status === 0) {
          msg = 'Cannot reach the server. Make sure the backend is running.';
        } else if (error.status === 400) {
          msg = error.error?.message || 'Invalid email or password.';
        } else if (error.status === 401) {
          msg = 'Unauthorized. Check your credentials.';
        } else if (error.status === 403) {
          msg = 'Account is disabled. Contact support.';
        }
        
        Swal.fire({ 
          icon: 'error', 
          title: 'Oops...', 
          text: msg,
          didClose: () => {
            this.password = ''; // Clear password on error
          }
        });
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loginWithOAuth2(provider: string): void {
    const backendBase = environement.BASE_URL.replace('/api', '');
    window.location.href = `${backendBase}/oauth2/authorize/${provider}`;
  }

}
