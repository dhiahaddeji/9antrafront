import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { QuizService } from 'src/app/MesServices/Quiz/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-coach-quiz',
  templateUrl: './coach-quiz.component.html',
  styleUrls: ['./coach-quiz.component.css']
})
export class CoachQuizComponent implements OnInit{
  Quizs:any
  formations:any
  formation:any=""
  formationId:any=0
  countAnswers:any=[]
  quizForm:FormGroup
  constructor(private router: Router,private formBuilder:FormBuilder,private quizService:QuizService,private formationService:FormationsService){
    this.quizForm=this.formBuilder.group({
      quizName:this.QuizNameForm,
      training:this.TrainingForm
    })
  }
  QuizNameForm=new FormControl('',[Validators.required]);
  TrainingForm=new FormControl('',[Validators.required]);
  getQuizNameFormError(){
    if(this.QuizNameForm.touched){
      if(this.QuizNameForm.hasError("required")){
          return 'You enter a name';
      }
      }
      return '';
    }
    getTrainingFormError(){
      if(this.TrainingForm.touched){
        if(this.TrainingForm.hasError("required")){
            return 'You enter a training';
        }
        }
        return '';
      }

  getAllQuizs(){
    this.quizService.getAllQuiz(this.formationId).subscribe((res:any)=>{
      this.Quizs = res
      console.log(this.Quizs);
    },(error)=>{
      console.log(error);
    })
  }

  getAllFormations(){
    this.formationService.getFormations().subscribe((res:any)=>{
      this.formations = res
    },(error)=>{
      console.log(error);
    })
  }
  ngOnInit() {
    this.getAllQuizs();
    this.getAllFormations();
  }

  getCountQuestionsByQuizId(id:any){
    let count:any
    this.quizService.getCountQuestionsByQuizId(id).subscribe((res:any)=>{
       count = res;
    })
    return count;
  }

  addQuiz(){
    if(this.quizForm.valid){
      this.quizService.addQuiz(this.quizForm.value['quizName'],this.quizForm.value['training']).subscribe((res:any)=>{
      })
      Swal.fire({
        icon: 'success',
        title: 'Quiz successfully',
        text: 'Your quiz added successfully!',
      });
      const newUrl = `coach/coach-quiz`;
      setTimeout(() => {
        window.location.href = newUrl;
      }, 1200);
    }else{
      this.quizForm.markAllAsTouched();
    }

  }

  deleteQuiz(id:any){
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
        this.quizService.deleteQuiz(id).subscribe((data: any) => {
        });
        Swal.fire('Deleted!', 'The quiz has been deleted.', 'success');
        const newUrl = `coach/coach-quiz`;
        setTimeout(() => {
          window.location.href = newUrl;
        }, 2000);
      }
    });
  }
}
