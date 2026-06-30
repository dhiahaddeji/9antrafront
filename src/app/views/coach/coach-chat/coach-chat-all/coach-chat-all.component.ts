import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { message } from 'src/app/Models/message';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coach-chat-all',
  templateUrl: './coach-chat-all.component.html',
  styleUrls: ['./coach-chat-all.component.css']
})
export class CoachChatAllComponent {
  chat: message={subject:"",post:""}
  chatMessages: any[] = [];
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


  getMessagesForAll(){
      this.chatService.getMessagesForAll().subscribe((res:any)=>{
        this.chatMessages = res
      },(error)=>{
        console.log(error);
      })
  }
  sendAll(){
    if(this.chat.post !=""){
      this.chatService.sendAll(this.chat , this.userId).subscribe((res:any)=>{
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

  ngOnInit() {
    this.userId = this.userAuthService.getId()
    this.getMessagesForAll()
    this.stompService.subscribe('/topic/chat',():any=>{
      this.getMessagesForAll();
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
