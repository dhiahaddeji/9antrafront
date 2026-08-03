import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentLeaderboardRoutingModule } from './student-leaderboard-routing.module';
import { StudentLeaderboardComponent } from './student-leaderboard.component';

@NgModule({
  declarations: [StudentLeaderboardComponent],
  imports: [CommonModule, RouterModule, StudentLeaderboardRoutingModule]
})
export class StudentLeaderboardModule {}
