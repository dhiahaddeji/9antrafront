import { Component, OnInit } from '@angular/core';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{

  navbarHeight!: number;

  constructor(private navbarLoaderService: NavbarLoaderCommunicationService) {}


  ngOnInit(): void {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height;
    });
  }

  getLoaderStyle() {
    const marginTop = this.navbarHeight + 50;
    return { 'margin-top.px': marginTop };
  }

}
