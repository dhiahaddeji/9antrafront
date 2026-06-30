import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-studentprofile',
  templateUrl: './admin-studentprofile.component.html',
  styleUrls: ['./admin-studentprofile.component.css']
})
export class AdminStudentprofileComponent {
  taballusers:any=[]
  tabStudent:any=[]

x:any;
  id:any ;
  data:any=[]
  nameuser=""
  pathdf=""
  url=""
  firstname=""
  username=""
  lastname=""
  about=""
  phone=""
  date=""
  linkedin=""
  photo=""
selectedValue:any;

  constructor(private sr:UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');


   }

   updateEnable() {
    console.log(this.selectedValue , this.id);

    this.sr.updateEnabeld(this.selectedValue,this.id).subscribe(res=>{
      console.log(res);
    });
   }

  getallStudent() {
    this.sr.getAllUsers().subscribe(res=>{
      this.taballusers=res;
      console.log(this.taballusers);
      // Filter the array to get only user with role "ETUDIANT" by id
      this.tabStudent = this.taballusers.filter((user: { roles: any[]; }) => {
        return user.roles.some(role => role.name === 'ETUDIANT');
      }
      );

})


  }
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
    this.username = this.data.username

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
      this.tabStudent = response as any[]; // Convert the response to 'any[]'
      console.log('tabStudent:', this.tabStudent); // Log the tabStudent array to check its contents
    },
    (error) => {
      console.error('Failed to get user notes:', error);
    }
  );
}



ngOnInit(): void {
  this.getUserId(this.id)
  this.getUserNotes(this.id); // Call the getUserNotes method during initialization


}

}