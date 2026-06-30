import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import { CourseService } from 'src/app/MesServices/Course/course.service';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import { LessonService } from 'src/app/MesServices/lesson/lesson.service';
import { Course } from 'src/app/Models/E-learning/Course';
import { EChapter } from 'src/app/Models/E-learning/EChapters';
import { Lesson } from 'src/app/Models/E-learning/Lesson';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {

  lesson!: Lesson
  chapter!: EChapter
  course!: Course
  selectedChapter!: number | undefined
  //video!: string
  id!: number
  idCourse!: number
  l: number = 0
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  thumbnail!: string
  navbarHeight!: number;

  constructor(private lessonService: LessonService,
    private chapterService: ChapterService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private navbarLoaderService: NavbarLoaderCommunicationService) { }


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('idLesson'));
    this.idCourse = Number(this.route.snapshot.paramMap.get('idCourse'));
    this.getLesson(this.id)
    this.courseService.getCourse(this.idCourse).subscribe(
      (data: Course) => {
        this.course = data
        this.course.chapters?.forEach(
          (chapter: EChapter) => {
            if (chapter.id !== undefined) {
              this.getLessons(chapter.id).subscribe((lessons: Lesson[]) => {
                chapter.lesson = lessons;
              });
            }
          }
        )
        console.log(this.lesson);
      }
    )

    outerLoop: for (const chapter of this.course.chapters || []) {
      if (chapter.lesson) {
        for (const lesson of chapter.lesson) {
          if (lesson.id === this.id) {
            this.selectedChapter = chapter.id;
            break outerLoop;
          }
        }
      }
    }
    
    
  }


  getLessons(chapterId: number): Observable<Lesson[]> {
    return this.chapterService.getLessonsByChapter(chapterId)
  }

  // getLesson(lessonId: number) {
  //   this.lessonService.getOne(lessonId).subscribe(
  //     (data: Lesson) => {
  //       this.lesson = data;
  //       //this.video = `assets/Lessons/Lesson_${this.id}/${data.videoLesson || ''}`;
  //     }
  //   );
  // }

  async getLesson(lessonId: number): Promise<void> {
    try {
      const data: any = await this.lessonService.getOne(lessonId).toPromise();
      this.lesson = data;
      this.thumbnail = data.thumbNail || '';
      // this.video = `assets/Lessons/Lesson_${this.id}/${data.videoLesson || ''}`;
    } catch (error) {
      // Handle any error that occurs during the API request
    }
  }


  // ChangeLesson(idLesson: number): void {
  //   this.getLesson(idLesson)
  //   console.log(this.lesson);
    
  //   const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
  //   videoElement.load();

  // }

  async ChangeLesson(idLesson: number): Promise<void> {
    await this.getLesson(idLesson);
    console.log(this.lesson);
  
    const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
    videoElement.load();
  }

  getVideoSource(): string {
    return `assets/Lessons/Lesson_${this.id}/${this.lesson?.videoLesson || ''}`;
  }

  changeLesson1(idLesson: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/online/course/' + this.idCourse + '/lesson/'+ idLesson])
    })
  }




  getTopStyle() {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height  + 10;
    });
    return { 'margin-top.px': this.navbarHeight };
  }

  
  

}
