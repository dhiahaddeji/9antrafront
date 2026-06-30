import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Course } from 'src/app/Models/E-learning/Course';
import { EChapter } from 'src/app/Models/E-learning/EChapters';
import { Lesson } from 'src/app/Models/E-learning/Lesson';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  course: Course | undefined;
  id!: number;
  navbarHeight!: number;
  userLoggedIn: boolean = false
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    private courseService: CourseService,
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private navbarLoaderService: NavbarLoaderCommunicationService,
    private router: Router,
    private userAuthService: UserAuthService,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
    const videoSource = `assets/Courses_E_Learning/Course_${this.id}/${this.course?.trailer}`;

    videoElement.src = videoSource;
    videoElement.load();
  }

  async ngOnInit(): Promise<void> {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userLoggedIn = this.userAuthService.isLoggedIn1()

    try {
      const fetchedCourse = await this.courseService.getCourse(this.id).toPromise();
      if (fetchedCourse) {
        this.course = fetchedCourse;
        await Promise.all(
          this.course.chapters?.map(async (chapter: EChapter) => {
            if (chapter.id !== undefined) {
              chapter.lesson = await this.getLessons(chapter.id).toPromise();
            }
          }) || []
        );
      }
    } catch (error) {
      console.error('Error occurred while fetching courses:', error);
    }
  }

  getLessons(chapterId: number): Observable<Lesson[]> {
    return this.chapterService.getLessonsByChapter(chapterId);
  }

  getTopStyle() {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height + 30;
    });
    return { 'margin-top.px': this.navbarHeight };
  }

  startCourse() {
    if(this.userLoggedIn) {
      let chapter
    if(this.course && this.course.chapters) {
      chapter = this.course.chapters[0]
      if(chapter.lesson)
        this.router.navigate(['/online/course', this.id, 'lesson', chapter.lesson[0].id])
    }
    } else {
      Swal.fire({
        title: '',
        text: 'You have to login',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#AF3065'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
     
  }

  startLesson(lessonId: number) {
    if(this.userLoggedIn) {
      let chapter
    if(this.course && this.course.chapters) {
      chapter = this.course.chapters[0]
      if(chapter.lesson)
        this.router.navigate(['/online/course', this.id, 'lesson', lessonId])
    }
    } else {
      Swal.fire({
        title: '',
        text: 'You have to login',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#AF3065'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}


