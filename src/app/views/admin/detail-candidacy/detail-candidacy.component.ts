import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CandidacyService } from 'src/app/MesServices/Candidacy/candidacy.service';
import { Candidacy } from 'src/app/Models/Candidacy';

@Component({
  selector: 'app-detail-candidacy',
  templateUrl: './detail-candidacy.component.html',
  styleUrls: ['./detail-candidacy.component.css']
})
export class DetailCandidacyComponent implements OnInit  {
  constructor(private sp:CandidacyService , private route: ActivatedRoute, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.get(projectId);
  }
  project: Candidacy = new Candidacy();
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
      (project: Candidacy) => {
        this.project = project;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  url="";
  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("assets/Candidacy/"+this.project.cv);
  }
  
  

  
  
}


