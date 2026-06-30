import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-lessons-add-form',
  templateUrl: './admin-lessons-add-form.component.html',
  styleUrls: ['./admin-lessons-add-form.component.css']
})
export class AdminLessonsAddFormComponent implements OnInit {



  lessonForm!: FormGroup;
  chapters: any[] = []
  courses: Course[] = []
  imagepath = ''
  selectedCourse: number | null = null;
  successMessage: string = ''
  errorMessage: string = ''
  showSuccessModal: boolean = false
  courseId:any=null;

  constructor(private chapterService: ChapterService, private courseService: CourseService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      chapter: ['', Validators.required],
      video: '',
      thumbNail: ''
    })

    this.courseService.getCourses().subscribe(
      data => this.courses = data
    )

  }

  addLesson() {

    if (this.lessonForm.valid) {

      const formData = new FormData();
      const lesson = {
        title: this.lessonForm.get('title')?.value,

      }
      formData.append('lesson', JSON.stringify(lesson));
      const photoFile = this.lessonForm.get('thumbNail')?.value;
      const video = this.lessonForm.get('video')?.value;
      if (photoFile instanceof File || video instanceof File) {
        formData.append('thumbNail', photoFile, photoFile.name);
        formData.append('video', video, video.name);
      }

      formData.forEach((key, value) => {
        console.log(key, value);
      });


      this.chapterService.addLessonToChapter(formData, this.lessonForm.get('chapter')?.value)
        .subscribe(
          (data) => {
            console.log(data);

            Swal.fire({
              title: 'Lesson has been added successfully',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            // Handle successful response
            this.router.navigateByUrl("/admin/lessons")
          },
          (error) => {
            console.log(error);
            // Handle error response
          })
    }
  }


  onVideoSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.lessonForm.get('video')!.setValue(file);
      console.log(this.lessonForm.get('video')!.value);
    } else {
      this.lessonForm.get('video')!.setValue(this.imagepath);
    }
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.lessonForm.get('thumbNail')!.setValue(file);
      console.log(this.lessonForm.get('thumbNail')!.value);
    } else {
      this.lessonForm.get('thumbNail')!.setValue(this.imagepath);
    }
  }

  onCourseSelected(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = selectElement.value;
    this.selectedCourse = Number(courseId);

    this.chapterService.getChaptersByCourse(this.selectedCourse).subscribe(
      data => {
        this.chapters = data
        console.log(this.chapters);

      }
    )
  }

}
