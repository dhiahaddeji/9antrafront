import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LessonService } from 'src/app/MesServices/lesson/lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-lessons-list',
  templateUrl: './admin-lessons-list.component.html',
  styleUrls: ['./admin-lessons-list.component.css']
})
export class AdminLessonsListComponent implements OnInit{
  
  lessons: any[] = []


  constructor(private ls: LessonService) {}

  
  ngOnInit(): void {
    this.get()
  }

  get() {
    this.ls.getLessons().subscribe(
      (data: any) => {
        this.lessons = data
      }
    )
  }

  delete(id: number) {

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
        this.ls.deleteLesson(id).subscribe( 
          () => {
            Swal.fire('Deleted!', 'Lesson has been deleted.', 'success');
            this.get()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting this lesson', 'error');
            this.get()
          }
        )
      }
    });
  }

  getVideo(lesson: any) {
    return "assets/Lessons/Lesson_" + lesson.id + "/" + lesson.videoLesson
  }

  getThumbNail(lesson: any) {
    return "assets/Lessons/Lesson_" + lesson.id + "/" + lesson.thumbNail
  }

}
