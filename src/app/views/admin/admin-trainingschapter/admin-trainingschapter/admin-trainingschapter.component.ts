import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChaptersService } from 'src/app/MesServices/Chapters/chapters.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-trainingschapter',
  templateUrl: './admin-trainingschapter.component.html',
  styleUrls: ['./admin-trainingschapter.component.css']
})
export class AdminTrainingschapterComponent implements OnInit {
  Formation!: number;
  tabFormation: any[] = [];
  Namechapter = '';
  description = '';
  errorMessage = '';

  constructor(private fr: FormationsService, private cs: ChaptersService, private router: Router) {}

  getAllFormation() {
    this.fr.getFormations().subscribe((res: any) => {
      this.tabFormation = res;
    });
  }

  addChapters() {
    if (!this.Namechapter || !this.Formation) {
      this.errorMessage = 'Please fill in the Training and Chapter name.';
      return;
    }
    this.errorMessage = '';

    const chapter = {
      title: this.Namechapter,
      description: this.description,
      Formation: Number(this.Formation)
    };

    this.cs.ajoutChapters(chapter, Number(this.Formation)).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Chapter added!',
          text: 'The chapter has been created successfully.',
          confirmButtonColor: '#AF3065'
        }).then(() => this.router.navigate(['/admin/chapters/list']));
      },
      () => {
        this.errorMessage = 'Error adding the chapter. Please try again.';
      }
    );
  }

  ngOnInit(): void {
    this.getAllFormation();
  }
}
