import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/MesServices/Notification/notification.service';
import { StompService } from 'src/app/MesServices/StompService/stomp.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit{

  notifications:any
  notificationsNotSeen: any[] = [];
  count_page:any
  page=0
  per_page=5
  constructor( private authService: UserAuthService,
    private notificationService: NotificationService,
    private stompService : StompService){
    }
  ngOnInit(): void {
    this.getAllPaginate();
    this.stompService.subscribe('/topic/notification',():any=>{
      this.getAllPaginate();

    })
  }
    isLoggedIn(): boolean {
      return this.authService.isLoggedIn2();
    }
  updateNotificationsNotSeen(): void {
      this.notificationsNotSeen = this.notifications.filter(
        (notification:any) => notification.status === 0
      );
    }

    getAllPaginate(){
      this.notificationService.getAllPaginate(this.page,this.per_page,this.authService.getId()).subscribe((res:any)=>{
        this.notifications=res.notifs.content
        this.count_page = res.count_page.length
        console.log( this.notifications);
        this.updateNotificationsNotSeen();
      },(error)=>{
        console.log(error);
      })
    }

    changeStatusToSeenDetails(id:any){
          this.notificationService.changeStatusToSeenDetails(id,null).subscribe((res:any)=>{
          })
      }

    deleteById(id:any){
      this.notificationService.deleteById(id).subscribe((res:any)=>{
        this.stompService.subscribe('/topic/notification',():any=>{
          this.getAllPaginate();
        })
        console.log(res);
      },(error)=>{
        console.log(error);
      })
    }

    deleteAll(){
      if(this.notifications.length>0){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about delete all the notifications',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.notificationService.deleteAll().subscribe((res:any)=>{
              this.updateNotificationsNotSeen();
            })
          }
        });
      }
    }

    nextPage(){
      if(this.page<this.count_page){
        this.page++;
        this.getAllPaginate();
      }
    }

    previousPage(){
      if(this.page>0){
        this.page--;
        this.getAllPaginate()
      }
    }
}
