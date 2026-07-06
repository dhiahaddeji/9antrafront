import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { QuizService } from 'src/app/MesServices/Quiz/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css']
})
export class StudentQuizComponent implements OnInit, AfterViewInit, OnDestroy {
  quiz: any;
  quizPassed: any[] = [];
  quizNotPassed: any[] = [];
  formations: any;
  formationId: any = 0;
  showPassed: boolean = false; // Toggle between passed and not passed
  quizResults: Map<number, any> = new Map(); // Store quiz results by quiz ID
  private quizResultsSubscription!: Subscription; // Subscribe to quiz results updates

  constructor(private quizService: QuizService, private formationService: FormationsService, private router: Router) {
    // Don't load results in constructor - will be loaded in getAllQuiz
  }

  loadQuizResults() {
    // Load quiz results from localStorage with user-specific key
    const userId = this.quizService.getCurrentUserId();
    const storageKey = `quizResults_${userId}`; // User-specific key
    
    console.warn(`Loading quiz results for user ${userId} from key: ${storageKey}`);
    
    const stored = localStorage.getItem(storageKey);
    console.warn(`Stored data: ${stored}`);
    
    if (stored) {
      try {
        const results = JSON.parse(stored);
        // Convert array to Map
        this.quizResults = new Map();
        results.forEach((r: any) => {
          this.quizResults.set(r.quizId, r);
          console.warn(`Loaded quiz ${r.quizId}:`, r);
        });
      } catch (e) {
        console.warn('Failed to parse quiz results');
        this.quizResults = new Map();
      }
    } else {
      console.warn('No stored quiz results found');
      this.quizResults = new Map();
    }
  }

  isQuizPassed(quizId: number): boolean {
    const result = this.quizResults.get(quizId);
    // Quiz is considered passed if it has been completed (exists in localStorage)
    // regardless of the score
    return result !== undefined;
  }

  getAllQuiz() {
    console.warn(`Getting all quizzes for formation ${this.formationId}`);
    this.quizService.getAllQuiz(this.formationId).subscribe((res: any) => {
      this.quiz = res;
      console.warn(`Fetched ${res?.length || 0} quizzes`);
      this.loadQuizResults(); // IMPORTANT: Load results AFTER fetching quizzes
      this.separateQuizzes();
    }, (error) => {
      console.warn('Error fetching quizzes:', error);
    });
  }

  separateQuizzes() {
    this.quizPassed = [];
    this.quizNotPassed = [];
    
    console.warn(`Separating ${this.quiz?.length || 0} quizzes, quizResults Map size: ${this.quizResults.size}`);
    console.warn('Quiz Results Map:', Array.from(this.quizResults.entries()));
    
    if (this.quiz && this.quiz.length > 0) {
      this.quiz.forEach((q: any) => {
        // Check if quiz is passed based on quiz results stored in localStorage
        const isPassed = this.isQuizPassed(q.id);
        console.warn(`Quiz ${q.id}: isPassed=${isPassed}`);
        
        if (isPassed) {
          this.quizPassed.push(q);
        } else {
          this.quizNotPassed.push(q);
        }
      });
    }
    
    console.warn(`Separated: ${this.quizPassed.length} passed, ${this.quizNotPassed.length} not passed`);
  }

  getAllFormations() {
    this.formationService.getFormations().subscribe((res: any) => {
      this.formations = res;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getAllQuiz();
    this.getAllFormations();
    
    // Subscribe to quiz results updates
    this.quizResultsSubscription = this.quizService.getQuizResultsUpdated().subscribe(() => {
      // Reload quiz list when results are updated
      console.warn('Quiz results updated, reloading quizzes');
      this.getAllQuiz();
    });
  }

  ngAfterViewInit() {
    // Optionally refresh data when returning to this view
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.quizResultsSubscription) {
      this.quizResultsSubscription.unsubscribe();
    }
  }

  setQuizItemsStorage() {
    this.quizService.setQuizItemsStorage(0, 0, 0, 0, "", false);
  }

  navigate(id: any) {
    this.router.navigate(['/student/student-quiz-play', id]);
  }

  toggleQuizView() {
    this.showPassed = !this.showPassed;
  }
}
