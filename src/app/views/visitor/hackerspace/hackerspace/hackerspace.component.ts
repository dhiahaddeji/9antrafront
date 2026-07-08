import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement.dev';

const STATIC_HACKERSPACES: { [key: string]: any } = {
  'Tunis Lac 1': {
    region: 'Tunis Lac 1',
    adresse: 'LEVEL 1, Lac 1, Tunis',
    email: 'contact@9antra.tn',
    phone: '+216 71 000 000',
    description: 'Notre Hackerspace LEVEL 1 à Tunis Lac 1 est un espace collaboratif dédié à l\'innovation technologique et à l\'apprentissage. Venez nous rejoindre et démarrez votre parcours!',
    mapsUrl: 'https://www.google.com/maps/place/LEVEL+1/data=!4m2!3m1!1s0x0:0x80f3289b8fdbecd6?sa=X&ved=1t:2428&ictx=111',
    photoSrc: 'assets/HackerSpace/level1.avif',
  }
};

@Component({
  selector: 'app-hackerspace',
  templateUrl: './hackerspace.component.html',
  styleUrls: ['./hackerspace.component.css'],
})
export class HackerspaceComponent implements OnInit {
  parameterValue: any;
  region: any;
  email: any;
  phone: any;
  description: any;
  photoSrc: any;
  mapsUrl: string = '';
  hasError = false;
  adresse!: string;

  constructor(
    private hackerspaceService: HackerspacesService,
    private route: ActivatedRoute
  ) {}

  getALlByregion(nom: any): Observable<any> {
    return this.hackerspaceService.findHackerspaceByregion(nom);
  }

  private applyFallback(): void {
    const fallback = STATIC_HACKERSPACES[this.parameterValue];
    if (fallback) {
      this.hasError = false;
      this.region = fallback.region;
      this.adresse = fallback.adresse;
      this.email = fallback.email;
      this.phone = fallback.phone;
      this.description = fallback.description;
      this.mapsUrl = fallback.mapsUrl;
      this.photoSrc = fallback.photoSrc;
    } else {
      this.hasError = true;
      this.region = this.parameterValue;
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.parameterValue = params.get('region');
          // Apply static data immediately — no waiting for the API
          this.applyFallback();
          return this.getALlByregion(this.parameterValue);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (!res || !res.region) return;
          const fallback = STATIC_HACKERSPACES[this.parameterValue] || {};
          this.hasError    = false;
          this.region      = res.region;
          this.adresse     = res.adresse      || fallback.adresse     || '';
          this.email       = res.email        || fallback.email       || '';
          this.phone       = res.phone        || fallback.phone       || '';
          this.description = res.description  || fallback.description || '';
          this.mapsUrl     = res.location     || fallback.mapsUrl     || '';
          this.photoSrc    = res.photo
            ? environement.BASE_URL + '/uploads/Documents/' + res.photo
            : (fallback.photoSrc || '');
        },
        error: () => { /* fallback already applied above */ }
      });
  }
}
