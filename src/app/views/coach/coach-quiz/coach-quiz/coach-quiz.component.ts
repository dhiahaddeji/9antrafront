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
  showCreateQuizModal: boolean = false;
  
  // Simple variables for create quiz form
  newQuizName: string = '';
  newQuizTraining: any = 0;
  
  QuizNameForm=new FormControl('',[Validators.required]);
  TrainingForm=new FormControl('',[Validators.required]);
  
  constructor(private router: Router,private formBuilder:FormBuilder,private quizService:QuizService,private formationService:FormationsService){
    this.quizForm=this.formBuilder.group({
      quizName: this.QuizNameForm,
      training: this.TrainingForm
    })
  }
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
    console.log('addQuiz called');
    console.log('newQuizName:', this.newQuizName);
    console.log('newQuizTraining:', this.newQuizTraining);
    
    if(!this.newQuizName || !this.newQuizName.trim()){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a quiz name',
      });
      return;
    }
    
    if(!this.newQuizTraining || this.newQuizTraining === 0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a training',
      });
      return;
    }
    
    console.log('Submitting quiz:', { name: this.newQuizName, training: this.newQuizTraining });
    
    this.quizService.addQuiz(this.newQuizName, this.newQuizTraining).subscribe(
      (res:any)=>{
        console.log('Quiz added successfully:', res);
        Swal.fire({
          icon: 'success',
          title: 'Quiz Created',
          text: 'Your quiz added successfully!',
        });
        this.closeCreateModal();
        
        setTimeout(() => {
          this.getAllQuizs();
        }, 800);
      }, 
      (error) => {
        console.error('Error adding quiz:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add quiz. Please try again.',
        });
      }
    );
  }

  resetQuizForm(){
    this.newQuizName = '';
    this.newQuizTraining = 0;
  }

  closeCreateModal(){
    this.showCreateQuizModal = false;
    this.resetQuizForm();
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
          Swal.fire('Deleted!', 'The quiz has been deleted.', 'success');
          setTimeout(() => {
            this.router.navigate(['/coach/coach-quiz']);
            this.getAllQuizs();
          }, 800);
        }, (error) => {
          Swal.fire('Error!', 'Failed to delete quiz.', 'error');
        });
      }
    });
  }

  navigateToForm(id: any) {
    this.router.navigate(['/coach/coach-quiz-form', id]);
  }
}
