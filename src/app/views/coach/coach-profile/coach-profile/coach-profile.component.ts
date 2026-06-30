import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css'],
})
export class CoachProfileComponent implements OnInit {
  currentUser: any;

  data: any = [];
  username!: string;
  image!: any;

  country!: string;
  numeroTel!: string;
  email!: string;
  photo!: any;

  UpdaImage!: FormGroup;
  uploadInProgress!: boolean;
  showSuccessMessage!: boolean;
  isLoading!: boolean;
  UserService: any;
  Addetat!: boolean;
  showSuccessIcon!: boolean;
  msjEtat!: string;

  status: boolean = false;
  updateImage!: FormGroup;
  constructor(
    private sr: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.UpdaImage = this.formBuilder.group({
      Photo: '',
    });
  }

  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.country = this.data.Country;
      this.numeroTel = this.data.numeroTel;
      this.email = this.data.username;
      this.photo = this.data.image;
    });
  }
  selectedFileName: string = '';
  get f() {
    return this.updateImage.controls;
  }

  imageUrl!: string;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.UpdaImage.get('Photo')!.setValue(file);
      console.log(this.UpdaImage.get('Photo')!.value);
    } else {
      this.UpdaImage.get('Photo')!.setValue(this.imagepath);
    }
  }

  imagepath(imagepath: any) {
    throw new Error('Method not implemented.');
  }



    AddCoachForm() {
      const formData = new FormData();
      const photoFile = this.UpdaImage.get('Photo')?.value;
      if (photoFile instanceof File) {
        formData.append('file', photoFile, photoFile.name);
      }


      this.isLoading = true;
      this.uploadInProgress = true;

      this.sr.updateUserImage(localStorage.getItem("id"), formData).subscribe(
        res => {
          console.log(res);

          this.isLoading = false;
          this.uploadInProgress = false;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Image updated successfully.',
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // Refresh the page
              location.reload();
            }
          });
        },
        error => {
          // Handle error if needed
          this.isLoading = false;
          this.uploadInProgress = false;
        }
      );
    }
  
    ngOnInit(): void {
      this.getCurrentCoachDetails();
      this.getUserByid(localStorage.getItem('id'))


    }
    getCurrentCoachDetails(): void {
      this.http.get<any>('https://9antrabackend-production.up.railway.app/api/formateur/me').subscribe(
        response => {
          this.currentUser = response;
          console.log('Current user:', this.currentUser);
        },
        error => {
          console.error('Error fetching current user details:', error);
        }
      );
    }
}
