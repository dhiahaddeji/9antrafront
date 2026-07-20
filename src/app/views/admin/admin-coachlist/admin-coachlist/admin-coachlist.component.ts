import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { environment } from 'src/environement/environement.prod';

@Component({
  selector: 'app-admin-coachlist',
  templateUrl: './admin-coachlist.component.html',
  styleUrls: ['./admin-coachlist.component.css']
})
export class AdminCoachlistComponent implements OnInit {
  data: any = [];
  nameuser = '';
  tabFormateur: any = [];
  tabCoach: any = [];
  taballusers: any = [];

  cvOverlayVisible = false;
  cvOverlayName = '';
  cvOverlaySafeUrl: SafeResourceUrl | null = null;

  constructor(private sr: UserService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  getAllFormateur() {
    this.sr.getFormateursOfuser().subscribe(res => {
      this.tabFormateur = res;
    });
  }

  getallCoach() {
    this.sr.getAllUsers().subscribe(res => {
      this.taballusers = res;
      this.tabCoach = this.taballusers.filter((user: { roles: any[] }) =>
        user.roles.some(role => role.name === 'FORMATEUR')
      );
    });
  }

  updateEnabled(coach: any, value: number) {
    this.sr.updateEnabeld(value, coach.id).subscribe();
  }

  openCv(coach: any) {
    const formateur = this.tabFormateur.find((f: any) => f.user?.id === coach.id);
    const cvFile = formateur?.cv;
    if (!cvFile) {
      alert('Aucun CV disponible pour ce coach.');
      return;
    }
    const url = `${environment.BASE_URL}/uploads/Documents/${cvFile}`;
    this.cvOverlaySafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.cvOverlayName = coach.firstName + ' ' + coach.lastName;
    this.cvOverlayVisible = true;
  }

  closeCv() {
    this.cvOverlayVisible = false;
    this.cvOverlaySafeUrl = null;
  }

  ngOnInit(): void {
    this.getallCoach();
    this.getAllFormateur();
  }
}
