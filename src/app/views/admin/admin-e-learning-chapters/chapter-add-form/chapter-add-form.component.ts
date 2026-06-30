import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter-add-form',
  templateUrl: './chapter-add-form.component.html',
  styleUrls: ['./chapter-add-form.component.css']
})
export class ChapterAddFormComponent implements OnInit {
  
  chapterForm!: FormGroup;
  courses: Course[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessModal: boolean = false;

  constructor(private cs: CourseService, private formBuilder: FormBuilder, private router: Router ) {

  }


  ngOnInit(): void {

    this.chapterForm = this.formBuilder.group({
      title: ['', Validators.required],
      course: ['', Validators.required]
    })

    this.cs.getCourses().subscribe(
      (data) => {
        this.courses = data
      }
    )
  }


  addChapter() {
    if( this.chapterForm.valid) {
      //const formData = new FormData();

      const chapter = {
        title: this.chapterForm.get('title')?.value
      }
      //formData.append('chapter', JSON.stringify(chapter))
      this.cs.addChapterToCourse(chapter, this.chapterForm.get('course')?.value).subscribe(
        () => {
          Swal.fire({
            title: 'Chapter has been added successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          // Handle successful response
          this.router.navigateByUrl("/admin/chaptersE")
        },
        (error: any) => {

        }
      )
    }
  }

}
