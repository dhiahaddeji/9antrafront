import { Component, OnInit } from '@angular/core';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';

@Component({
  selector: 'app-path-contact',
  templateUrl: './path-contact.component.html',
  styleUrls: ['./path-contact.component.css']
})
export class PathContactComponent implements OnInit {

  navbarHeight!: number;

  constructor(private navbarLoaderService: NavbarLoaderCommunicationService) {}


  ngOnInit(): void {
    
  }

  getTopStyle() {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height;
    });
    return { 'margin-top.px': this.navbarHeight };
  }
}
