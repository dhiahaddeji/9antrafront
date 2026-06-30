import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  constructor(private router: Router) {}


  contact() {
    this.router.navigate(['/contacts', 'Contact'])
  }


}
