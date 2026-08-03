import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/MesServices/Ranking/ranking.service';

@Component({
  selector: 'app-student-leaderboard',
  templateUrl: './student-leaderboard.component.html',
  styleUrls: ['./student-leaderboard.component.css']
})
export class StudentLeaderboardComponent implements OnInit {
  leaderboard: any[] = [];
  loading = true;
  currentUserId: number = 0;

  constructor(public rankingService: RankingService) {}

  ngOnInit(): void {
    this.currentUserId = parseInt(localStorage.getItem('id') || '0', 10);
    this.rankingService.getLeaderboard().subscribe(data => {
      this.leaderboard = data || [];
      this.loading = false;
    });
  }

  trackById(_: number, item: any) { return item.userId; }
}
