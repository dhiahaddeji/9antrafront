import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CertificatService } from 'src/app/MesServices/Certificat/certificat.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Certificat } from 'src/app/Models/Certificat';
import { User } from 'src/app/Models/user.model';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-getcertifcates',
  templateUrl: './getcertifcates.component.html',
  styleUrls: ['./getcertifcates.component.css']
})
export class GetcertifcatesComponent implements OnInit {
  constructor(
    private sr: UserService,
    private route: ActivatedRoute,
    private projectService: CertificatService,
    private sanitizer: DomSanitizer
  ) {}

  certificates: Certificat[] = [];
  user: User = new User();
  formationNames: string[] = [];
  loading = true;
  selectedCertificate: Certificat | null = null;

  ngOnInit(): void {
    const routeId = this.route.snapshot.params['id'];
    const id = routeId || localStorage.getItem('id');

    if (id) {
      this.projectService.getUserCertificates(id).subscribe(
        (res: Certificat[]) => {
          this.certificates = res;
          this.loading = false;
          if (this.certificates.length > 0) {
            this.selectedCertificate = this.certificates[0];
          }
        },
        () => { this.loading = false; }
      );

      this.projectService.getUserCertificatesFormationNames(id).subscribe(
        (res: string[]) => { this.formationNames = res; },
        (err: any) => { console.error(err); }
      );

      this.sr.getById2(id).subscribe(
        (res: User) => { this.user = res; },
        (err: any) => { console.error(err); }
      );
    } else {
      this.loading = false;
    }
  }

  getSafeUrl(path: string): SafeResourceUrl {
    // path is like: "Certifications/Grafana June 2026 4649761/test test.pdf"
    // Call API endpoint to serve the PDF from the uploads folder
    const apiUrl = `${environement.BASE_URL.replace('/api', '')}/api/uploads/Certifications?path=${encodeURIComponent(path)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(apiUrl);
  }

  getDownloadUrl(path: string): string {
    // path is like: "Certifications/Grafana June 2026 4649761/test test.pdf"
    // Return the download URL
    return `${environement.BASE_URL.replace('/api', '')}/api/uploads/Certifications?path=${encodeURIComponent(path)}`;
  }

  selectCertificate(cert: Certificat): void {
    this.selectedCertificate = cert;
  }
}
