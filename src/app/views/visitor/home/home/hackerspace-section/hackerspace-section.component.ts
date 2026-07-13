import { Component, OnInit } from '@angular/core';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-hackerspace-section',
  templateUrl: './hackerspace-section.component.html',
  styleUrls: ['./hackerspace-section.component.css']
})
export class HackerspaceSectionComponent implements OnInit {
  hackerspaces: any[] = [];

  constructor(private hackerspacesService: HackerspacesService) {}

  private readonly tunisLac1 = {
    region: 'Tunis Lac 1',
    adresse: 'Lac 1, Tunis',
    email: 'contact@9antra.tn',
    phone: '',
    photo: null,
    localPhoto: 'assets/hackerspace/level1.avif',
    location: 'https://www.google.com/maps/place/LEVEL+1/data=!4m2!3m1!1s0x0:0x80f3289b8fdbecd6?sa=X&ved=1t:2428&ictx=111',
  };

  ngOnInit(): void {
    this.hackerspacesService.getAllHackerspaces().subscribe(
      (data: any) => {
        const apiItems = (Array.isArray(data) ? data : []).map((h: any) => ({
          ...h,
          localPhoto: h.photo ? environement.BASE_URL.replace('/api', '') + '/uploads/Documents/' + h.photo : null,
        }));
        this.hackerspaces = apiItems;
        if (!this.hackerspaces.some((h: any) => h.region === 'Tunis Lac 1')) {
          this.hackerspaces = [this.tunisLac1, ...this.hackerspaces];
        }
      },
      (err: any) => {
        console.error(err);
        this.hackerspaces = [this.tunisLac1];
      }
    );
  }
}
