import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-courses-list',
  templateUrl: './admin-courses-list.component.html',
  styleUrls: ['./admin-courses-list.component.css']
})
export class AdminCoursesListComponent implements OnInit {
  
  courses: Course[] = []
  constructor(private _courseService: CourseService) {}
  
  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this._courseService.getCourses().subscribe(
      data => {
        this.courses = data
        this.courses.forEach(
          course => {
            course.description = course.description?.slice(0, 10) + "..."
          }
        )
      }
    )
  }

  deleteCourse(idCourse: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._courseService.deleteCourse(idCourse).subscribe( 
          () => {
            Swal.fire('Deleted!', 'Course has been deleted.', 'success');
            this.getAll()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting Course', 'error');
            this.getAll()
          }
        )
      }
    });
  }

}
