import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/MesServices/Report/report.service';
import { Report } from 'src/app/Models/E-learning/Report';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reports-list',
  templateUrl: './admin-reports-list.component.html',
  styleUrls: ['./admin-reports-list.component.css']
})
export class AdminReportsListComponent implements OnInit {

  reports: Report[] = []


  constructor(private reportService: ReportService) {}



  ngOnInit(): void {
    this.getAllReports()
  }

  getAllReports() {
    this.reportService.getReports().subscribe(
      (data) => {
        this.reports = data
      }
    )
  }

  getImage(report: Report): string {
    return "assets/Reports/Report_" + report.id + "/" + report.image
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reportService.deleteReport(id).subscribe( 
          () => {
            Swal.fire('Deleted!', 'Report has been deleted.', 'success');
            this.getAllReports()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting this report', 'error');
            this.getAllReports()
          }
        )
      }
    });
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

    this.reportService.downloadFile(report).subscribe(
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

}
