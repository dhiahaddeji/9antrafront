import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  currentUser: any;
  data: any = null;
  groups: any[] = [];
  previewUrl: string | null = null;
  photoSelected = false;

  UpdaImage!: FormGroup;
  isLoading = false;
  uploadInProgress = false;

  constructor(
    private http: HttpClient,
    private sr: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private groupService: GroupService
  ) {
    this.UpdaImage = this.formBuilder.group({ Photo: '' });
  }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    this.getUserByid(id);
    this.getGroups(id);
  }

  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      if (this.data?.image) {
        this.previewUrl = `assets/Documents/${this.data.image}`;
      }
    });
  }

  getGroups(id: any) {
    this.groupService.getGroupsByStudentId(id).subscribe(
      (res: any) => { this.groups = res; },
      (err: any) => { console.error(err); }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.UpdaImage.get('Photo')!.setValue(event.target.files[0]);
      this.photoSelected = true;
    }
  }

  previewPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.previewUrl = e.target.result; };
      reader.readAsDataURL(event.target.files[0]);
    }
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
        Swal.fire({
          icon: 'success',
          title: 'Photo updated successfully!',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) location.reload();
        });
      },
      () => {
        this.isLoading = false;
        this.uploadInProgress = false;
        Swal.fire({ icon: 'error', title: 'Failed to update photo. Please try again.' });
      }
    );
  }
}
