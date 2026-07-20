import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-training-update',
  templateUrl: './admin-training-update.component.html',
  styleUrls: ['./admin-training-update.component.css']
})
export class AdminTrainingUpdateComponent implements OnInit{
  trainingForm: FormGroup;
  formation:any={nomFormation:'',description:'',nbChapters:'',nbExercices:'',nbMeetings:'',nbProjects:'',workspaces:'',posibility:''};
  id:any;
  categorie_id:any=null
  possibilities=['Possibility of online education','No Possibility of online education']
  tabCategorie: any = [];
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute, private router: Router,private formationService:FormationsService,private cs: CategorieService) {
    this.trainingForm = this.formBuilder.group({
      //categorie:this.CategoryForm,
      nomFormation:this.NomForm,
      description: this.DescriptionForm,
      nbExercices:this.ExerciseForm ,
      nbProjects:this.ProjectsForm,
      nbMeetings:this.MeetingsForm ,
      nbChapters:this.ChaptersForm ,
      workspaces:this.WorkspacesForm ,
      posibility:this.PossibilityForm ,
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

  getFormationById(){
    this.formationService.getFormationById(this.id).subscribe((res:any) =>{
      this.formation = res;
      this.trainingForm.setValue({
        nomFormation: this.formation.nomFormation,
        description: this.formation.description,
        nbExercices: this.formation.nbExercices,
        nbProjects: this.formation.nbProjects,
        nbMeetings: this.formation.nbMeetings,
        nbChapters: this.formation.nbChapters,
        workspaces:this.formation.workspaces,
        posibility: this.formation.posibility
      });
    },(error)=>{
      console.log(error);
    }
    )
  }

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
    this.id=this.route.snapshot.paramMap.get('id');
    this.getFormationById();
    this.getAllCategorie();


  }


  getAllCategorie() {
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res as any[];
      console.log(this.tabCategorie);
    });
  }

  updateTraining(){
    if(this.trainingForm.valid){
      let trainingData = this.trainingForm.value;
      console.log(trainingData);
      this.formationService.updateFormation(this.id,trainingData).subscribe((res:any)=>{
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Update',
          text: 'Training updated successfully',
        });
        this.router.navigate(['/admin/trainings'])
      },(error)=>{
        console.log(error);

      })
  }else{
    this.trainingForm.markAllAsTouched();
  }
  }
}
