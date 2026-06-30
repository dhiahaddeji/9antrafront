import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  id!: any;
  tabCategorie: any = [];
  Categorie = '';
  tabFormation: any = [];
  tabFeedback: any = [];
  parameterValue!: any;
  chapitres: any;
  exercices: any;
  projects: any;
  nomFormation: any;
  descriptionFormation: any;
  workspaces: any;
  posibility: any;

  ListChapters: any = [];
  constructor(
    private fs: FormationsService,
    private route: ActivatedRoute,
    private fedb: FeedbackService,
    private cs: CategorieService
  ) {
    this.parameterValue = this.route.snapshot.paramMap.get('formation');
  }
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, index) => index);
  }
  getFormationBynomFormation() {
    this.fs
      .getFormationByNomFormation(this.parameterValue)
      .subscribe((data) => {
        console.log('adadada', data);
        this.tabFormation = data;
        this.chapitres = this.tabFormation.nbChapters;
        this.exercices = this.tabFormation.nbExercices;
        this.projects = this.tabFormation.nbProjects;
        this.nomFormation = this.tabFormation.nomFormation;
        this.descriptionFormation = this.tabFormation.description;
        this.workspaces = this.tabFormation.workspaces;
        this.posibility = this.tabFormation.posibility;
        //loop for tabFormation and push chapters in ListChapters
        this.ListChapters = this.tabFormation.chapters;
        console.log('ListChapters', this.ListChapters);
      });
  }

  getAllFeedbacks() {
    this.fedb.getAllFeedbacks().subscribe((data) => {
      console.log('Dee', data);
    });
  }

  getFeedbackByFormation() {
    this.fedb.getFeedbackByFormation(this.parameterValue).subscribe((data) => {
      console.log('Wiouu', data);
      this.tabFeedback = data;
    });
  }
  getAllCategorie() {
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res;
      console.log(this.tabCategorie);
    });
  }
  getFormationByCategorie(categoryId: any) {
    this.fs.getFormationByCategorie(categoryId).subscribe((res) => {
      this.tabFormation = res;
      console.log(this.tabFormation);
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.parameterValue = params.get('formation');
      this.getFormationBynomFormation();
      this.getFeedbackByFormation();
      this.getAllFeedbacks();
      this.getAllCategorie();
      this.getFormationByCategorie(this.id);
    });
  }
}
