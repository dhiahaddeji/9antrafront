import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import { ReportService } from 'src/app/MesServices/Report/report.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Report } from 'src/app/Models/E-learning/Report';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  userLoggedIn: boolean = false
  reports: Report[] = []
  showLoader: boolean = true


  constructor(private rs: ReportService, private userService: UserAuthService, private router: Router, private navbarLoaderService: NavbarLoaderCommunicationService) {}

  ngOnInit(): void {
    this.getAll()
    this.userLoggedIn = this.userService.isLoggedIn1()
  }

  getAll() {
    this.rs.getReports().subscribe(
      (data) => {
        this.reports = data
        this.load()
      }
    )
  }

  getImage(report: Report): string {
    return "assets/Reports/Report_" + report.id + "/" + report.image
  }

  download(report: Report): void {
    if (!report.file) {
      console.error('Report image is missing.');
      // Handle the error, show an error message, etc.
      return;
    }

    const contentType = this.getContentType(report.file);
    if (!contentType) {
      console.error('Unsupported file type:', report.file);
      // Handle the error, show an error message, etc.
      return;
    }

    this.rs.downloadFile(report).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: contentType });

        const fileName = report.file!.substring(report.file!.indexOf('_') + 1);
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        //anchor.download = `Report_${report.id}.${report.file!.split('.').pop()?.toLowerCase()}`;
        anchor.download = fileName
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      },
      (error) => {
        console.error('Error while downloading the report:', error);
        // Handle the error, show an error message, etc.
      }
    );
  }

  // Helper method to get the appropriate content type based on the file extension
  private getContentType(file: string): string | undefined {
    const extension = file.split('.').pop()?.toLowerCase();
    const contentTypes: { [extension: string]: string } = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      latex: 'application/x-latex',
      // Add more mappings for other file extensions if needed
    };
    return contentTypes[extension || ''] || undefined;
  }

  login() {
    this.router.navigate(['/login'])
  }

  load() {
    setTimeout(() => {
      this.showLoader = false
    }, 1000);
  }

}
