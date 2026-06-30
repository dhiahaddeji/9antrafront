import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   role:any
  constructor(private location: Location) { }
  ngOnInit(): void {
    // this.role = localStorage.getItem('roles')
    // console.log(this.role)
    // if(this.role != null){
    //   this.location.back()
    // };
  }

}
