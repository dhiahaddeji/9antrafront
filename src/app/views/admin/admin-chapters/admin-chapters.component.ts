import { Component, OnInit } from '@angular/core';
import { ChaptersService } from 'src/app/MesServices/Chapters/chapters.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-chapters',
  templateUrl: './admin-chapters.component.html',
  styleUrls: ['./admin-chapters.component.css'],
})
export class AdminChaptersComponent implements OnInit {
  tabFormation: any[] = [];
  chaptersByFormation: any = {};
  openMenuId: any = null;

  constructor(private cs: ChaptersService, private fs: FormationsService) {}

  ngOnInit(): void {
    this.getAllFormation();
  }

  toggleMenu(id: any) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu() { this.openMenuId = null; }

  getChaptersByNomFormation(nomFormation: string) {
    this.cs.getChaptersByNomFormation(nomFormation).subscribe((res) => {
      this.chaptersByFormation[nomFormation] = res;
    });
  }

  getAllFormation() {
    this.fs.getFormations().subscribe((res: any) => {
      this.tabFormation = res;
      this.tabFormation.forEach((formation: any) => {
        this.getChaptersByNomFormation(formation.nomFormation);
      });
    });
  }

  deleteChapters(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AF3065',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.deleteChapters(id).subscribe(() => {
          Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Chapter has been deleted.', confirmButtonColor: '#AF3065' });
          this.getAllFormation();
        });
      }
    });
  }

  getAllChapters(): any[] {
    let chapters: any[] = [];
    for (const key in this.chaptersByFormation) {
      if (this.chaptersByFormation.hasOwnProperty(key)) {
        chapters = chapters.concat(this.chaptersByFormation[key]);
      }
    }
    return chapters;
  }
}
