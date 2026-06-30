import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css'],
})
export class TestimonialsSectionComponent implements OnInit {
  data: any = [];
  currentTestimonialIndex = 0;

  isDataLoaded = false; //
  tabCoachChunks: any[] = [];
  constructor(private fs: FeedbackService) {}
  generateStarHTML(rating: number): string {
    const maxRating = 5;
    let starHTML = '';

    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        starHTML += '<i class="fas fa-star text-warning fa-sm"></i>'; // Full star
      } else {
        starHTML += '<i class="far fa-star text-warning fa-sm"></i>'; // Empty star
      }
    }

    return starHTML;
  }

  getAllPostedFeedbacks() {
    this.fs.getPostedFeedback().subscribe((data) => {
      console.log('Dee', data);
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.getAllPostedFeedbacks();
  }
}
