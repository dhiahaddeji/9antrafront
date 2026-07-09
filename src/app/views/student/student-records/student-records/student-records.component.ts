import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/MesServices/Record/record.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-student-records',
  templateUrl: './student-records.component.html',
  styleUrls: ['./student-records.component.css']
})
export class StudentRecordsComponent implements OnInit {

  backendUrl = environement.BASE_URL;
  filesUrl = environement.BASE_URL.replace('/api', ''); // Remove /api for static files
  selectedGrou: any[] = [];
  selectedRecords: any[] = [];
  
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private RecordService: RecordService,
    private UserService: UserService
  ) { }

  getGroupById(){
    // Use localStorage instead of sessionStorage to get user ID
    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
    
    if (!userId) {
      console.error('User ID not found in localStorage or sessionStorage');
      return;
    }
    
    console.warn('Getting groups for user:', userId);
    
    this.UserService.getGroupbyidUser(userId).subscribe(
      (data: any) => {
        this.selectedGrou = data;
        console.warn('Groups loaded:', this.selectedGrou);
        
        // Reset records
        this.selectedRecords = [];
        
        // Loop for get all records by id group
        for (let i = 0; i < this.selectedGrou.length; i++) {
          this.RecordService.getRecordsByIdGroup(this.selectedGrou[i].id).subscribe(
            (records: any) => {
              // Add video URL to each record
              records.forEach((record: any) => {
                record.videoUrl = this.calculateVideoUrl(record.videoLink);
              });
              
              // Add all records to the list
              this.selectedRecords.push(...records);
              
              // For each record, get the publisher info
              records.forEach((record: any) => {
                // Determine the user ID - try multiple property names
                const recordUserId = record.idUser || record.userId || (record.user?.id);
                
                // Guard against undefined/null user IDs
                if (!recordUserId) {
                  console.warn('No user ID found for record:', record);
                  record.fullName = 'Unknown User';
                  record.imagepath = '';
                  return;
                }
                
                this.UserService.getUserById(recordUserId).subscribe(
                  (userData: any) => {
                    // Attach user data directly to the record
                    record.publisher = userData;
                    record.imagepath = userData.image;
                    record.fullName = userData.firstName + " " + userData.lastName;
                    console.warn('Record with publisher:', record);
                  },
                  (error) => {
                    console.warn('Error getting user for record:', error);
                    // Set defaults if error
                    record.fullName = 'Unknown User';
                    record.imagepath = '';
                  }
                );
              });
            },
            (error) => {
              console.warn('Error getting records:', error);
            }
          );
        }
        console.log(this.selectedGrou);
      },
      (error) => {
        console.error('Error getting groups:', error);
      }
    );
  }
  
  ngOnInit(): void {
    this.getGroupById();
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
