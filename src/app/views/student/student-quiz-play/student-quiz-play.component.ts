import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/MesServices/Quiz/quiz.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-student-quiz-play',
  templateUrl: './student-quiz-play.component.html',
  styleUrls: ['./student-quiz-play.component.css']
})
export class StudentQuizPlayComponent implements OnInit, OnDestroy {
  @ViewChild('opt')  div!: ElementRef;
  @ViewChild('opt1') div1!: ElementRef;
  @ViewChild('opt2') div2!: ElementRef;

  quizId: any;
  questionList: any[] = [];
  counter = 10;
  options: any[] = [];
  list: any[] = [];

  private interval$!: Subscription;
  private autoStopTimer: any;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  getQuestionsByQuizId(id: any) {
    this.quizService.getQuestionsByQuizId(id).subscribe({
      next: (res: any) => {
        this.questionList = res;
        this.list = [
          { opt: this.questionList[this.quizService.getQuizItemsCurrentQuestion()].correct_answer, correct: true },
          { opt: this.questionList[this.quizService.getQuizItemsCurrentQuestion()].wrong_answer1, correct: false },
          { opt: this.questionList[this.quizService.getQuizItemsCurrentQuestion()].wrong_answer2, correct: false },
        ];
        this.random();
      }
    });
  }

  random(): void {
    this.options = [];
    const tmp = [...this.list];
    this.shuffle(tmp);
    this.options = tmp;
  }

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  toggleCorrect() {
    const colors = this.options.map(o => o.correct ? 'green' : 'red');
    [this.div, this.div1, this.div2].forEach((ref, i) => {
      if (ref) {
        ref.nativeElement.style.backgroundColor = colors[i];
        ref.nativeElement.style.color = 'white';
      }
    });
  }

  answer(option: any) {
    const q = this.quizService.getQuizItemsCurrentQuestion();
    const isLast = q + 1 === this.questionList.length;

    if (isLast) {
      this.quizService.setQuizItemsIsCompleted(true);
      this.stopCounter();
    }

    if (option.correct) {
      this.quizService.setQuizItemsPoints(this.quizService.getQuizItemsPoints() + 10);
      this.quizService.setQuizItemsCorrectAnswer(this.quizService.getQuizItemsCorrectAnswer() + 1);
    } else {
      this.quizService.setQuizItemsInCorrectAnswer(this.quizService.getQuizItemsInCorrectAnswer() + 1);
      const pts = this.quizService.getQuizItemsPoints();
      if (pts >= 10) this.quizService.setQuizItemsPoints(pts - 10);
    }

    if (!isLast) {
      this.quizService.setQuizItemsCurrentQuestion(q + 1);
      this.getProgressPercent();
      this.resetCounter();
      setTimeout(() => {
        window.location.href = `/student/student-quiz-play/${this.quizId}`;
      }, 1000);
    }
  }

  startCounter() {
    this.stopCounter();
    this.interval$ = interval(1000).subscribe(() => {
      if (this.counter > 0) {
        this.counter--;
        const q = this.getCurrentQuestion();
        if (this.counter === 0 && q + 1 === this.questionList.length) {
          this.quizService.setQuizItemsIsCompleted(true);
          this.stopCounter();
        } else if (this.counter === 0 && q + 1 < this.questionList.length) {
          this.quizService.setQuizItemsCurrentQuestion(q + 1);
          if (this.getPoints() > 10) this.quizService.setQuizItemsPoints(this.getPoints() - 10);
          window.location.href = `/student/student-quiz-play/${this.quizId}`;
        }
      }
    });
    this.autoStopTimer = setTimeout(() => this.stopCounter(), 100000);
  }

  stopCounter() {
    if (this.interval$ && !this.interval$.closed) this.interval$.unsubscribe();
    if (this.autoStopTimer) { clearTimeout(this.autoStopTimer); this.autoStopTimer = null; }
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 10;
    this.startCounter();
  }

  resetQuiz() {
    this.quizService.setQuizItemsPoints(0);
    this.quizService.setQuizItemsCorrectAnswer(0);
    this.quizService.setQuizItemsInCorrectAnswer(0);
    this.quizService.setQuizItemsCurrentQuestion(0);
    this.quizService.setQuizItemsProgress('');
    window.location.href = `/student/student-quiz-play/${this.quizId}`;
  }

  getProgressPercent() {
    const pct = ((this.getCurrentQuestion() / this.questionList.length) * 100).toString();
    this.quizService.setQuizItemsProgress(pct);
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.getQuestionsByQuizId(this.quizId);
    this.startCounter();
  }

  ngOnDestroy() {
    this.stopCounter();
  }

  clearQuizStorage() { this.quizService.removeQuizItemsStorage(); }
  getCurrentQuestion() { return this.quizService.getQuizItemsCurrentQuestion(); }
  getPoints()          { return this.quizService.getQuizItemsPoints(); }
  getCorrect()         { return this.quizService.getQuizItemsCorrectAnswer(); }
  getIncorrect()       { return this.quizService.getQuizItemsInCorrectAnswer(); }
  getProgress()        { return this.quizService.getQuizItemsInProgress(); }
  getIsCompleted()     { return this.quizService.getQuizItemsIsCompleted(); }

  nextQuestion() {
    if (this.getCurrentQuestion() + 1 < this.questionList.length) {
      this.quizService.setQuizItemsCurrentQuestion(this.getCurrentQuestion() + 1);
      window.location.href = `/student/student-quiz-play/${this.quizId}`;
    }
  }

  previousQuestion() {
    this.quizService.setQuizItemsCurrentQuestion(this.getCurrentQuestion() - 1);
    window.location.href = `/student/student-quiz-play/${this.quizId}`;
  }
}
