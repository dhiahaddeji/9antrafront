import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environement } from 'src/environement/environement.prod';

@Injectable({ providedIn: 'root' })
export class RankingService {
  private base = environement.BASE_URL;

  constructor(private http: HttpClient) {}

  getUserXP(userId: number) {
    return this.http.get<any>(`${this.base}/xp/user/${userId}`).pipe(catchError(() => of(null)));
  }

  getUserBadges(userId: number) {
    return this.http.get<any[]>(`${this.base}/xp/badges/${userId}`).pipe(catchError(() => of([])));
  }

  getLeaderboard() {
    return this.http.get<any[]>(`${this.base}/xp/leaderboard`).pipe(catchError(() => of([])));
  }

  recordQuizResult(payload: { userId: number; quizId: number; score: number; correct: number; total: number }) {
    return this.http.post<any>(`${this.base}/xp/quiz-result`, payload).pipe(catchError(() => of(null)));
  }

  recordChapterComplete(userId: number, chapterId: number) {
    return this.http.post<any>(`${this.base}/xp/chapter-complete`, { userId, chapterId }).pipe(catchError(() => of(null)));
  }

  recordFormationComplete(userId: number, formationId: number, category: string) {
    return this.http.post<any>(`${this.base}/xp/formation-complete`, { userId, formationId, category }).pipe(catchError(() => of(null)));
  }

  recordFeedbackGiven(userId: number, feedbackId: number) {
    return this.http.post<any>(`${this.base}/xp/feedback-given`, { userId, feedbackId }).pipe(catchError(() => of(null)));
  }

  recordCertificateEarned(userId: number, certificateId: number) {
    return this.http.post<any>(`${this.base}/xp/certificate-earned`, { userId, certificateId }).pipe(catchError(() => of(null)));
  }

  getRankColor(rank: string): string {
    const map: Record<string, string> = {
      BRONZE: '#cd7f32', SILVER: '#a8a9ad', GOLD: '#ffd700',
      PLATINUM: '#e5e4e2', ELITE: '#AF3065'
    };
    return map[rank] || '#cd7f32';
  }

  getRankIcon(rank: string): string {
    const map: Record<string, string> = {
      BRONZE: '🥉', SILVER: '🥈', GOLD: '🥇', PLATINUM: '💎', ELITE: '👑'
    };
    return map[rank] || '🥉';
  }

  getNextRankXP(rank: string): number {
    const map: Record<string, number> = {
      BRONZE: 200, SILVER: 500, GOLD: 1000, PLATINUM: 2500, ELITE: 2500
    };
    return map[rank] || 200;
  }

  getProgress(totalXp: number, rank: string): number {
    const thresholds: Record<string, number> = {
      BRONZE: 0, SILVER: 200, GOLD: 500, PLATINUM: 1000, ELITE: 2500
    };
    const nextThresholds: Record<string, number> = {
      BRONZE: 200, SILVER: 500, GOLD: 1000, PLATINUM: 2500, ELITE: 2500
    };
    const current = thresholds[rank] || 0;
    const next = nextThresholds[rank] || 2500;
    if (rank === 'ELITE') return 100;
    return Math.min(100, Math.round(((totalXp - current) / (next - current)) * 100));
  }
}
