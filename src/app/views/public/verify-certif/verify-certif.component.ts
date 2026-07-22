import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/environement/environement.prod';

@Component({
  selector: 'app-verify-certif',
  templateUrl: './verify-certif.component.html',
  styleUrls: ['./verify-certif.component.css']
})
export class VerifyCertifComponent implements OnInit {
  loading = true;
  valid: boolean | null = null;
  info: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.http.get<any>(`${environement.BASE_URL}/certif/verify/${code}`).subscribe({
      next: res => {
        this.valid = res.valid;
        this.info = res;
        this.loading = false;
      },
      error: () => {
        this.valid = false;
        this.loading = false;
      }
    });
  }
}
