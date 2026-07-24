import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

interface Stats {
  courseName: string;
  courseAttendees: number;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  nbrOfStudents = 0;
  nbrOfCoaches = 0;
  activatedStudents = 0;
  activatedCoaches = 0;
  percentageStudents = 0;
  percentageCoaches = 0;
  stats: Stats[] = [];
  loading = true;
  error = '';

  constructor(private us: UserService) {}

  ngOnInit() {
    forkJoin({
      students:          this.us.getNumberOfStudents(),
      activatedStudents: this.us.getNUmberOfActivatedStudents(),
      coaches:           this.us.getNumberOfCoaches(),
      activatedCoaches:  this.us.getNUmberOfActivatedCoaches(),
      topCourses:        this.us.getTopCourses(),
    }).subscribe({
      next: (data) => {
        this.nbrOfStudents     = data.students;
        this.activatedStudents = data.activatedStudents;
        this.nbrOfCoaches      = data.coaches;
        this.activatedCoaches  = data.activatedCoaches;

        this.percentageStudents = data.students > 0
          ? parseFloat(((data.activatedStudents / data.students) * 100).toFixed(1)) : 0;
        this.percentageCoaches = data.coaches > 0
          ? parseFloat(((data.activatedCoaches / data.coaches) * 100).toFixed(1)) : 0;

        this.stats = data.topCourses;
        this.loading = false;

        if (this.stats.length > 0) {
          this.renderChart();
        }
      },
      error: (err) => {
        console.error('Dashboard load error:', err);
        this.error = 'Could not load dashboard data.';
        this.loading = false;
      }
    });
  }

  private renderChart() {
    const labels = this.stats.map(s =>
      s.courseName.length > 10 ? s.courseName.slice(0, 9) + '…' : s.courseName
    );
    const data = this.stats.map(s => s.courseAttendees);
    const max  = Math.max(...data);

    import('chart.js').then(({ Chart, registerables }) => {
      Chart.register(...registerables);
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      if (!canvas) return;
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Number of inscriptions',
            data,
            backgroundColor: ['#AF3065'],
            borderRadius: 5,
            borderWidth: 1
          }]
        },
        options: { scales: { y: { min: 0, max: max + 2 } } }
      });
    });
  }
}
