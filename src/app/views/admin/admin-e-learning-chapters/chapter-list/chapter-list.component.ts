import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/MesServices/ChapterElearning/chapter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  
  chapters: any[] = [];
  
  constructor(public chapterService: ChapterService) {

  }



  ngOnInit(): void {
    this.get()
  }

  get() {
    this.chapterService.getChapters().subscribe(
      data => {
        this.chapters = data
        console.log(this.chapters);
        
      }
    )
  }

  delete(id:number) {
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
        this.chapterService.deleteChapter(id).subscribe( 
          () => {
            Swal.fire('Deleted!', 'Chapter has been deleted.', 'success');
            this.get()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting Chapter', 'error');
            this.get()
          }
        )
      }
    });
  }

}
