import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { OfferClient } from 'src/app/Models/OfferClient';

@Component({
  selector: 'app-offerclient-detail',
  templateUrl: './offerclient-detail.component.html',
  styleUrls: ['./offerclient-detail.component.css']
})
export class OfferclientDetailComponent implements OnInit {
  constructor(private sp:OffersService , private route: ActivatedRoute , private sanitizer: DomSanitizer){}
  project: OfferClient = new OfferClient();

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.get(projectId);
  }
  url="";
  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("assets/OfferClient/"+this.project.cv);
  }
  get(projectId: number): void {
   
    this.sp.getById2(projectId).subscribe(
      (project: OfferClient) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  copyEmail(email: string) {
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
