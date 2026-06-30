import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent  implements OnInit  {
  constructor(private sp:OffersService , private route: ActivatedRoute){}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.get(projectId);
  }
  project: Offers = new Offers();
  copyEmail(email: string) {
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  get(projectId: number): void {
    this.sp.getById(projectId).subscribe(
      (project: Offers) => {
        this.project = project;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
