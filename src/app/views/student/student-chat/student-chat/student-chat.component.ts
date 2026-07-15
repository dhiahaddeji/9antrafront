import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { StompChatService } from 'src/app/MesServices/StompService/stomp_chat.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.css'],
})
export class StudentChatComponent implements OnDestroy {
  chat: message = { subject: '', post: '' };
  chatMessages: any[] = [];
  groupId: any = null;
  group: any;
  userId: any;
  private shouldScroll = false;
  private stompSub: any;

  @ViewChild('scrollRef') scrollRef!: ElementRef;

  constructor(
    private chatService: ChatService,
    public userAuthService: UserAuthService,
    private stompService: StompChatService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  getChatByGroupId() {
    if (this.groupId != null) {
      this.chatService.getChatByGroupId(this.groupId).subscribe({
        next: (res: any) => { this.chatMessages = res; this.shouldScroll = true; },
        error: (err) => console.log(err)
      });
    }
  }

  send() {
    const text = this.chat.post.trim();
    if (!text) return;
    this.chatMessages.push({
      id: null, message: text, status: 0,
      created_at: new Date().toISOString(),
      userEnvoi: { id: this.userId }
    });
    this.chat.post = '';
    this.shouldScroll = true;
    this.chatService.send({ subject: '', post: text }, this.groupId, this.userId).subscribe({
      error: () => this.getChatByGroupId()
    });
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

  getGroupbyId(id: any) {
    this.groupService.getGroupsById(id).subscribe({
      next: (res: any) => { this.group = res; },
      error: (err) => console.log(err)
    });
  }

  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.groupId = this.route.snapshot.params['id'];
    this.getGroupbyId(this.groupId);
    this.getChatByGroupId();
    this.stompSub = this.stompService.subscribe('/topic/chat', (): any => {
      this.getChatByGroupId();
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
