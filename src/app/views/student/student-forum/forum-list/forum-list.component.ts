import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { ForumService } from 'src/app/MesServices/Forum/forum.service';
import { StompForumService } from 'src/app/MesServices/StompService/stomp_forum.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent {
  forum: message={subject:"",post:""}
  actualForum:any
  groupId:any=null
  group:any
  userId:any
  count_page:any
  page=0
  per_page=5
  search=""
  id:any
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  constructor(
    private forumService: ForumService,
    public userAuthService: UserAuthService,
    private route : ActivatedRoute,
    private stomp:StompForumService
  ) {

  }
  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.id=this.route.snapshot.paramMap.get('id');
    this.getForumById(this.id)
  }


  getForumById(id:any){
    this.forumService.getForumById(id).subscribe((res:any)=>{
      this.actualForum = res
    })
}

  sendAnswer(){
    if(this.forum.post !=""){
      this.forumService.sendAnswer(this.userId,this.id,this.forum).subscribe((res:any)=>{
        Swal.fire({
          title: 'Answer',
          text: 'You answer is added successfully',
          icon: 'success',
        })
        this.forum.post="";
        this.scrollToBottom();
      })
      setTimeout(() => {
        location.reload();
      }, 1000);
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

  substring(text:any,length:any){
    return text.substring(0,length)+ '...'
  }
  calculLength(text:any){
    return text.length;
  }
}
