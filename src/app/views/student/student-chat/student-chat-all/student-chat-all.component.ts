import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-chat-all',
  templateUrl: './student-chat-all.component.html',
  styleUrls: ['./student-chat-all.component.css']
})
export class StudentChatAllComponent implements OnDestroy {
  chat: message = { subject: '', post: '' };
  chatMessages: any[] = [];
  userId: any;
  private shouldScroll = false;
  private stompSub: any;

  @ViewChild('scrollRef') scrollRef!: ElementRef;

  constructor(
    private chatService: ChatService,
    public userAuthService: UserAuthService,
    private stompService: StompService
  ) {}

  getMessagesForAll() {
    this.chatService.getMessagesForAll().subscribe({
      next: (res: any) => { this.chatMessages = res; this.shouldScroll = true; },
      error: (err) => console.log(err)
    });
  }

  sendAll() {
    if (this.chat.post !== '') {
      this.chatService.sendAll(this.chat, this.userId).subscribe({
        next: () => { this.chat.post = ''; this.shouldScroll = true; }
      });
    }
  }

  deleteMessage(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about delete this message.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chatService.deleteMessage(id).subscribe({
          error: (err) => console.log(err)
        });
      }
    });
  }

  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.getMessagesForAll();
    this.stompSub = this.stompService.subscribe('/topic/chat', (): any => {
      this.getMessagesForAll();
    });
  }

  ngAfterViewInit() { this.shouldScroll = true; }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      try {
        this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
      } catch (err) {}
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    if (this.stompSub?.unsubscribe) this.stompSub.unsubscribe();
  }

  trackByMessageId(_: number, msg: any) { return msg.id; }
}
