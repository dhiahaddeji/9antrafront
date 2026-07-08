import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-oauth2-redirect',
  template: `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;">
      <div class="spinner-border text-danger" style="width:3rem;height:3rem;" role="status"></div>
      <p style="margin-top:16px;font-family:Jost,sans-serif;color:#555;">Signing you in...</p>
    </div>
  `
})
export class OAuth2RedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token: string = params['token'];
      const id: string = params['id'];
      const username: string = params['username'];
      const role: string = params['role'];

      if (!token) {
        this.router.navigate(['/login']);
        return;
      }

      this.userAuthService.setToken(token);
      this.userAuthService.setTokenSession(token);
      this.userAuthService.setRoles(role);
      this.userAuthService.setRolesSession(role);
      this.userAuthService.setId(Number(id));
      this.userAuthService.setSessionId(Number(id));
      this.userAuthService.setUsername(username);

      if (role === 'ADMINISTRATEUR') {
        this.router.navigate(['/admin']);
      } else if (role === 'FORMATEUR') {
        this.router.navigate(['/coach']);
      } else {
        this.router.navigate(['/student']);
      }
    });
  }
}
