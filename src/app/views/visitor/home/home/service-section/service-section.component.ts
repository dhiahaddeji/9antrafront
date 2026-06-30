import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.css']
})
export class ServiceSectionComponent implements OnInit {
  Allformation: any=[];
  count_page:any
  page=0
  per_page=3

  constructor(private formationsService: FormationsService) { }

  ngOnInit(): void {
    this.getALLFormations();
  }


  getALLFormations() {
    this.formationsService.getFormationsPaginate(this.page,this.per_page).subscribe(
      (data:any) => {
        this.Allformation = data.formation.content;
        this.count_page = data.count_page.length
      },(error)=>{
        console.log(error);
      }
    );
  }

  nextPage(){
    if(this.page<this.count_page){
      this.page++;
      this.getALLFormations();
    }
  }

  previousPage(){
    if(this.page>0){
      this.page--;
      this.getALLFormations()
    }
  }
}
