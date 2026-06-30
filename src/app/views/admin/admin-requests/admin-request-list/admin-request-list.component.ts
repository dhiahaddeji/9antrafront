import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/MesServices/Request/request.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Request } from 'src/app/Models/Request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './admin-request-list.component.html',
  styleUrls: ['./admin-request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {


  requests!: Request[]
  selectedStatus:any
  idRequest!: number
  showLoader: boolean = false

  constructor(
    private rs: RequestService,
    private us: UserService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.rs.getAll().subscribe(
      (data: Request[]) => {
        this.requests = data
      }
    )
  }

  changeStatus() {
    this.rs.changeStatus(this.idRequest, this.selectedStatus).subscribe(
      () => {
        if(this.selectedStatus == 'PAID') {
          Swal.fire('Changed!', 'Status has been changed.', 'success');
          this.getAll()
        }else if(this.selectedStatus == 'UNPAID'){
          Swal.fire('Changed!', 'Status has been changed.', 'success');
          this.getAll()
        }
         else {
          Swal.fire('Changed!', 'Status has been changed.', 'success');
          this.getAll()
          // this.us.ajoutStudent(this.idRequest).subscribe(
          //   (response: any) => {
          //     if(response.message === 'student exists') {
          //       Swal.fire({
          //         title: 'Student exists',
          //         text: "Do you want to add it to another group ?",
          //         icon: 'warning',
          //         showCancelButton: true,
          //         confirmButtonColor: '#3085d6',
          //         cancelButtonColor: '#d33',
          //         confirmButtonText: 'Yes'
          //       }).then((result) => {
          //         if (result.isConfirmed) {
          //           this.showLoader = false
          //           this.router.navigateByUrl('/admin/groups')
          //         } else {
          //           this.showLoader = false
          //           // The user clicked "Cancel" or closed the dialog
          //           // You can handle this case or do nothing
          //         }
          //       });

          //     }
          //     if(response.message === 'Student registered successfully!'){
          //       this.showLoader = false
          //       this.router.navigateByUrl('/admin/groups')
          //     }

          //   },
          //   (error) => {
          //     Swal.fire('Error !', 'An error occured please try again', 'error');
          //     this.showLoader = false
          //   }
          // )
        }

      },
      (error: any) => {
        if( error.status === 400 &&  error.error === 'Formation not found')
          Swal.fire('Error !', 'An error occured please try again', 'error');
        else if(error.status === 400 && error.error === 'Status not modified') {
          Swal.fire('Alert', 'Status not modified', 'warning');
        }

      }
    )
  }

  setId(id: number) {
    this.idRequest = id;
    console.log(this.idRequest);

  }

}
