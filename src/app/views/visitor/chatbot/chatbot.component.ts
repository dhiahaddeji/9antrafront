import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from 'src/app/MesServices/ChatBot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  chatVisible = false;
  questionsAndAnswers: { question: string, answer: string }[] = [];
  question: string = '';
  answer: string = '';
  loader:any=false

  constructor(private chatbotService: ChatbotService) { }

  toggleChat(): void {
    this.chatVisible = !this.chatVisible;
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  send(): void {
    const text = this.question.trim();
    if (!text || this.loader) return;

    this.loader = true;
    this.question = '';
    this.questionsAndAnswers.push({ question: text, answer: '' });
    const idx = this.questionsAndAnswers.length - 1;
    this.scrollToBottom();

    this.chatbotService.Send(text).subscribe(
      (res: any) => {
        this.questionsAndAnswers[idx].answer = res.response || '…';
        setTimeout(() => { this.loader = false; }, 400);
      },
      (_error) => {
        this.questionsAndAnswers[idx].answer =
          "Sorry, I'm unavailable right now. Please try again later.";
        setTimeout(() => { this.loader = false; }, 400);
      }
    );
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

scrollToBottom(): void {
    try {
        this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
    } catch(err) { }
}
}
