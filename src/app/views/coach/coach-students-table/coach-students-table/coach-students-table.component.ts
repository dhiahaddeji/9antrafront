import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';


@Component({
  selector: 'app-coach-students-table',
  templateUrl: './coach-students-table.component.html',
  styleUrls: ['./coach-students-table.component.css']
})
export class CoachStudentsTableComponent {
  constructor(private groupsService: GroupService,
    public userAuthService: UserAuthService,private projectService: ProjectService , private router: Router ) { 
      this.jwtToken = localStorage.getItem('jwtToken') || '';

    }
  project:any ;
  groups: any[] = [];
  private jwtToken: string;
  ngOnInit() {
    this.reloadData();
    if (this.jwtToken) {
      const formateurid = this.userAuthService.getId();
      this.groupsService
        .getGroupsByFormateurId(formateurid)
        .subscribe((groups) => {
          this.groups = groups;
          console.log('Fetched groups:', this.groups);
        });
    } else {
      console.log('No user connected');
    }
  }
  reloadData() {
    this.project = this.projectService.getProject().subscribe((res)=>{
      this.project=res;
      console.log(res);

     });

  }
  clientProject(id: number){
    this.router.navigate(['coach/projectmember/table', id]);
  }
  showDetails(id: number) {
    this.router.navigate(['coach/groups/table/project', id]);
  }
  getStudentImages(groupId: number): string[] {
    const group = this.groups.find((g) => g.id === groupId);
    if (!group || !group.etudiants) {
      return [];
    }

    const studentImages: string[] = [];

    for (const student of group.etudiants.slice(0, 3)) {
      studentImages.push(student.image);
    }

    return studentImages;
  }
}
