import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificProjectService } from 'src/app/MesServices/SpecificProjects/specific-project.service';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Component({
  selector: 'app-specificproject-details',
  templateUrl: './specificproject-details.component.html',
  styleUrls: ['./specificproject-details.component.css']
})
export class SpecificprojectDetailsComponent implements OnInit {
  constructor(private sp:SpecificProjectService , private route: ActivatedRoute){}
  project: SpecificProject = new SpecificProject();

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    // this.get(projectId);
    this.get(projectId);
  }
  adminProjects: SpecificProject[] = [];
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
      (project: SpecificProject) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
    
}


