import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { Offers } from 'src/app/Models/Offers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit{
  adminProjects: Offers[] = [];
  isLoading: boolean = false;

  constructor(private sp:OffersService , private router: Router){}

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.isLoading = true;
    this.sp.getAll().subscribe(
      (adminProjects: Offers[]) => {
        this.adminProjects = adminProjects;
        this.isLoading = false;
      },
      (error: any) => {
        console.error(error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load offers. Please try again later.',
        });
      }
    );
  } 

  showEventDetails(id: number) {
    this.router.navigate(['/offers-details', id]);
  }
  
}
