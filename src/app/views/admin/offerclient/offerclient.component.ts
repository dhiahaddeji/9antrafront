import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { OfferClient } from 'src/app/Models/OfferClient';

@Component({
  selector: 'app-offerclient',
  templateUrl: './offerclient.component.html',
  styleUrls: ['./offerclient.component.css']
})
export class OfferclientComponent implements OnInit{
  constructor(private router: Router,private route: ActivatedRoute,private projectService: OffersService ){}
  adminProjectId: OfferClient[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.projectService.getProjectClientsByAdminProjectId(id).subscribe(
        (event: OfferClient[]) => {
          this.adminProjectId = event;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  clientProject(id: number){
    this.router.navigate(['admin/offerclient-detail', id]);
  }
}
