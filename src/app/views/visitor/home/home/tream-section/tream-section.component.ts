import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-tream-section',
  templateUrl: './tream-section.component.html',
  styleUrls: ['./tream-section.component.css'],
})
export class TreamSectionComponent implements OnInit {
  constructor(private sr: UserService) {}
  tabCoach: any = [];
  taballusers: any = [];
  image!: any;
  count_page:any
  page=0
  per_page=3

  ngOnInit(): void {
    this.getAllFormateur();
  }

  getAllFormateur() {
    this.sr.getFormateurs(this.page,this.per_page).subscribe((res:any)=>{
      this.tabCoach = res.formateurs.content;
      this.count_page = res.count_page.length
    },(error)=>{
      console.log(error);
    })
  }

  nextPage(){
    if(this.page<this.count_page){
      this.page++;
      this.getAllFormateur();
    }
  }

  previousPage(){
    if(this.page>0){
      this.page--;
      this.getAllFormateur()
    }
  }


}
