import { Component, OnInit } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { QuizService } from 'src/app/MesServices/Quiz/quiz.service';

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit {
  quiz:any
  formations:any
  formationId:any=0
constructor(private quizService:QuizService,private formationService:FormationsService){
}

getAllQuiz(){
  this.quizService.getAllQuiz(this.formationId).subscribe((res:any)=>{
    this.quiz=res
    console.log(this.quiz);
  })
}
getAllFormations(){
  this.formationService.getFormations().subscribe((res:any)=>{
    this.formations = res
  },(error)=>{
    console.log(error);
  })
}
ngOnInit(){
  this.getAllQuiz()
  this.getAllFormations();
}

setQuizItemsStorage(){
  this.quizService.setQuizItemsStorage(0,0,0,0,"",false);
}
}
