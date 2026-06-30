import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChaptersService } from 'src/app/MesServices/Chapters/chapters.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

interface Formation {
  id: number;
  name: string;
  // Add more properties as per your response structure
}

@Component({
  selector: 'app-admin-trainingschapter',
  templateUrl: './admin-trainingschapter.component.html',
  styleUrls: ['./admin-trainingschapter.component.css']
})
export class AdminTrainingschapterComponent implements OnInit {
  Formation!: number;
  tabFormation : any= [] ;
  Namechapter!: any;
  description!: any;
  successMessage: string = '';
  errorMessage: string = '';

  showSuccessModal: boolean = false;


  constructor(private fr: FormationsService, private cs: ChaptersService, private   router : Router) {}

  getAllFormation() {
    this.fr.getFormations().subscribe((res) => {
      this.tabFormation = res as Formation[]; // Type assertion to indicate that res is an array of Formation
      console.log(this.tabFormation);
    });
  }

  addChapters() {
    if (!this.Namechapter || !this.description || !this.Formation) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    let chapters: any = {
      title: this.Namechapter,
      description: this.description,
      Formation: Number(this.Formation)
    };

    console.log(chapters);
    this.cs.ajoutChapters(chapters, Number(this.Formation)).subscribe(
      (data: any) => {
        this.successMessage = 'Chapter added successfully.'  ;
        this.errorMessage = '';
        this.showSuccessModal = true;
        console.log(data);
      },
      (error: any) => {
        this.successMessage = '';
        this.errorMessage = 'Error adding the chapter. Please try again.';
        console.log(error);
      }
    );
  }
  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/admin/chapters/list']);
  }

  ngOnInit(): void {
    this.getAllFormation();
  }
}
