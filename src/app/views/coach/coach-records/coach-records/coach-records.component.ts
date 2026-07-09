import { UserService } from './../../../../MesServices/UserService/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/MesServices/Record/record.service';
import { environement } from 'src/environement/environement.dev';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coach-records',
  templateUrl: './coach-records.component.html',
  styleUrls: ['./coach-records.component.css']
})
export class CoachRecordsComponent implements OnInit {

  backendUrl = environement.BASE_URL;
  filesUrl = environement.BASE_URL.replace('/api', ''); // Remove /api for static files
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
      
      // PRE-CALCULATE VIDEO URLs to avoid repeated calls
      this.ListViedo.forEach((record: any) => {
        record.videoUrl = this.calculateVideoUrl(record.videoLink);
        // Initialize user data on each record
        record.fullName = 'Unknown User';
        record.imagepath = '';
      });
      
      console.log(this.ListViedo);

      // For each record, get the publisher info
      for (let i = 0; i < this.ListViedo.length; i++) {
        // Determine the user ID - try multiple property names
        const recordUserId = this.ListViedo[i].idUser || this.ListViedo[i].userId || (this.ListViedo[i].user?.id);
        
        // Guard against undefined/null user IDs
        if (!recordUserId) {
          console.warn('No user ID found for record:', this.ListViedo[i]);
          continue;
        }
        
        this.UserService.getUserById(recordUserId).subscribe(
          (userData: any) => {
            // Attach user data directly to the record
            this.ListViedo[i].publisher = userData;
            this.ListViedo[i].imagepath = userData.image;
            this.ListViedo[i].fullName = userData.firstName + " " + userData.lastName;
            console.log('Record with publisher:', this.ListViedo[i]);
          },
          (error) => {
            console.warn('Error getting user for record:', error);
            // Keep defaults if error
          }
        );
      }
    })
  }
  ngOnInit(): void {
    this.getByIdGroup();
    this.deleteRecord
  }

  calculateVideoUrl(videoLink: string): string {
    if (!videoLink) {
      return '';
    }

    // If videoLink already starts with http, return as-is
    if (videoLink.startsWith('http')) {
      return videoLink;
    }

    // Remove leading slash if present
    const cleanLink = videoLink.startsWith('/') ? videoLink.substring(1) : videoLink;
    
    // Use filesUrl (without /api) for static files
    return this.filesUrl + '/uploads/Records/' + cleanLink;
  }
}
