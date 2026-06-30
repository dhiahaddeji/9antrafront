import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ForumService } from 'src/app/MesServices/Forum/forum.service';
import { StompForumService } from 'src/app/MesServices/StompService/stomp_forum.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-forum',
  templateUrl: './student-forum.component.html',
  styleUrls: ['./student-forum.component.css']
})
export class StudentForumComponent implements OnDestroy {
  forum: message = { subject: '', post: '' };
  forums: any[] = [];
  showPostModal = false;
  userId: any;
  count_page: any;
  page = 0;
  per_page = 5;
  search = '';
  private shouldScroll = false;
  private stompSub: any;

  @ViewChild('scrollRef') scrollRef!: ElementRef;

  constructor(
    private forumService: ForumService,
    public userAuthService: UserAuthService,
    private stompService: StompForumService,
  ) {}

  getForum() {
    this.forumService.getForum(this.page, this.per_page, this.search).subscribe({
      next: (res: any) => {
        this.forums = res.forums.content;
        this.count_page = res.count_page.length;
        this.shouldScroll = true;
      },
      error: (err) => console.log(err)
    });
  }

  send() {
    if (this.forum.post !== '' && this.forum.subject !== '') {
      this.showPostModal = false;
      this.forumService.send(this.forum, this.userId).subscribe({
        next: () => {
          Swal.fire({ title: 'Forum Post', text: 'Your post is being seen by all users', icon: 'success' });
          this.forum.post = '';
          this.forum.subject = '';
          this.shouldScroll = true;
        }
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
        this.forumService.deleteMessage(id, null).subscribe({
          error: (err) => console.log(err)
        });
      }
    });
  }

  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.getForum();
    this.stompSub = this.stompService.subscribe('/topic/forum', (): any => {
      this.getForum();
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

  nextPage() {
    if (this.page < this.count_page) { this.page++; this.getForum(); }
  }

  previousPage() {
    if (this.page > 0) { this.page--; this.getForum(); }
  }

  substring(text: any, length: any) { return text.substring(0, length) + '...'; }
  calculLength(text: any) { return text.length; }
  trackByForumId(_: number, item: any) { return item.id; }
}
