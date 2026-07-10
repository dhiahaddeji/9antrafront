import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-coachlist',
  templateUrl: './admin-coachlist.component.html',
  styleUrls: ['./admin-coachlist.component.css']
})
export class AdminCoachlistComponent {
  data:any=[]
  nameuser=""
  pathdf=""
  url=""
  id!:any
  tabFormateur:any=[]
  constructor(private sr:UserService ,private route: ActivatedRoute,private sanitizer: DomSanitizer) {
}
get safeUrl() {
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
}
getUserId(id:any)
{
  this.sr.getUserByid(id).subscribe(ex=>{
    this.data=ex
    console.log(ex)
    this.nameuser=this.data.firstName
    this.pathdf=this.data.files
    this.url="../../../assets/Documents/"+this.data.files
  })
}


getAllFormateur() {
  this.sr.getFormateursOfuser().subscribe(res=>{
    this.tabFormateur=res
    console.log(this.tabFormateur);
  }
    )
}
tabCoach:any=[]
taballusers:any=[]

  getallCoach() {
    this.sr.getAllUsers().subscribe(res=>{
      this.taballusers=res;
      console.log(this.taballusers);
      this.tabCoach = this.taballusers.filter((user: { roles: any[]; }) => {
        return user.roles.some(role => role.name === 'FORMATEUR');
        });
        console.log(this.tabCoach);
      })
    }
    updateEnabled(coach: any, value: number) {
      this.sr.updateEnabeld(value, coach.id).subscribe();
    }

    ngOnInit(): void {
      this.getallCoach()

      this.getAllFormateur()
    }

      }



