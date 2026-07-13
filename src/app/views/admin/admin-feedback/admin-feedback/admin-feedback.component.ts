import { Component, HostListener, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';
import { environement } from 'src/environement/environement.dev';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css'],
})
export class AdminFeedbackComponent implements OnInit {
  tabFeedback: any = [];
  tabStudent: any = [];
  baseUrl = environement.BASE_URL.replace('/api', '');
  openDropdownId: number | null = null;
  constructor(private fs: FeedbackService) {}

  getAllFeedbacks() {
    this.fs.getAllFeedbacks().subscribe((data) => {
      this.tabFeedback = data;
      this.sortFeedbacksByDate();
    });
  }
  //delete feedback
  deleteFeedback(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fs.deleteFeedback(id).subscribe((data) => {
          console.log('Dee', data);
          this.getAllFeedbacks();
        });
      }
    });
  }

  updateFeedback(id: any) {
    this.openDropdownId = null;
    this.fs.updateFeedback(id).subscribe((data) => {
      this.getAllFeedbacks();
    });
  }

  toggleDropdown(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.openDropdownId = null;
  }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }
  generateStarHTML(rating: number): string {
    const maxRating = 5;
    let starHTML = '';
    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        starHTML += '<i class="fas fa-star text-warning fa-sm"></i>';
      } else {
        starHTML += '<i class="far fa-star text-warning fa-sm"></i>';
      }
    }

    return starHTML;
  }
  sortFeedbacksByDate() {
    this.tabFeedback.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }



}
