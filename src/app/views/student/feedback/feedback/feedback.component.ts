import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackData: any[] = [];
  Allformation: any = [];
  selectedRating: number = 0;
  showSuccessModal: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';
formation: any;
UserConnected: any=[];
comment: any;
idUser!:any;
  constructor(private FormationsService:FormationsService,private fb:FeedbackService, private User:UserService,private AuthSer:UserAuthService ,  private   router : Router ) {
    this.idUser = this.AuthSer.getId()
  }
  setRating(rating: number) {
    console.log('Selected Rating:', rating);
    this.selectedRating = rating;
  }

  AddFeedback() {
    if (this.formation && this.comment) {
      let feedback = {
        formation: this.formation,
        comment: this.comment,
        rating: this.selectedRating, // Include the selected rating in the feedback object
        user: this.UserConnected,
      };

      this.fb.ajoutFeedback(feedback).subscribe(
        (data: any) => {
          this.successMessage = 'Training program added successfully.';
          this.errorMessage = '';

          // SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your feedback added successfully.'
          }).then((result) => {
            if (result.isConfirmed) {
              // Call the handleOKClick function to navigate to '/admin/trainings'
              this.handleOKClick();
            }
          });

          console.log(data);
        },
        (error: any) => {
          this.successMessage = '';
          this.errorMessage =
            'Error adding the training program. Please try again.';

          // SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error adding the training program. Please try again.',
          });

          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all the required fields.';

      // SweetAlert warning message
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please fill in all the required fields.',
      });
    }
  }
  handleOKClick() {
    this.showSuccessModal = false;
    this.router.navigate(['/student']);
  }



  getALLFormations() {
    this.FormationsService.getFormations().subscribe((data) => {
      this.Allformation = data;
      console.log(this.Allformation);
    });
  }
  // Inside your component class
  toggleRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
  }

  ngOnInit(): void {
    this.getALLFormations();

    console.log(this.idUser);
    this.User.getUserById(this.idUser).subscribe((data) => {
      this.UserConnected = data;
      console.log(this.UserConnected);
    });
  }
}