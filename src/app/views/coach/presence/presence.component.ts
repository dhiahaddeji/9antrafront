import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  groups: Groups[] = [];
  group: Session[] = [];

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,     private http: HttpClient // Inject HttpClient here

  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.params['id'];
    //this.getSessionById(sessionId); // Fetch the session details first
    this.getGroupsBySessionId(sessionId);
    this.loadPresenceStatusFromLocalStorage();

    // Register the beforeunload event to save presence status when leaving the page
    window.addEventListener('beforeunload', () => this.savePresenceStatusToLocalStorage());
  
  }
  ngOnDestroy(): void {
    // Unregister the beforeunload event when the component is destroyed
    window.removeEventListener('beforeunload', () => this.savePresenceStatusToLocalStorage());
  }
  
  // Function to load presence status from local storage
  loadPresenceStatusFromLocalStorage(): void {
    const presenceStatusFromLocalStorage = localStorage.getItem('userPresenceStatusMap');
    if (presenceStatusFromLocalStorage) {
      this.userPresenceStatusMap = JSON.parse(presenceStatusFromLocalStorage);
    }
  }
  
  // Function to save presence status to local storage
  savePresenceStatusToLocalStorage(): void {
    localStorage.setItem('userPresenceStatusMap', JSON.stringify(this.userPresenceStatusMap));
  }
  getGroupsBySessionId(sessionId: number): void {
    this.sessionService.getGroupsBySessionId(sessionId).subscribe(
      (groups: Groups[]) => {
        this.groups = groups;
        console.log('Groups:', groups);
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
  session: Session = new Session();
  sessions = this.route.snapshot.params['id'];

  // markUserPresence( groupId: number, userId: number, isPresent: boolean): void {
  
  //  const url = `https://9antrabackend-production.up.railway.app/api/sessions/${this.sessions}/groups/${groupId}/users/${userId}/markPresence`;
  //   const params = { isPresent: isPresent.toString() };
  //   this.groups.forEach(group => {
  //     if (group.id === groupId) {
  //       group.userPresenceStatus[userId] = isPresent;
  //     }
  //   });
  //   this.http.get(url,{ params }).subscribe(
  //     (response: any) => {
  //       console.log('User presence status updated successfully:', response);
  //       this.refreshData(this.sessions);

      
  //     },
  //     (error: any) => {
  //       console.error('Error updating user presence status:', error);
  //       // You can display an error message here
  //     }
  //   );
  // }
  markUserPresence( groupId: number, userId: number, isPresent: boolean): void {
    const url = `https://9antrabackend-production.up.railway.app/api/sessions/${this.sessions}/groups/${groupId}/users/${userId}/presence`;

    // Create the request body with the necessary data
      const params = { isPresent: isPresent.toString() };
      this.group.forEach(session => {
        if (session.id === this.sessions) {
          session.userPresence[userId] = isPresent;
        }
      });
    // Set the content type header
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.get(url,{ params }).subscribe(
      (response: any) => {
        console.log('User presence status updated successfully:', response);
        this.refreshData(this.sessions);

},
      (error: any) => {
        console.error('Error updating user presence status:', error);
        // You can display an error message here or handle the error as needed
      }
    );
  }
 

  
  
  
  isPresent: boolean = false; // Define isPresent property and set its default value

  
  
  // getUserPresenceStatus(studentId: number): boolean {
  //       for (const group of this.group) {
  //         const userPresence = group.userPresence;
  //         if (userPresence && userPresence[studentId] !== undefined) {
  //           return userPresence[studentId];
  //         }
  //       }
  //       return false; // Default value if the presence status is not found
  //     }
  
  getUserPresenceStatus(studentId: number): boolean {
    // Assuming userPresenceStatus is on the session object
    const userPresence = this.session.userPresence;
  
    if (userPresence && userPresence[studentId] !== undefined) {
      // If the student is found with a valid presence status, return the presence status
      return userPresence[studentId];
    }
  
    // If the student is not found in the session or has no presence status, return the default value (false)
    return false;
  }
  
 
togglePresenceStatus(groupId: number, studentId: number, isPresent: boolean): void {
 
  this.markUserPresence(groupId, studentId, isPresent);
}


refreshData(sessionId: number): void {
  this.getGroupsBySessionId(sessionId);
}
userPresenceStatusMap: { [sessionId: string]: { [studentId: number]: boolean } } = {};
togglePresenceStatuss( groupId: number, studentId: number, isChecked: boolean): void {
  // Check if the session ID is already present in the userPresenceStatusMap
  if (this.userPresenceStatusMap.hasOwnProperty(this.sessions)) {
    const sessionPresenceMap = this.userPresenceStatusMap[this.sessions];
    // Update the presence status in the object for this student
    sessionPresenceMap[studentId] = isChecked;
  } else {
    // If the session ID is not present, create a new object and add the presence status for this student
    this.userPresenceStatusMap[this.sessions] = { [studentId]: isChecked };
  }

  // Call the markUserPresence method with the updated presence status
  this.markUserPresence(groupId, studentId, isChecked);

  // Save the updated user presence status to local storage
  localStorage.setItem('userPresenceStatusMap', JSON.stringify(this.userPresenceStatusMap));
}

getUserPresenceStatuse( studentId: number): boolean {
  // Check if the session ID is present in the userPresenceStatusMap
  if (this.userPresenceStatusMap.hasOwnProperty(this.sessions)) {
    const sessionPresenceMap = this.userPresenceStatusMap[this.sessions];
    // Check if the presence status for the student is stored in the object
    if (sessionPresenceMap.hasOwnProperty(studentId)) {
      return sessionPresenceMap[studentId];
    }
  }
  return false; // Absent by default if the student or the presence status is not found
}

// getUserPresenceStatuse(studentId: number): boolean {
//   // Check if the presence status for the student is stored in the Map
//   if (this.userPresenceStatusMap.has(studentId)) {
//     return this.userPresenceStatusMap.get(studentId)!;
//   }
//   // If not found in the Map, return false (Absent) by default
//   return false;
// }

// togglePresenceStatuse(groupId: number, studentId: number, isChecked: boolean): void {
//   // Update the presence status in the Map
//   this.userPresenceStatusMap.set(studentId, isChecked);

//   // Call the markUserPresence method with the updated presence status
//   this.markUserPresence(groupId, studentId, isChecked);

//   // Save the updated user presence status to local storage
//   localStorage.setItem('userPresenceStatusMap', JSON.stringify([...this.userPresenceStatusMap]));
// }
}
 
