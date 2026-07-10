import { Component, ElementRef, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/MesServices/ChatBot/chatbot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-chatbot',
  templateUrl: './admin-chatbot.component.html',
  styleUrls: ['./admin-chatbot.component.css']
})
export class AdminChatbotComponent implements OnInit {

  unmatched: any[] = [];
  // Per-question answer drafts — keyed by question text
  answers: { [question: string]: string } = {};

  // "Add Q&A" modal fields
  newQuestion: string = '';
  newAnswer: string = '';

  // Question selected for single-delete modal
  selectedQuestion: string = '';

  // Which cards are expanded
  expanded: boolean[] = [];

  isLoading = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.getUnmatched();
  }

  getUnmatched(): void {
    this.isLoading = true;
    this.chatbotService.getUnmatched().subscribe(
      (res: any) => {
        this.unmatched = res;
        this.expanded = res.map(() => false);
        this.isLoading = false;
      },
      () => { this.isLoading = false; }
    );
  }

  toggle(i: number): void {
    this.expanded[i] = !this.expanded[i];
  }

  selectForDelete(question: string): void {
    this.selectedQuestion = question;
  }

  teach(question: string): void {
    const answer = (this.answers[question] || '').trim();
    if (!answer) {
      Swal.fire({ icon: 'warning', title: 'Empty answer', text: 'Please write an answer before saving.' });
      return;
    }
    this.chatbotService.teach(question, answer).subscribe(
      (res: any) => {
        Swal.fire({ icon: 'success', title: 'Saved!', text: 'The bot has been taught this answer.' });
        delete this.answers[question];
        this.getUnmatched();
      },
      () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not save the answer. Try again.' });
      }
    );
  }

  add(): void {
    const q = this.newQuestion.trim();
    const a = this.newAnswer.trim();
    if (!q || !a) {
      Swal.fire({ icon: 'warning', title: 'Incomplete', text: 'Both question and answer are required.' });
      return;
    }
    this.chatbotService.add(q, a).subscribe(
      () => {
        Swal.fire({ icon: 'success', title: 'Added!', text: 'Question & answer added to the bot.' });
        this.newQuestion = '';
        this.newAnswer = '';
        this.getUnmatched();
      },
      () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not add the question. Try again.' });
      }
    );
  }

  deleteByKey(question: string): void {
    this.chatbotService.deleteByKey(question).subscribe(
      () => {
        Swal.fire({ icon: 'success', title: 'Deleted', text: 'Question removed from unmatched list.' });
        this.getUnmatched();
      },
      () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not delete the question.' });
      }
    );
  }

  deleteAll(): void {
    this.chatbotService.deleteAll(null).subscribe(
      () => {
        Swal.fire({ icon: 'success', title: 'Cleared', text: 'All unmatched questions deleted.' });
        this.getUnmatched();
      },
      () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not delete questions.' });
      }
    );
  }
}
