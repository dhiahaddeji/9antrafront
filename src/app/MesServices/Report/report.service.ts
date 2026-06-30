import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Report } from 'src/app/Models/E-learning/Report';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environement.BASE_URL}/e-learning/reports`)
  }

  getOne(id: number): Observable<Report> {
    return this.http.get<Report>(`${environement.BASE_URL}/e-learning/reports/${id}`)
  }

  addReport(form: FormData) {
    return this.http.post(`${environement.BASE_URL}/e-learning/reports`,form)
  }

  updateReport(form: FormData) {
    return this.http.put(`${environement.BASE_URL}/e-learning/reports`,form)
  }

  deleteReport(idReport: number) {
    return this.http.delete(`${environement.BASE_URL}/e-learning/reports/${idReport}`)
  }

  downloadFile(report: Report): Observable<any> {
    const filePath = "assets/Reports/Report_" + report.id + "/";

    // Map file extensions to corresponding 'Accept' header values
    const acceptHeadersMap: { [extension: string]: string } = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      latex: 'application/x-latex',
      // Add more mappings for other file extensions if needed
    };

    // Get the file extension from the report.image
    const fileExtension = report.file!.split('.').pop()?.toLowerCase();

    // Get the 'Accept' header value based on the file extension
    const acceptHeaderValue = acceptHeadersMap[fileExtension || 'pdf'] || 'application/pdf';

    // Set the 'Accept' header in the HTTP request
    const headers = new HttpHeaders().set('Accept', acceptHeaderValue);

    return this.http.get(filePath + report.file, { headers, responseType: 'arraybuffer' });
  }
}
