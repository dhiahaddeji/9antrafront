import { SessionService } from './../../../MesServices/Session/session.service';
import { RecordService } from './../../../MesServices/Record/record.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Session } from 'src/app/Models/Session';
import Swal from 'sweetalert2';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit, AfterViewInit {
  domain: string = "jitsi.riot.im"; // Public Jitsi instance - no authentication needed
  room: any;
  options: any;
  api: any;
  users: any = [];
  user: any;
  username!: string;
  sessions!: any[];
  // For Custom Controls
  isAudioMuted = true;
  isVideoMuted = true;
  idSession: any = null;
  sessionInfo: any = [];
  
  // Recording properties
  isRecording = false;
  recordingUrl: string | null = null;
  groupId: any = null;

  constructor(
    private router: Router,
    private sr: UserService,
    private fr: FormationsService,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private userAuth: UserAuthService,
    private recordService: RecordService
  ) {
    this.idSession = this.activatedRoute.snapshot.paramMap.get('id');
  }
  generateRoomName(): string {
    return 'my-meeting-room';
  }
  handleClose = () => {
    console.log("handleClose");
  }
  getSesisonbygeneratedLink(generatedLink: string) {
    this.sessionService.getbybyGeneratedLink(generatedLink).subscribe((res: any) => {
      this.sessionInfo = res;
      this.groupId = res.group?.id || res.groupId; // Get group ID for recording
      console.warn('Session info:', this.sessionInfo);
      console.warn('Group ID:', this.groupId);
      this.room = "Welcome to " + this.sessionInfo.sessionName;
    }, (error) => {
      console.error('Error fetching session:', error);
    });
  }

  getUserById(id: any) :any {
    this.sr.getUserById(id).subscribe((res) => {
      this.users = res;
      console.log(this.users['firstName']);
    });
  }

  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
    console.warn("handleVideoConferenceJoined", participant);
    const data = await this.getParticipants();
    
    // ✅ START RECORDING when joining
    this.startRecording();
  }

  handleVideoConferenceLeft = async () => {
    console.warn("handleVideoConferenceLeft - Stopping recording");
    
    // ✅ STOP RECORDING when leaving
    await this.stopRecording();
    
    // Navigate after showing save prompt
    setTimeout(() => {
      this.router.navigate(['/coach/groups']);
    }, 1000);
  }

  handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
  }

  // ✅ RECORDING EVENT HANDLERS
  handleRecordingStatusChanged = (data: any) => {
    console.warn("Recording status changed:", data);
    this.isRecording = data.on || false;
    
    if (this.isRecording) {
      Swal.fire({
        icon: 'info',
        title: '🔴 Recording Started',
        text: 'This meeting is now being recorded',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  handleRecordingStopped = (data: any) => {
    console.warn("Recording stopped:", data);
    this.isRecording = false;
    this.recordingUrl = data.recordingUrl || null;
    
    if (this.recordingUrl) {
      console.warn("Recording URL available:", this.recordingUrl);
      this.promptSaveRecording();
    }
  }

  startRecording() {
    console.warn("Attempting to start recording...");
    try {
      this.api.executeCommand('startRecording');
      console.warn("Start recording command sent");
    } catch (e) {
      console.warn("Could not start recording:", e);
      Swal.fire({
        icon: 'warning',
        title: 'Recording Not Available',
        text: 'This Jitsi server may not have recording enabled.'
      });
    }
  }

  async stopRecording() {
    console.warn("Attempting to stop recording...");
    try {
      this.api.executeCommand('stopRecording');
      console.warn("Stop recording command sent");
      
      // Wait for the recording to be saved
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn("Could not stop recording:", e);
    }
  }

  promptSaveRecording() {
    if (!this.recordingUrl) {
      console.warn("No recording URL available");
      return;
    }

    Swal.fire({
      title: '💾 Save Recording?',
      text: 'Would you like to save this meeting recording?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, Save It',
      cancelButtonText: 'No, Discard'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.saveRecordingToBackend();
      } else {
        console.log('Recording discarded');
        Swal.fire({
          icon: 'info',
          title: 'Recording Discarded',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  async saveRecordingToBackend() {
    if (!this.recordingUrl || !this.groupId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Missing recording URL or group ID'
      });
      return;
    }

    console.warn("Downloading recording from:", this.recordingUrl);

    try {
      // Download the recording file
      const response = await fetch(this.recordingUrl);
      const blob = await response.blob();
      
      // Create a file from the blob
      const timestamp = new Date().toLocaleString();
      const fileName = `Meet-Recording-${new Date().getTime()}.mp4`;
      const file = new File([blob], fileName, { type: 'video/mp4' });

      // Create FormData for upload
      const formData = new FormData();
      formData.append('title', `Meeting - ${timestamp}`);
      formData.append('groupId', this.groupId.toString());
      formData.append('idUser', this.userAuth.getId().toString());
      formData.append('file', file, fileName);

      console.warn("Uploading recording...");

      // Upload to backend
      this.recordService.addRecord(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Recording Saved!',
            text: 'The meeting recording has been saved successfully',
            timer: 2000,
            showConfirmButton: false
          });
          console.warn("Recording saved successfully");
        },
        error: (err) => {
          console.error("Upload error:", err);
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Could not save the recording. Please try again.'
          });
        }
      });
    } catch (error) {
      console.error("Error downloading recording:", error);
      Swal.fire({
        icon: 'error',
        title: 'Download Failed',
        text: 'Could not download the recording file'
      });
    }
  }
  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.router.navigate(['/student']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  ngOnInit(): void {
    this.getSesisonbygeneratedLink(this.idSession);
    if(this.idSession !=null){
      this.initializeJitsi(this.idSession);
    }
  }

  ngAfterViewInit(): void {

  }


  initializeJitsi(roomName: string) {
    this.sr.getUserById(this.userAuth.getId()).subscribe((res: any) => {
      this.users = res;
      console.warn('User:', this.users['firstName']);
      
      this.options = {
        roomName: roomName,
        width: 1000,
        height: 600,
        configOverwrite: { 
          prejoinPageEnabled: false,
          // ✅ RECORDING CONFIGURATION
          recordingService: {
            enabled: true,
            hideStartButton: false
          },
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          disableAudioLevels: false
        },
        interfaceConfigOverwrite: {
          // overwrite interface properties
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestream', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'select-background', 'download'
          ]
        },
        parentNode: document.querySelector('#jitsi-iframe'),
        userInfo: {
          displayName: this.users['firstName'] + ' ' + this.users['lastName']
        }
      };

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

      // ✅ EVENT LISTENERS FOR RECORDING
      this.api.addEventListeners({
        readyToClose: this.handleClose,
        participantLeft: this.handleParticipantLeft,
        participantJoined: this.handleParticipantJoined,
        videoConferenceJoined: (participant: any) => {
          this.handleVideoConferenceJoined(participant);
          // Mute audio and video after joining
          this.api.executeCommand('toggleAudio');
          this.api.executeCommand('toggleVideo');
        },
        videoConferenceLeft: this.handleVideoConferenceLeft,
        audioMuteStatusChanged: this.handleMuteStatus,
        videoMuteStatusChanged: this.handleVideoStatus,
        recordingStatusChanged: this.handleRecordingStatusChanged,
        recordingStopped: this.handleRecordingStopped
      });
    });
  }


}
