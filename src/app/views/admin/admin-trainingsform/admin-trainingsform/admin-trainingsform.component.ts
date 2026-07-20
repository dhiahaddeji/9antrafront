import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { TrainingService } from 'src/app/MesServices/Training/training.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-trainingsform',
  templateUrl: './admin-trainingsform.component.html',
  styleUrls: ['./admin-trainingsform.component.css'],
})
export class AdminTrainingsformComponent implements OnInit {
  trainingForm: FormGroup;
  tabCategorie: any = [];
  selectedCategorie!: any;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessModal: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private cs: CategorieService,
    private trainingService: TrainingService,
    private router: Router
  ) {
    this.trainingForm = this.formBuilder.group({
      categorie:this.CategoryForm,
      nomFormation:this.NomForm,
      description: this.DescriptionForm,
      nbExercises:this.ExerciseForm ,
      nbProjects:this.ProjectsForm,
      nbMeetings:this.MeetingsForm ,
      nbChapters:this.ChaptersForm ,
      workspaces:this.WorkspacesForm ,
      possibility:this.PossibilityForm ,
    });
  }
  CategoryForm=new FormControl('',[Validators.required]);
  NomForm=new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]);
  DescriptionForm=new FormControl('',[Validators.minLength(10),Validators.maxLength(50)]);
  ExerciseForm=new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
  ProjectsForm=new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
  MeetingsForm=new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
  ChaptersForm=new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
  WorkspacesForm=new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);
  PossibilityForm=new FormControl('',[Validators.required]);


  getCategoryFormError(){
    if(this.CategoryForm.touched){
      if(this.CategoryForm.hasError("required")){
        return 'You must enter a category';
      }
      return '';
    }
    return '';
  }

  getNomFormError(){
    if(this.NomForm.touched){
      if(this.NomForm.hasError("required")){
        return 'You must enter a name';
      } else if(this.NomForm.hasError("minlength")){
        return 'Name is too short';
      }else if(this.NomForm.hasError("maxlength")){
        return 'Name is too long';
      }
    }
    return '';
  }

  getDescriptionFormError(){
    if(this.DescriptionForm.touched){
      if(this.DescriptionForm.hasError("required")){
        return 'You must enter a description';
      } else if(this.DescriptionForm.hasError("minlength")){
        return 'Description too short';
      }else if(this.DescriptionForm.hasError("maxlength")){
        return 'Description too long';
      }
    }
    return '';
  }

  getProjectsFormError(){
    if(this.ProjectsForm.touched){
      if(this.ProjectsForm.hasError("required")){
         return 'You must enter a project number';
      }else if(this.ProjectsForm.hasError("pattern")){
         return 'Only numbers please';
      }
    }
    return '';
  }

  getMeetingsFormError(){
    if(this.MeetingsForm.touched){
      if(this.MeetingsForm.hasError("required")){
         return 'You must enter meeting number';
      }else if(this.MeetingsForm.hasError("pattern")){
         return 'Only numbers please';
      }
    }
    return '';
  }

  getChaptersFormError(){
    if(this.ChaptersForm.touched){
      if(this.ChaptersForm.hasError("required")){
         return 'You must enter a chapters number';
      }else if(this.ChaptersForm.hasError("pattern")){
         return 'Only numbers please';
      }
    }
    return '';
  }

  getWorkspacesFormError(){
    if(this.WorkspacesForm.touched){
      if(this.WorkspacesForm.hasError("required")){
         return 'You must enter a workspace number';
      }else if(this.WorkspacesForm.hasError("pattern")){
         return 'Only numbers please';
      }
    }
    return '';
  }

  getExerciseFormError(){
    if(this.ExerciseForm.touched){
      if(this.ExerciseForm.hasError("required")){
         return 'You must enter an exercice number';
      }else if(this.ExerciseForm.hasError("pattern")){
         return 'Only numbers please';
      }
    }
    return '';
  }

  getPossibilityFormError(){
    if(this.PossibilityForm.touched){
      if(this.PossibilityForm.hasError("required")){
        return 'You must enter a possibility';
      }
      return '';
    }
    return '';
  }





  ngOnInit(): void {
    this.getAllCategorie();
  }

  getAllCategorie() {
    console.log('getAllCategorie');
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res as any[];
      console.log(this.tabCategorie);
    });
  }

  addTraining() {
    if (this.trainingForm.valid) {
      let trainingData = this.trainingForm.value;
      console.log(trainingData);
      trainingData.categorie = Number(trainingData.categorie);
      this.trainingService.ajoutTraining(
        trainingData
      ).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Add',
            text: 'Training added successfully',
          });
          this.router.navigate(['/admin/trainings'])
          console.log(data);
        },
        (error: any) => {
          this.successMessage = '';
          this.errorMessage =
            'Error adding the training program. Please try again.';
          console.log(error);
        }
      );
    } else{
      this.trainingForm.markAllAsTouched();
    }
  }
  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/admin/trainings']);
  }

  isValidNumber(number: any) {
    // Regular expression to match numbers
    const numberRegex = /^\+?\d+$/;
    return numberRegex.test(number);
  }
}
