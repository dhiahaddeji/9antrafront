import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isAnswered: boolean = false;

  private interval$!: Subscription;
  private autoStopTimer: any;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  getQuestionsByQuizId(id: any) {
    this.quizService.getQuestionsByQuizId(id).subscribe({
      next: (res: any) => {
        this.questionList = res;
        this.loadQuestion();
        this.startCounter(); // Start timer when questions are loaded
      },
      error: (error) => {
        console.error('Error loading questions:', error);
      }
    });
  }

  loadQuestion() {
    const currentIdx = this.getCurrentQuestion();
    console.warn(`Loading question ${currentIdx} of ${this.questionList.length}`);
    
    if (currentIdx < this.questionList.length) {
      const q = this.questionList[currentIdx];
      
      // Check if it's a true/false question
      const isTrueFalse = q.type === 'trueFalse' || q.wrong_answer2 === q.wrong_answer1;
      
      if (isTrueFalse) {
        // True/False: only 2 options
        this.list = [
          { opt: q.correct_answer, correct: true },
          { opt: q.wrong_answer1, correct: false },
        ];
        console.warn('Loaded True/False question');
      } else {
        // Multiple choice: 3 options
        this.list = [
          { opt: q.correct_answer, correct: true },
          { opt: q.wrong_answer1, correct: false },
          { opt: q.wrong_answer2, correct: false },
        ];
        console.warn('Loaded Multiple Choice question');
      }
      
      this.random();
      this.isAnswered = false;
      this.resetCounter();
    } else {
      console.warn('Reached end of questions');
    }
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
    const refs = [this.div, this.div1, this.div2].filter(ref => ref !== undefined);
    refs.forEach((ref, i) => {
      if (ref && colors[i]) {
        ref.nativeElement.style.backgroundColor = colors[i];
        ref.nativeElement.style.color = 'white';
      }
    });
  }

  answer(option: any) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.quizService.getQuizItemsCurrentQuestion();
    const isLast = q + 1 === this.questionList.length;

    if (option.correct) {
      this.quizService.setQuizItemsPoints(this.quizService.getQuizItemsPoints() + 10);
      this.quizService.setQuizItemsCorrectAnswer(this.quizService.getQuizItemsCorrectAnswer() + 1);
    } else {
      this.quizService.setQuizItemsInCorrectAnswer(this.quizService.getQuizItemsInCorrectAnswer() + 1);
      const pts = this.quizService.getQuizItemsPoints();
      if (pts >= 10) this.quizService.setQuizItemsPoints(pts - 10);
    }

    this.toggleCorrect();

    if (isLast) {
      this.quizService.setQuizItemsIsCompleted(true);
      this.saveQuizResult(); // Save result when quiz is completed
      this.stopCounter();
      setTimeout(() => {
        this.updateProgress();
      }, 1500);
    } else {
      setTimeout(() => {
        this.quizService.setQuizItemsCurrentQuestion(q + 1);
        this.updateProgress();
        this.loadQuestion();
      }, 1500);
    }
  }

  startCounter() {
    this.stopCounter();
    console.warn('Starting timer - counter set to', this.counter);
    this.interval$ = interval(1000).subscribe(() => {
      if (this.counter > 0) {
        this.counter--;
        console.warn('Timer tick:', this.counter);
        this.cdr.markForCheck(); // Force change detection
        
        if (this.counter === 0) {
          console.warn('Timer reached 0, moving to next question');
          const q = this.getCurrentQuestion();
          this.isAnswered = true;
          
          // Deduct points for timeout
          this.quizService.setQuizItemsInCorrectAnswer(this.quizService.getQuizItemsInCorrectAnswer() + 1);
          const pts = this.quizService.getQuizItemsPoints();
          if (pts >= 10) this.quizService.setQuizItemsPoints(pts - 10);

          if (q + 1 === this.questionList.length) {
            this.quizService.setQuizItemsIsCompleted(true);
            this.saveQuizResult(); // Save result when quiz is completed
            this.stopCounter();
            this.updateProgress();
          } else {
            this.quizService.setQuizItemsCurrentQuestion(q + 1);
            this.updateProgress();
            this.loadQuestion();
          }
        }
      }
    });
    this.autoStopTimer = setTimeout(() => this.stopCounter(), 100000);
  }

  stopCounter() {
    console.warn('Stopping timer');
    if (this.interval$ && !this.interval$.closed) this.interval$.unsubscribe();
    if (this.autoStopTimer) { 
      clearTimeout(this.autoStopTimer); 
      this.autoStopTimer = null; 
    }
    this.counter = 0;
  }

  resetCounter() {
    console.warn('Resetting counter');
    this.stopCounter();
    this.counter = 10;
    this.cdr.markForCheck(); // Force update before starting
    this.startCounter();
  }

  resetQuiz() {
    this.quizService.setQuizItemsPoints(0);
    this.quizService.setQuizItemsCorrectAnswer(0);
    this.quizService.setQuizItemsInCorrectAnswer(0);
    this.quizService.setQuizItemsCurrentQuestion(0);
    this.quizService.setQuizItemsProgress('');
    this.quizService.setQuizItemsIsCompleted(false);
    this.loadQuestion();
  }

  updateProgress() {
    const pct = ((this.getCurrentQuestion() / this.questionList.length) * 100).toString();
    this.quizService.setQuizItemsProgress(pct);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizId = id ? parseInt(id) : 0; // Convert to number, default to 0
    this.counter = 10; // Initialize counter to 10
    
    // CRITICAL: Clear previous quiz session data BEFORE loading new quiz
    this.quizService.removeQuizItemsStorage();
    this.quizService.setQuizItemsPoints(0);
    this.quizService.setQuizItemsCorrectAnswer(0);
    this.quizService.setQuizItemsInCorrectAnswer(0);
    this.quizService.setQuizItemsCurrentQuestion(0);
    this.quizService.setQuizItemsProgress('0');
    this.quizService.setQuizItemsIsCompleted(false);
    
    this.cdr.markForCheck(); // Force detection
    this.getQuestionsByQuizId(this.quizId);
  }

  ngOnDestroy() {
    this.stopCounter();
  }

  clearQuizStorage() { 
    this.stopCounter(); // Stop the timer before navigating
    this.quizService.removeQuizItemsStorage();
    this.router.navigate(['/student']);
  }

  saveQuizResult() {
    // Save quiz result to localStorage with user-specific key
    const userId = this.quizService.getCurrentUserId();
    console.warn(`Saving quiz result for user ${userId}, quiz ${this.quizId}`);
    
    const storageKey = `quizResults_${userId}`; // User-specific key
    
    const results: any[] = [];
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        results.push(...JSON.parse(stored));
      } catch (e) {
        console.warn('Failed to parse stored quiz results');
      }
    }

    // Find or update the current quiz result
    const existingIndex = results.findIndex((r: any) => r.quizId === this.quizId);
    const result = {
      quizId: this.quizId,
      score: this.getPoints(),
      correct: this.getCorrect(),
      incorrect: this.getIncorrect(),
      timestamp: new Date().getTime()
    };

    if (existingIndex >= 0) {
      results[existingIndex] = result;
      console.warn(`Updated existing quiz result at index ${existingIndex}`);
    } else {
      results.push(result);
      console.warn(`Added new quiz result`);
    }

    localStorage.setItem(storageKey, JSON.stringify(results));
    console.warn(`Quiz results saved to ${storageKey}:`, results);
    
    // Notify that quiz results have been updated
    this.quizService.notifyQuizResultsUpdated();
  }

  getCurrentQuestion() { return this.quizService.getQuizItemsCurrentQuestion(); }
  getPoints()          { return this.quizService.getQuizItemsPoints(); }
  getCorrect()         { return this.quizService.getQuizItemsCorrectAnswer(); }
  getIncorrect()       { return this.quizService.getQuizItemsInCorrectAnswer(); }
  getProgress()        { return this.quizService.getQuizItemsInProgress(); }
  getIsCompleted()     { return this.quizService.getQuizItemsIsCompleted(); }

  nextQuestion() {
    if (this.getCurrentQuestion() + 1 < this.questionList.length && !this.isAnswered) {
      this.quizService.setQuizItemsCurrentQuestion(this.getCurrentQuestion() + 1);
      this.updateProgress();
      this.loadQuestion();
    }
  }

  previousQuestion() {
    if (this.getCurrentQuestion() > 0) {
      this.quizService.setQuizItemsCurrentQuestion(this.getCurrentQuestion() - 1);
      this.updateProgress();
      this.loadQuestion();
    }
  }
}
