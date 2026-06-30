import { UserService } from './../../../../MesServices/UserService/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/MesServices/Record/record.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coach-records',
  templateUrl: './coach-records.component.html',
  styleUrls: ['./coach-records.component.css']
})
export class CoachRecordsComponent implements OnInit {

  idGroup: any;
  ListViedo: any[] = [];
  UserPublisher: any = [];
  imagepath = '';
  fullName = ""

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private RecordService: RecordService,
    private UserService: UserService
  ) {

    this.idGroup = this.ActivatedRoute.snapshot.params['id'];

  }
  //delete record byid
  deleteRecord(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecordService.deleteRecord(id).subscribe((data: any) => {
          Swal.fire('Deleted!', 'The record has been deleted.', 'success');
          this.getByIdGroup();
        });
      }
    });
  }

  getByIdGroup() {
    this.RecordService.getRecordsByIdGroup(this.idGroup).subscribe((data: any) => {
      this.ListViedo = data;
      console.log(this.ListViedo);

      for (let i = 0; i < this.ListViedo.length; i++) {
        this.UserService.getUserById(this.ListViedo[i].idUser).subscribe((data: any) => {
          this.UserPublisher.push(data);
          this.imagepath = this.UserPublisher[i].image;
          this.fullName = this.UserPublisher[i].firstName + " " + this.UserPublisher[i].lastName;
          console.log(this.UserPublisher);

        })
      }
    })
  }
  ngOnInit(): void {
    this.getByIdGroup();
    this.deleteRecord
  }



}
