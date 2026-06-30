import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-coachprofile',
  templateUrl: './admin-coachprofile.component.html',
  styleUrls: ['./admin-coachprofile.component.css'],
})
export class AdminCoachprofileComponent implements OnInit {
  data: any = [];
  nameuser = '';
  pathdf = '';
  url = '';
  firstname = '';
  lastname = '';
  about = '';
  phone = '';
  date = '';
  linkedin = '';
  photo = '';
  safeUrl: string | undefined;

  tabFormateur: any = [];
  id: any;
  selectedValue: any;
  constructor(private route: ActivatedRoute, private sr: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  updateEnable() {
    console.log(this.selectedValue, this.id);

    this.sr.updateEnabeld(this.selectedValue, this.id).subscribe((res) => {
      console.log(res);
    });
  }

  tabCoach:any=[]
  taballusers:any=[]
  getUserId(id:any)
{
  this.sr.getUserByid(id).subscribe(ex=>{
    this.data=ex
    console.log(ex)
    this.firstname=this.data.firstName
    this.lastname=this.data.lastName
    this.about=this.data.about
    this.phone=this.data.numeroTel
    this.date=this.data.createdAt
    this.linkedin=this.data.Linkedin
    this.photo = this.data.image

    this.pathdf=this.data.files
    this.url="../../../assets/Documents/"+this.data.files
  })
}
addNoteToUser(content: string) {
  this.sr.addNoteToUser(this.id, content).subscribe(
    (response) => {
      console.log('Note added successfully:', response);
      // Show SweetAlert success notification
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Note added successfully!',
        confirmButtonText: 'OK',
      });
    },
    (error) => {
      console.error('Failed to add note:', error);
      // Show SweetAlert error notification
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add note. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  );
}
getUserNotes(userId: any) {
  this.sr.getUserNotes(userId).subscribe(
    (response: any) => { // Use 'any' instead of 'any[]'
      console.log('User notes:', response);
      this.tabFormateur = response as any[]; // Convert the response to 'any[]'
      console.log('tabFormateur:', this.tabFormateur); // Log the tabStudent array to check its contents
    },
    (error) => {
      console.error('Failed to get user notes:', error);
    }
  );
}

  ngOnInit(): void {
    this.getUserId(this.id)
    this.getUserNotes(this.id);

  }
}
