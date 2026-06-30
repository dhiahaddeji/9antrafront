import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { RecordService } from 'src/app/MesServices/Record/record.service';

@Component({
  selector: 'app-admin-grouprecords',
  templateUrl: './admin-grouprecords.component.html',
  styleUrls: ['./admin-grouprecords.component.css']
})
export class AdminGrouprecordsComponent implements OnInit{
  id:any;
  records:any;
  constructor(private route: ActivatedRoute,private recordsService:RecordService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getRecordsByIdGroup();
  }

  getRecordsByIdGroup(){
    this.recordsService.getRecordsByIdGroup(this.id).subscribe((res:any)=>{
      this.records=res
      console.log(this.records);
    },(error)=>{
      console.log(error);

    })
  }

  deleteRecordById(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.recordsService.deleteRecord(id).subscribe((res:any)=>{
          Swal.fire('Deleted!', 'Record has been deleted.', 'success');
          this.getRecordsByIdGroup(); // Update the Page after successful deletion
        });
      }})
  }

}
