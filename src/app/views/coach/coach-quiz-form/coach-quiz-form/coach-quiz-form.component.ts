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
  showAddQuestionModal: boolean = false;
  showAIGenerationModal: boolean = false;
  questionType: string = 'multiple'; // 'multiple' or 'trueFalse'
  isGenerating: boolean = false;
  
  // AI Generation Form Fields
  aiTopic: string = '';
  aiCourseContent: string = '';
  aiNumberOfQuestions: number = 5;
  aiDifficulty: string = 'mixed';
  aiQuestionType: string = 'mixed';
  
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

  updateValidators() {
    if (this.questionType === 'trueFalse') {
      // Remove validators for wrong answers in True/False mode
      this.WrongAnswerForm1.clearValidators();
      this.WrongAnswerForm2.clearValidators();
      this.WrongAnswerForm1.updateValueAndValidity();
      this.WrongAnswerForm2.updateValueAndValidity();
    } else {
      // Add validators for wrong answers in Multiple Choice mode
      this.WrongAnswerForm1.setValidators([Validators.required]);
      this.WrongAnswerForm2.setValidators([Validators.required]);
      this.WrongAnswerForm1.updateValueAndValidity();
      this.WrongAnswerForm2.updateValueAndValidity();
    }
  }

  changeQuestionType(type: string) {
    this.questionType = type;
    this.updateValidators();
  }
  
  addQuestionsAnswers(){
    if(this.quizForm.valid){
      let payload: any;
      
      if(this.questionType === 'multiple'){
        // Multiple choice with 4 options
        payload = {
          "question": this.quizForm.value['question'],
          "correct_answer": this.quizForm.value['correctAnswer'],
          "wrong_answer1": this.quizForm.value['wrongAnswer1'],
          "wrong_answer2": this.quizForm.value['wrongAnswer2'],
          "type": "multiple"
        };
      } else {
        // True/False question
        payload = {
          "question": this.quizForm.value['question'],
          "correct_answer": this.quizForm.value['correctAnswer'],
          "wrong_answer1": this.quizForm.value['correctAnswer'] === 'True' ? 'False' : 'True',
          "wrong_answer2": this.quizForm.value['correctAnswer'] === 'True' ? 'False' : 'True',
          "type": "trueFalse"
        };
      }
      
      this.quizService.addQuestionsAnswers(this.id, payload).subscribe(
        (res:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Question Added',
            text: 'Your question added successfully!',
          });
          this.resetForm();
          this.showAddQuestionModal = false;
          this.getQuestionsByQuizId(this.id);
        }, 
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add question. Please try again.',
          });
        }
      );
    }else{
      this.quizForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.quizForm.reset();
    this.questionType = 'multiple';
    this.updateValidators(); // Reset validators to default
  }

  closeAddQuestionModal(){
    this.resetForm();
    this.showAddQuestionModal = false;
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
          Swal.fire('Deleted!', 'The Option has been deleted.', 'success');
          this.getQuestionsByQuizId(this.id);
          setTimeout(() => {
            this.router.navigate([`/coach/coach-quiz-form/${this.id}`]);
          }, 800);
        }, (error) => {
          Swal.fire('Error!', 'Failed to delete question.', 'error');
        });
      }
    });
  }
  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.getQuestionsByQuizId(this.id);
  }

  openAIGenerationModal() {
    this.showAIGenerationModal = true;
  }

  closeAIGenerationModal() {
    this.resetAIForm();
    this.showAIGenerationModal = false;
  }

  resetAIForm() {
    this.aiTopic = '';
    this.aiCourseContent = '';
    this.aiNumberOfQuestions = 5;
    this.aiDifficulty = 'mixed';
    this.aiQuestionType = 'mixed';
  }

  generateQuestionsByAI() {
    if (!this.aiTopic.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Topic',
        text: 'Please enter a topic for the quiz',
      });
      return;
    }

    if (this.aiNumberOfQuestions < 1 || this.aiNumberOfQuestions > 20) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Number',
        text: 'Number of questions should be between 1 and 20',
      });
      return;
    }

    this.isGenerating = true;

    const request = {
      quizId: this.id,
      topic: this.aiTopic,
      courseContent: this.aiCourseContent,
      numberOfQuestions: this.aiNumberOfQuestions,
      difficulty: this.aiDifficulty,
      questionType: this.aiQuestionType
    };

    this.quizService.generateQuestionsByAI(request).subscribe(
      (res: any) => {
        this.isGenerating = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: `<b>${res.count}</b> questions have been generated and added to your quiz!<br><small>Total questions: ${this.answers ? this.answers.length + res.count : res.count}</small>`,
        });
        this.resetAIForm();
        this.showAIGenerationModal = false;
        this.getQuestionsByQuizId(this.id);
      },
      (error) => {
        this.isGenerating = false;
        let errorMessage = 'Failed to generate questions. Please try again.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    );
  }
}
