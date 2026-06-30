import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = []

  constructor(private _courseService: CourseService) {

  }


  ngOnInit(): void {
    this._courseService.getCourses().subscribe(
      data => {
        this.courses = data
        this.courses.forEach(
          course => {
            course.description = course.description?.slice(0, 60) + "..."
          }
        )
      },
    )
  }

  getImage(course: Course) {
    return "assets/Courses_E_Learning/Course_" + course.id + "/" + course.image 
  }

}
