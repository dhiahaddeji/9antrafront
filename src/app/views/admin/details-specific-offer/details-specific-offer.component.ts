import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificOfferService } from 'src/app/MesServices/specific-Offer/specific-offer.service';
import { SpecificOffer } from 'src/app/Models/SpecificOffer';

@Component({
  selector: 'app-details-specific-offer',
  templateUrl: './details-specific-offer.component.html',
  styleUrls: ['./details-specific-offer.component.css']
})
export class DetailsSpecificOfferComponent implements OnInit  {
  constructor(private sp:SpecificOfferService , private route: ActivatedRoute){}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.get(projectId);
  }
  project: SpecificOffer = new SpecificOffer();
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
      (project: SpecificOffer) => {
        this.project = project;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  
  
  
}
