import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ChatbotService } from 'src/app/MesServices/ChatBot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  chatVisible = false;
  questionsAndAnswers: { question: string, answer: string }[] = [];
  question: string = '';
  answer: string = '';
  loader: any = false;

  constructor(private chatbotService: ChatbotService) { }

  toggleChat(): void {
    this.chatVisible = !this.chatVisible;
    if (this.chatVisible) {
      setTimeout(() => this.scrollToBottom(), 0);
    }
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
    setTimeout(() => this.scrollToBottom(), 0);

    this.chatbotService.Send(text).subscribe(
      (res: any) => {
        this.questionsAndAnswers[idx].answer = res.response || '…';
        setTimeout(() => {
          this.loader = false;
          this.scrollToBottom();
        }, 400);
      },
      (_error) => {
        this.questionsAndAnswers[idx].answer =
          "Sorry, I'm unavailable right now. Please try again later.";
        setTimeout(() => {
          this.loader = false;
          this.scrollToBottom();
        }, 400);
      }
    );
  }

  scrollToBottom(): void {
    try {
      this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
