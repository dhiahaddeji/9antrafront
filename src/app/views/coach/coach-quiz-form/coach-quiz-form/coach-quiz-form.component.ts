import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { QuizService } from 'src/app/MesServices/Quiz/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
@Component({
  selector: 'app-coach-quiz-form',
  templateUrl: './coach-quiz-form.component.html',
  styleUrls: ['./coach-quiz-form.component.css']
})
export class CoachQuizFormComponent implements OnInit{
  quizForm:FormGroup
  id:any
  answers:any
  constructor( private route : ActivatedRoute,private router: Router,private formBuilder:FormBuilder,private quizService:QuizService,private formationService:FormationsService){
    this.quizForm=this.formBuilder.group({
      question:this.QuestionForm,
      correctAnswer:this.CorrectAnswerForm,
      wrongAnswer1:this.WrongAnswerForm1,
      wrongAnswer2:this.WrongAnswerForm2,
    })
  }
  QuestionForm=new FormControl('',[Validators.required]);
  CorrectAnswerForm=new FormControl('',[Validators.required]);
  WrongAnswerForm1=new FormControl('',[Validators.required]);
  WrongAnswerForm2=new FormControl('',[Validators.required]);
  getQuestionFormError(){
    if(this.QuestionForm.touched){
      if(this.QuestionForm.hasError("required")){
          return 'You must enter a question';
      }
      }
      return '';
    }
    getCorrectAnswerFormError(){
      if(this.CorrectAnswerForm.touched){
        if(this.CorrectAnswerForm.hasError("required")){
            return 'You must enter a correct answer';
        }
        }
        return '';
      }
      getWrongAnswerForm1Error(){
        if(this.WrongAnswerForm1.touched){
          if(this.WrongAnswerForm1.hasError("required")){
              return 'You must enter a wrong answer';
          }
          }
          return '';
        }
        getWrongAnswerForm2Error(){
          if(this.WrongAnswerForm2.touched){
            if(this.WrongAnswerForm2.hasError("required")){
                return 'You must enter a wrong answer';
            }
            }
            return '';
          }
  addQuestionsAnswers(){
    if(this.quizForm.valid){
      this.quizService.addQuestionsAnswers(this.id,
        {
          "question":this.quizForm.value['question'],
          "correct_answer":this.quizForm.value['correctAnswer'],
          "wrong_answer1":this.quizForm.value['wrongAnswer1'],
          "wrong_answer2":this.quizForm.value['wrongAnswer2'],
        }
      ).subscribe((res:any)=>{
        console.log(res);
      })
      Swal.fire({
        icon: 'success',
        title: 'Options successfully',
        text: 'Your options added successfully!',
      });
      const newUrl = `coach/coach-quiz-form/${this.id}`;
      setTimeout(() => {
        window.location.href = newUrl;
      }, 1200);
    }else{
      this.quizForm.markAllAsTouched();
    }

  }
  getQuestionsByQuizId(id:any){
    this.quizService.getQuestionsByQuizId(id).subscribe((res:any)=>{
      this.answers=res
      console.log(this.answers);
    })
  }

  deleteById(id:any){
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
        this.quizService.deleteAnswerById(id).subscribe((res:any)=>{
        })
        Swal.fire('Deleted!', 'The Option has been deleted.', 'success');
        const newUrl = `coach/coach-quiz-form/${this.id}`;
        setTimeout(() => {
          window.location.href = newUrl;
        }, 2000);
      }
    });

  }
  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.getQuestionsByQuizId(this.id);
  }
}
