import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  isLoading: boolean = false;
  private routeSubscription!: Subscription;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private route : ActivatedRoute
  ) {
    this.email = '';
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

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
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
        console.log(error);
        let msg = 'Login failed. Please try again.';
        if (error.status === 0) {
          msg = 'Cannot reach the server. Make sure the backend is running on port 8094.';
        } else if (error.status === 400) {
          msg = error.error?.message || 'Invalid credentials or email not verified.';
        }
        Swal.fire({ icon: 'error', title: 'Oops...', text: msg });
        this.isLoading = false;
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
