import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-resumecoach',
  templateUrl: './resumecoach.component.html',
  styleUrls: ['./resumecoach.component.css']
})
export class ResumecoachComponent implements OnInit{

  id!:any
  url=""
  data:any=[]
  dataFormateur:any=[]
  nameuser=""
  pathdf=""

  constructor(private route: ActivatedRoute ,private sanitizer: DomSanitizer,private sr:UserService) {
    this.id = this.route.snapshot.paramMap.get('id');

   }

   get safeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  getUserId(idd:any)
{
  this.sr.getUserByid(idd).subscribe(ex=>{
    this.data=ex
    console.log(ex)
    this.nameuser=this.data.firstName
    this.sr.getFormateursOfuser().subscribe(res=>{
      this.dataFormateur=res
      console.log(this.dataFormateur);
     //console log the user id from dataFormateur
      this.dataFormateur.forEach((element:any) => {
        if(element.user.id==this.data.id){
          this.pathdf=element.cv
          this.url="../../../../assets/Documents/"+this.pathdf
    console.log(this.pathdf);
    console.log(this.url);
        }
      });


    })




  })



}


  ngOnInit(){
    this.getUserId(this.id)

  }
}
