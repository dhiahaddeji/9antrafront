import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/MesServices/Report/report.service';
import { Report } from 'src/app/Models/E-learning/Report';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reports-update-form',
  templateUrl: './admin-reports-update-form.component.html',
  styleUrls: ['./admin-reports-update-form.component.css']
})
export class AdminReportsUpdateFormComponent implements OnInit {

  reportForm!: FormGroup;
  imagepath = ''
  filePath1 = ''
  filePath = ''
  id?: number
  errorMessage = ''

  constructor(private rs: ReportService,
     private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      image: '',
      file: '',
    })

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne(this.id)
  }

  getOne(id: number) {
    this.rs.getOne(id).subscribe(
      (data: Report) => {
        this.reportForm.get('title')?.setValue(data.title)
        this.reportForm.get('description')?.setValue(data.description)
        this.reportForm.get('image')?.setValue(data.image)
        this.reportForm.get('file')?.setValue(data.file) 
  

        this.imagepath = "assets/Reports/Report_" + id + "/" + data.image
        this.filePath1 = "assets/Reports/Report_" + id + "/" + data.file

        this.filePath = this.getFileTypeFromPath(this.imagepath)
        this.convertPathToFile(this.imagepath, this.filePath)
              .then((file: File) => {
                this.reportForm.get('image')?.setValue(file)
              })
              .catch((error: Error) => {
                console.error('Error converting file:', error);
              });

        this.filePath = this.getFileTypeFromPath(this.filePath1)
        this.convertPathToFile(this.filePath1, this.filePath)
              .then((file: File) => {
                this.reportForm.get('file')?.setValue(file)
              })
              .catch((error: Error) => {
                console.error('Error converting file:', error);
              });

      }
    )
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

  updateReport() {
    if(this.reportForm.valid) {
      const formData = new FormData();
      const report = {
        id: this.id,
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

      this.rs.updateReport(formData).subscribe(
        () => {
          Swal.fire({
            title: 'Report has been updated successfully',
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
            title: 'Error updating the Report. Please try again.',
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

  convertPathToFile(filePath: string, fileType: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', filePath);
      xhr.responseType = 'blob';
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
          const file = new File([blob], fileName, { type: fileType });
          resolve(file);
        } else {
          reject(new Error('Failed to fetch the file.'));
        }
      };
  
      xhr.onerror = function() {
        reject(new Error('An error occurred while fetching the file.'));
      };
  
      xhr.send();
    });
  }

  getFileTypeFromPath(filePath: string): string {
    const extension = filePath.split('.').pop();
  
  // Map file extensions to corresponding MIME types
  const fileTypeMap: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    avif: 'image/avif',
    gif: 'image/gif',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    latex: 'application/x-latex',
    // Add more file extensions and MIME types as needed
  };

  // Get the file type based on the extension
  const fileType = fileTypeMap[extension!.toLowerCase()];
  
  return fileType || '';
  }
}
