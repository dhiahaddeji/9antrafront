import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/MesServices/Report/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reports-add-form',
  templateUrl: './admin-reports-add-form.component.html',
  styleUrls: ['./admin-reports-add-form.component.css']
})
export class AdminReportsAddFormComponent implements OnInit {

  reportForm!: FormGroup;
  imagepath = ''
  errorMessage = ''

  constructor(private rs: ReportService, private formBuilder: FormBuilder, private router: Router) {}


  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      image: '',
      file: '',
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.reportForm.get('file')!.setValue(file);
      console.log(this.reportForm.get('file')!.value);
    } else {
      this.reportForm.get('file')!.setValue(this.imagepath);
    }
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.reportForm.get('image')!.setValue(file);
      console.log(this.reportForm.get('image')!.value);
    } else {
      this.reportForm.get('image')!.setValue(this.imagepath);
    }
  }

  addReport() {
    if(this.reportForm.valid) {
      const formData = new FormData();
      const report = {
        title: this.reportForm.get('title')?.value,
        description: this.reportForm.get('description')?.value,
      }
      
      formData.append('report', JSON.stringify(report))
      const photoFile = this.reportForm.get('image')?.value;
      const file = this.reportForm.get('file')?.value;
      if (photoFile instanceof File || file instanceof File) {
        formData.append('image', photoFile, photoFile.name);
        formData.append('file', file, file.name);
      }

      this.rs.addReport(formData).subscribe(
        () => {
          Swal.fire({
            title: 'Report has been added successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          this.router.navigateByUrl("/admin/reports")
        },
        (error) => {
          Swal.fire({
            title: 'Error adding the Report. Please try again.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          //this.errorMessage = 'Error adding the Event. Please try again.';
        }
      )
    }else {
      this.errorMessage = ' Please fill in all the required fields correctly.';
    }
  }
}
