import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';

@Component({
  selector: 'app-coach-chat',
  templateUrl: './coach-chat.component.html',
  styleUrls: ['./coach-chat.component.css'],
})
export class CoachChatComponent implements OnInit, OnDestroy {
  chat: message = { subject: '', post: '' };
  chatMessages: any[] = [];
  groupId: any = null;
  group: any;
  userId: any;
  private shouldScroll = false;
  private stompSub: any;
  private pollInterval: any;

  @ViewChild('scrollRef') scrollRef!: ElementRef;

  constructor(
    private chatService: ChatService,
    public userAuthService: UserAuthService,
    private stompService: StompService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.groupId = this.route.snapshot.params['id'];
    this.getGroupbyId(this.groupId);
    this.getChatByGroupId();

    // Live updates via WebSocket
    this.stompSub = this.stompService.subscribe('/topic/chat', () => {
      this.getChatByGroupId();
    });

    // Polling fallback every 3s
    this.pollInterval = setInterval(() => this.getChatByGroupId(), 3000);
  }

  ngAfterViewInit() { this.shouldScroll = true; }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      try {
        this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
      } catch (_) {}
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    if (this.stompSub?.unsubscribe) this.stompSub.unsubscribe();
    clearInterval(this.pollInterval);
  }

  getChatByGroupId() {
    if (this.groupId == null) return;
    this.chatService.getChatByGroupId(this.groupId).subscribe({
      next: (res: any) => {
        if (JSON.stringify(res) !== JSON.stringify(this.chatMessages)) {
          this.chatMessages = res;
          this.shouldScroll = true;
        }
      },
      error: (err) => console.log(err)
    });
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
      next: () => this.getChatByGroupId(),
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
          next: () => this.getChatByGroupId(),
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
}
