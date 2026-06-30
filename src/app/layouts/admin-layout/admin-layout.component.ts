import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private auth: UserAuthService, private route: Router) {}

  ngOnInit(): void {
    /*/    const roles: string[] = this.auth.getRoles() ?? [];

    if (!roles.includes("ADMIN")) {
      this.route.navigate(['/']);
    }   */
  }
}
