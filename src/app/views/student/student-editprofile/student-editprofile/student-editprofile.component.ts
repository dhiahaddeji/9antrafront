import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-editprofile',
  templateUrl: './student-editprofile.component.html',
  styleUrls: ['./student-editprofile.component.css']
})
export class StudentEditprofileComponent implements OnInit {
  taballusers:any=[]
  tabStudent:any=[]
  emailInvalid: boolean = false;
  status=""
  showEmailError: boolean = false;

  currentUser: any;
  data: any = [];
  username!:string;
  country!:string;
  numeroTel!:string
  email!:string;
  photo!:any
  image!:any
UpdaImage!:FormGroup
  uploadInProgress!: boolean;
  showSuccessMessage!: boolean;
  isLoading!: boolean;
  UserService: any;
  Addetat!: boolean;
  showSuccessIcon!: boolean;
  msjEtat!: string;
  lastname!:string;
  firstname!:string;

//---------------------------------------------//
firstNameInp!:any
lastNameInp!:any
usernameInp!:any
phoneInp!:any
passwordInp!:any
cppasswordInp!:any
aboutInp!:any
updateUser() {
  if (!this.isValidEmail(this.usernameInp)) {
    // Invalid email format, show error message
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Invalid email format. Please enter a valid email.',
      showConfirmButton: true,
    });
    return; // Exit the method without updating the user
  }

  if (this.passwordInp !== this.cppasswordInp) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Passwords do not match.',
      showConfirmButton: true,
    });
    return; // Exit the method without updating the user
  }

  // If email format is valid and passwords match, proceed with the update
  let ddata: any = {
    "id": localStorage.getItem('id'),
    "firstName": this.firstNameInp,
    "lastName": this.lastNameInp,
    "username": this.usernameInp,
    "numeroTel": this.phoneInp,
    "password": this.cppasswordInp,
    "about": this.aboutInp,
  };

  this.sr.updateUser(ddata).subscribe(
    res => {
      console.log(res);
      this.status = "User Updated";
      this.getUserByid(localStorage.getItem('id'));

      // Show success message
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User updated successfully!',
        showConfirmButton: true,
      });
    },
    error => {
      console.error(error);

      // Show error message
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error updating user. Please try again later.',
        showConfirmButton: true,
      });
    }
  );
}

checkEmailFormat() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  this.emailInvalid = !emailRegex.test(this.usernameInp);
}
isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



//---------------------------------------------//
    constructor(private sr:UserService , private http: HttpClient, private sf:FormBuilder) {   this.UpdaImage = this.sf.group({
      Photo: ''
    })}
    getallStudent() {
      this.sr.getAllUsers().subscribe(res=>{
        this.taballusers=res;
        console.log(this.taballusers);

        // Filter the array to get only users with role "ETUDIANT"
        this.tabStudent = this.taballusers.filter((user: { roles: any[]; }) => {
          return user.roles.some(role => role.name === 'ETUDIANT');
        });

        console.log(this.tabStudent);
      })
    }
    getUserByid(id:any){
      this.sr.getUserById(id).subscribe(res=>{
        this.data=res
        this.firstname=this.data.firstName
        this.lastname=this.data.lastName
        this.country =this.data.Country
        this.numeroTel=this.data.numeroTel
        this.email=this.data.username
        this.photo = this.data.image;
        this.previewSrc = this.data.image ? `assets/Documents/${this.data.image}` : null;
        this.usernameInp=this.data.username
        this.firstNameInp=this.data.firstName
        this.lastNameInp=this.data.lastName
        this.phoneInp=this.data.numeroTel
        this.aboutInp=this.data.about
      })
    }


    getCurrentUserDetails(): void {
      this.http.get<any>('https://9antrabackend-production.up.railway.app/api/user/me').subscribe(
        response => {
          this.currentUser = response;
          console.log('Current user:', this.currentUser);
        },
        error => {
          console.error('Error fetching current user details:', error);
        }
      );
    }
    imageUrl!: string;
  previewSrc: string | null = null;
  photoSelected = false;

  selectedFile!: File;

  previewPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.previewSrc = e.target.result; };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.UpdaImage.get('Photo')!.setValue(file);
      this.photoSelected = true;
    }
  }

  imagepath(imagepath: any) {
    throw new Error('Method not implemented.');
  }


    AddCoachForm() {
      const formData = new FormData();
      const photoFile = this.UpdaImage.get('Photo')?.value;
      if (!(photoFile instanceof File)) return;

      formData.append('file', photoFile, photoFile.name);
      this.isLoading = true;
      this.uploadInProgress = true;

      this.sr.updateUserImage(localStorage.getItem('id'), formData).subscribe(
        () => {
          this.isLoading = false;
          this.uploadInProgress = false;
          this.photoSelected = false;
          Swal.fire({ icon: 'success', title: 'Photo updated successfully!' });
        },
        () => {
          this.isLoading = false;
          this.uploadInProgress = false;
          Swal.fire({ icon: 'error', title: 'Failed to upload photo. Please try again.' });
        }
      );
    }
      ngOnInit(): void {
        this.getallStudent()
        this.getCurrentUserDetails();
        this.getUserByid(localStorage.getItem('id'))
      }

}

