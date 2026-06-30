import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/MesServices/Record/record.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-student-records',
  templateUrl: './student-records.component.html',
  styleUrls: ['./student-records.component.css']
})
export class StudentRecordsComponent implements OnInit {

  selectedGrou:any=[];
  selectedRecords:any=[];
  imagepath = '';
  fullName=""
  UserPublisher:any=[];
  constructor(
    private ActivatedRoute:ActivatedRoute,
    private RecordService:RecordService,
    private UserService:UserService
  ) { }

  getGroupById(){
    this.UserService.getGroupbyidUser(sessionStorage.getItem('id')).subscribe((data:any)=>{
      this.selectedGrou=data;
      //loop for get all records by id group
      for (let i = 0; i < this.selectedGrou.length; i++) {
        this.RecordService.getRecordsByIdGroup(this.selectedGrou[i].id).subscribe((data:any)=>{
          this.selectedRecords=data;
          //loop for the user publisher of the record using getUserby id
          for (let j = 0; j < this.selectedRecords.length; j++) {
            this.UserService.getUserById(this.selectedRecords[j].idUser).subscribe((data:any)=>{
              this.UserPublisher.push(data);
              this.imagepath=this.UserPublisher[j].image;
              this.fullName=this.UserPublisher[j].firstName+" "+this.UserPublisher[j].lastName;
              console.log(this.UserPublisher);
            })
          }
          console.log(this.selectedRecords);
        })
      }
      console.log(this.selectedGrou);
    })
  }
  ngOnInit(): void {
    this.getGroupById();
  }



}
