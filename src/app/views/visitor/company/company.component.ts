import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  ngOnInit(): void {
    this.get();
  }

  adminProjects: Company[] = [];

constructor(private sp:CompanyService){}
 get(){this.sp.getAllByS().subscribe(
    (adminProjects: Company[]) => {
      this.adminProjects = adminProjects;
    },
    (error: any) => {
      console.error(error);
    }
  );} 
}
