import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  currentUser: any;
  emailInvalid: boolean = false;
  data: any = [];
  status = '';
  username!: string;
  country!: string;
  numeroTel!: string;
  email!: string;
  photo!: any;
  image!: any;
  UpdaImage!: FormGroup;
  uploadInProgress!: boolean;
  showSuccessMessage!: boolean;
  isLoading!: boolean;
  UserService: any;
  Addetat!: boolean;
  showSuccessIcon!: boolean;
  msjEtat!: string;
  firstNameInp!: any;
  lastNameInp!: any;
  usernameInp!: any;
  phoneInp!: any;
  passwordInp!: any;
  cppasswordInp!: any;
  aboutInp!: any;

  constructor(
    private http: HttpClient,
    private sr: UserService,
    private sf: FormBuilder
  ) {
    this.UpdaImage = this.sf.group({
      Photo: '',
    });
  }
  checkEmailFormat() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !emailRegex.test(this.usernameInp);
  }
  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
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
      id: localStorage.getItem('id'),
      firstName: this.firstNameInp,
      lastName: this.lastNameInp,
      username: this.usernameInp,
      numeroTel: this.phoneInp,
      password: this.cppasswordInp,
      about: this.aboutInp,
    };

    this.sr.updateUser(ddata).subscribe(
      (res) => {
        console.log(res);
        this.status = 'User Updated';
        this.getUserByid(localStorage.getItem('id'));

        // Show success message
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User updated successfully!',
          showConfirmButton: true,
        });
      },
      (error) => {
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
  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getUserByid(localStorage.getItem('id'));
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
      this.usernameInp = this.data.username;
      this.firstNameInp = this.data.firstName;
      this.lastNameInp = this.data.lastName;
      this.phoneInp = this.data.numeroTel;
      this.aboutInp = this.data.about;
    });
  }
  getCurrentUserDetails(): void {
    this.http.get<any>('https://9antrabackend-production.up.railway.app/api/user/me').subscribe(
      (response) => {
        this.currentUser = response;
        console.log('Current user:', this.currentUser);
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      }
    );
  }
  imageUrl!: string;

  selectedFile!: File;

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



}



