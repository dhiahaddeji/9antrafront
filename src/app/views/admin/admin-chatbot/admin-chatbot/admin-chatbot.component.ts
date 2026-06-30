import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ChatbotService } from 'src/app/MesServices/ChatBot/chatbot.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-chatbot',
  templateUrl: './admin-chatbot.component.html',
  styleUrls: ['./admin-chatbot.component.css']
})
export class AdminChatbotComponent implements OnInit{

  unmatched:any=[]
  isCollapsed: boolean[] = [];
  answer:any=null
  newAnswer:any=null
  newQuestion:any=null
  deletedQuestion:any=null
  isChecked:any=false
  constructor(private elementRef: ElementRef,private chatbotService:ChatbotService, private router: Router,
    private route : ActivatedRoute) {

  }

  toggleCollapseOpen(index: number): void {
    if(this.isCollapsed[index]==true){
      this.isCollapsed[index] = false;
    }
  }

  @HostListener('document:click', ['$event'])
  closeCollapse(event: MouseEvent): void {
    for (let i = 0; i < this.isCollapsed.length; i++) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isCollapsed[i] = true;
      }
    }
  }

  getUnmatched(){
    this.chatbotService.getUnmatched().subscribe((res:any)=>{
      this.unmatched = res;
      console.log(this.unmatched);
      this.unmatched.forEach(() => {
        this.isCollapsed.push(true);
      });
      console.log(this.isCollapsed);
    },(error)=>{
      console.log(error);

    })
  }

  teach(question:any){
    this.chatbotService.teach(question,this.answer).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Teach Bot',
          text: res,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Teach Bot',
        text: "Error while teaching Bot",
      });
      console.log(error);
    })
  }

  add(){
    if(this.newQuestion!=null && this.newAnswer!=null){
      this.chatbotService.add(this.newQuestion,this.newAnswer).subscribe((res:any)=>{
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Add Question & Answer',
          text: res,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },(error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    }
  }

  deleteByKey(question:any){
      this.chatbotService.deleteByKey(question).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Delete',
          text: 'Question deleted successfully',
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },(error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
  }

  deleteAll(){
    let question = null;
      this.chatbotService.deleteAll(question).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Delete',
          text: 'All unmatched questions deleted successfully',
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },(error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
  }
  ngOnInit(): void {
    this.getUnmatched();
  }

}
