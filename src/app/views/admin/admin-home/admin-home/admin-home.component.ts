import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
Chart.register(...registerables);

interface Stats {
  courseName: string;
  courseAttendees: number
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  nbrOfStudents!: number
  nbrOfCoaches!: number
  activatedStudents!: number
  activatedCoaches!: number
  percentageStudents!: number
  percentageCoaches!: number
  stats!: Stats[]

  constructor(
    private us: UserService
  ) {

  }

  ngOnInit() {

    this.us.getNumberOfStudents().subscribe((studentData) => {
      this.nbrOfStudents = studentData;

      this.us.getNUmberOfActivatedStudents().subscribe((activatedStudentData) => {
        this.activatedStudents = activatedStudentData;

        this.percentageStudents = (this.activatedStudents / this.nbrOfStudents) * 100;
        this.percentageStudents = parseFloat(this.percentageStudents.toFixed(2))
      });
    });

    this.us.getNUmberOfActivatedCoaches().subscribe((activatedCoachData) => {
      this.activatedCoaches = activatedCoachData;

      this.us.getNumberOfCoaches().subscribe((coachData) => {
        this.nbrOfCoaches = coachData;

        this.percentageCoaches = (this.activatedCoaches / this.nbrOfCoaches) * 100;
        this.percentageCoaches = parseFloat(this.percentageCoaches.toFixed(2))
      });
    });

    this.us.getTopCourses().subscribe((topCoursesData) => {
      this.stats = topCoursesData

      if(this.stats.length > 0) {
      const labels: string[] = this.stats.map((stat) => {
        if(stat.courseName.length > 10)
          return stat.courseName.slice(0, 9) + "...";
        else
          return stat.courseName
      })

      const data: number[] = this.stats.map(stat => stat.courseAttendees)
      const max: number = Math.max(...data)

      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of inscriptions',
            data: data,
            backgroundColor: [
              '#AF3065',
            ],

            borderRadius: 5,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: max + 2



            }
          }
        }
      });
    }
    })





  }
}
