import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';
import { message } from 'src/app/Models/message';

@Component({
  selector: 'app-coach-chat',
  templateUrl: './coach-chat.component.html',
  styleUrls: ['./coach-chat.component.css'],
})
export class CoachChatComponent {
  chat: message={subject:"",post:""}
  chatMessages: any[] = [];
  groupId:any=null
  group:any
  userId:any
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  constructor(
    private chatService: ChatService, // Use the ChatService
    public userAuthService: UserAuthService,
    private stompService : StompService,
    private route: ActivatedRoute,
    private groupService:GroupService
  ) {
  }


  getChatByGroupId(){
    if(this.groupId !=null){
      this.chatService.getChatByGroupId(this.groupId).subscribe((res:any)=>{
        this.chatMessages = res
      },(error)=>{
        console.log(error);
      })
    }
  }
  send(){
    if(this.chat.post !=""){
      this.chatService.send(this.chat , this.groupId , this.userId).subscribe((res:any)=>{
        console.log(res);
        this.chat.post="";
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
        this.chatService.deleteMessage(id).subscribe((res:any)=>{
          console.log(res);
        },(error)=>{
          console.log(error);
        })
      }
    });

  }


  getGroupbyId(id:any){
    this.groupService.getGroupsById(id).subscribe((res:any)=>{
      this.group = res
      console.log(this.group);
    },(error)=>{
      console.log(error);

    })
  }
  ngOnInit() {
    this.userId = this.userAuthService.getId();
    this.groupId = this.route.snapshot.params['id'];
    this.getGroupbyId(this.groupId);
    this.getChatByGroupId()
    this.stompService.subscribe('/topic/chat',():any=>{
      this.getChatByGroupId();
    })
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
}
