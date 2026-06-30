import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { Course } from 'src/app/Models/E-learning/Course';

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrls: ['./admin-course-details.component.css']
})
export class AdminCourseDetailsComponent implements OnInit, AfterViewInit {

  course!: Course;
  id!: number
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef | undefined;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}
  
  ngAfterViewInit(): void {
    const videoElement: HTMLVideoElement = this.videoPlayer!.nativeElement
    const videoSource = `assets/Courses_E_Learning/Course_${this.id}/${this.course.trailer}`

    videoElement.src = videoSource
    videoElement.load()
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    this.courseService.getCourse(this.id).subscribe(
      (data: Course) => {
        this.course = data
      }
    )
  }

  getImage() {
    return "assets/Courses_E_Learning/Course_"+ this.id + "/"+ this.course.image
  }

}
