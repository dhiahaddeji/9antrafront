import { Component, ElementRef, ViewChild } from '@angular/core';
import { ForumService } from 'src/app/MesServices/Forum/forum.service';
import { StompForumService } from 'src/app/MesServices/StompService/stomp_forum.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coach-forum',
  templateUrl: './coach-forum.component.html',
  styleUrls: ['./coach-forum.component.css']
})
export class CoachForumComponent {
  forum: message={subject:"",post:""}
  forums: any[] = [];
  groupId:any=null
  group:any
  userId:any
  count_page:any
  page=0
  per_page=5
  search=""
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  constructor(
    private forumService: ForumService,
    public userAuthService: UserAuthService,
    private stompService : StompForumService,
  ) {
  }

  getForum(){
      this.forumService.getForum(this.page,this.per_page,this.search).subscribe((res:any)=>{
        this.forums = res.forums.content
        console.log(this.forums.length);
        this.count_page = res.count_page.length
      },(error)=>{
        console.log(error);
      })
  }

  send(){
    if(this.forum.post !="" && this.forum.subject!=""){
      this.forumService.send(this.forum , this.userId).subscribe((res:any)=>{
        Swal.fire({
          title: 'Forum Post',
          text: 'You post is being seen by all users',
          icon: 'success',
        })
        this.forum.post="";
        this.forum.subject="";
        this.scrollToBottom();
      })
    }
  }

  deleteMessage(id:any){
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
        this.forumService.deleteMessage(id,null).subscribe((res:any)=>{
        },(error)=>{
          console.log(error);
        })
      }
    });

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
      } catch(err) { }
  }

  ngOnInit() {
    this.stompService.subscribe('/topic/forum',():any=>{
      this.getForum();
    })
    this.userId = this.userAuthService.getId();
    this.getForum()
  }

  nextPage(){
    if(this.page<this.count_page){
      this.page++;
      this.getForum();
    }
  }

  previousPage(){
    if(this.page>0){
      this.page--;
      this.getForum()
    }
  }

  substring(text:any,length:any){
    return text.substring(0,length)+ '...'
  }
  calculLength(text:any){
    return text.length;
  }
}
