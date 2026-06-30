import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css'],
})
export class AdminMessagesComponent implements OnInit {
  @ViewChild('scrollRef') scrollRef!: ElementRef;

  chat: message = { subject: '', post: '' };
  chatMessages: any[] = [];
  allGroups: any[] = [];
  selectedGroupId: any = null;
  selectedGroupName = 'General';
  userId: any;

  constructor(
    private chatService: ChatService,
    private groupService: GroupService,
    private stompService: StompService,
    public userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.userAuthService.getId();
    this.loadGroups();
    this.loadMessages();
    this.stompService.subscribe('/topic/chat', () => {
      this.loadMessages();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe(
      (res: any) => (this.allGroups = res),
      (err: any) => console.error(err)
    );
  }

  selectGeneral(): void {
    this.selectedGroupId = null;
    this.selectedGroupName = 'General';
    this.chat.post = '';
    this.loadMessages();
  }

  selectGroup(group: any): void {
    this.selectedGroupId = group.id;
    this.selectedGroupName = group.groupName;
    this.chat.post = '';
    this.loadMessages();
  }

  loadMessages(): void {
    if (this.selectedGroupId === null) {
      this.chatService.getMessagesForAll().subscribe(
        (res: any) => {
          this.chatMessages = res;
          this.scrollToBottom();
        },
        (err: any) => console.error(err)
      );
    } else {
      this.chatService.getChatByGroupId(this.selectedGroupId).subscribe(
        (res: any) => {
          this.chatMessages = res;
          this.scrollToBottom();
        },
        (err: any) => console.error(err)
      );
    }
  }

  send(): void {
    if (!this.chat.post.trim()) return;
    if (this.selectedGroupId === null) {
      this.chatService.sendAll(this.chat, this.userId).subscribe(() => {
        this.chat.post = '';
        this.scrollToBottom();
      });
    } else {
      this.chatService
        .send(this.chat, this.selectedGroupId, this.userId)
        .subscribe(() => {
          this.chat.post = '';
          this.scrollToBottom();
        });
    }
  }

  deleteMessage(id: any): void {
    this.chatService.deleteMessage(id).subscribe(
      () => this.loadMessages(),
      (err: any) => console.error(err)
    );
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  scrollToBottom(): void {
    try {
      this.scrollRef.nativeElement.scrollTop =
        this.scrollRef.nativeElement.scrollHeight;
    } catch (e) {}
  }
}
