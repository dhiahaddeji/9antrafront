import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-course-update-form',
  templateUrl: './admin-course-update-form.component.html',
  styleUrls: ['./admin-course-update-form.component.css']
})
export class AdminCourseUpdateFormComponent implements OnInit {

  courseForm!: FormGroup;
  imagepath = '';
  trailerPath = ''
  filePath = ''
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessModal: boolean = false;
  id?:number 
  goals: any[] = []
  gls: String = ''

  constructor(private formBuilder: FormBuilder,
     private router: Router, 
     private route: ActivatedRoute, 
     private courseService: CourseService) {}


  ngOnInit(): void {

    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      language: ['', Validators.required],
      image: '',
      trailer: '',
      goal: ['', Validators.required],

    })

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne(this.id)
  }

  getOne(id: number) {
    this.courseService.getCourse(id).subscribe(
      (data: Course) => {
        this.courseForm.get('title')?.setValue(data.title)
        this.courseForm.get('description')?.setValue(data.description)
        this.courseForm.get('duration')?.setValue(data.duration)
        this.courseForm.get('language')?.setValue(data.language)
        this.courseForm.get('image')?.setValue(data.image)
        this.courseForm.get('trailer')?.setValue(data.trailer) 
  
        data.goal?.forEach((goal) => {
          if (goal.description) {
            this.gls += goal.description + ",";
          }
        });

        this.imagepath = "assets/Courses_E_Learning/Course_" + id + "/" + data.image
        this.trailerPath = "assets/Courses_E_Learning/Course_" + id + "/" + data.trailer

        this.filePath = this.getFileTypeFromPath(this.imagepath)
        this.convertPathToFile(this.imagepath, this.filePath)
              .then((file: File) => {
                this.courseForm.get('image')?.setValue(file)
              })
              .catch((error: Error) => {
                console.error('Error converting file:', error);
              });

        this.filePath = this.getFileTypeFromPath(this.trailerPath)
        this.convertPathToFile(this.trailerPath, this.filePath)
              .then((file: File) => {
                this.courseForm.get('trailer')?.setValue(file)
              })
              .catch((error: Error) => {
                console.error('Error converting file:', error);
              });

        this.gls = this.gls.slice(0, -1)
        this.courseForm.get('goal')?.setValue(this.gls)
      }
    )
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseForm.get('image')!.setValue(file);
      console.log(this.courseForm.get('image')!.value);
    } else {
      this.courseForm.get('image')!.setValue(this.imagepath);
    }
  }

  onVideoSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseForm.get('trailer')!.setValue(file);
      console.log(this.courseForm.get('trailer')!.value);
    } else {
      this.courseForm.get('trailer')!.setValue(this.imagepath);
    }
  }

  updateCourse() {
    if (this.courseForm.valid) {

      const formData = new FormData();
      var goals = this.courseForm.get('goal')?.value.split(',');
      goals.forEach((g: any) => { this.goals.push({ description: g }) })
      const course = {
        id: this.id,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        duration: this.courseForm.get('duration')?.value,
        language: this.courseForm.get('language')?.value,
        goal: this.goals
      }
      formData.append('course', JSON.stringify(course));
      const photoFile = this.courseForm.get('image')?.value;
      const video = this.courseForm.get('trailer')?.value;

      console.log(video);
      
      if (photoFile instanceof File || video instanceof File) {
        formData.append('image', photoFile, photoFile.name);
        formData.append('trailer', video, video.name);
      }

      formData.forEach((key, value) => {
        console.log(key, value);
      });


      this.courseService.updateCourse(formData)
        .subscribe(
          (data) => {
            Swal.fire({
              title: 'Courses has been updated successfully',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            // Handle successful response
            this.router.navigateByUrl("/admin/courses")
          },
          (error) => {
            // Handle error response
          })
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
    webm: 'video/webm',
    gif: 'image/gif',
    mp4: 'video/mp4',
    // Add more file extensions and MIME types as needed
  };

  // Get the file type based on the extension
  const fileType = fileTypeMap[extension!.toLowerCase()];
  
  return fileType || '';
  }
}
