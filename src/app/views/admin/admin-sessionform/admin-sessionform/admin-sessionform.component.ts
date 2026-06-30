import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Formation } from 'src/app/Models/formation.model';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-admin-sessionform',
  templateUrl: './admin-sessionform.component.html',
  styleUrls: [
    './admin-sessionform.component.css',
    '../../../../../assets/css/add_session.css',
  ],
})
export class AdminSessionformComponent implements OnInit {
  //calendar declarations
  currentMonth!: string;
  daysInMonth!: number[];
  dayNames!: string[];
  daysOffset!: number[];
  currentDate!: Date;
  currentYear!: number;
  selectedDay!: number | null;
  sessionTime: string = '';
  sessionDuration: number = 0;
  sessionName!: string;
  sessionDescription!: string;
  selectedGroups: Groups[] = [];
  formations: any[] = [];
  selectedTraining!: number;
  groups: any[] = [];
  sessionDetails: any[] = [];
  @ViewChild('removeDialog') removeDialog!: TemplateRef<any>;

  //end calendar declarations
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formationsService: FormationsService,
    private groupService: GroupService,
    private sessionService: SessionService
  ) { }
  ngOnInit(): void {
    this.getFormations();
    this.loadGroups();
    this.currentDate = new Date();
    this.currentDate.setHours(this.currentDate.getHours() + 1); // Set to UTC+1
    this.updateMonth(this.currentDate);
    this.currentYear = new Date().getFullYear();
  }

  //customized Calendar//
  goToPreviousMonth() {
    const currentMonth = this.getMonthIndex(this.currentMonth);
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear =
      previousMonth === 11
        ? this.currentDate.getFullYear() - 1
        : this.currentDate.getFullYear();

    const previousDate = new Date(previousYear, previousMonth);

    this.updateMonth(previousDate);
    if (previousMonth === 11 && currentMonth === 0) {
      this.currentYear--;
    }
  }

  goToNextMonth() {
    const currentMonth = this.getMonthIndex(this.currentMonth);
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear =
      nextMonth === 0
        ? this.currentDate.getFullYear() + 1
        : this.currentDate.getFullYear();

    const nextDate = new Date(nextYear, nextMonth);
    this.updateMonth(nextDate);
    if (nextMonth === 0 && currentMonth === 11) {
      this.currentYear++;
    }
  }
  private updateMonth(date: Date) {
    this.currentMonth = this.getMonthName(date.getMonth());
    this.daysInMonth = this.getDaysInMonth(date.getFullYear(), date.getMonth());
    this.dayNames = this.getDayNames();
    this.daysOffset = this.getDaysOffset(date.getFullYear(), date.getMonth());
    this.selectedDay = null;
  }
  selectDay(day: number) {
    this.selectedDay = day;
    console.log(day);
    const selectedDate = new Date(
      this.currentYear,
      this.getMonthIndex(this.currentMonth),
      this.selectedDay
    );
    this.fetchSessionDetails(selectedDate);
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
    return monthNames[month];
  }

  private getMonthIndex(monthName: string): number {
    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];

    return monthNames.indexOf(monthName);
  }

  private getDaysInMonth(year: number, month: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array(daysInMonth)
      .fill(0)
      .map((_, index) => index + 1);
  }

  private getDayNames(): string[] {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return dayNames;
  }

  private getDaysOffset(year: number, month: number): number[] {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const daysOffset = Array(firstDay.getDay()).fill(null);

    const pastDaysOffset = daysOffset.map((_, index) => {
      const day = index + 1;
      const date = new Date(year, month, day);
      return date < today ? -day : day;
    });

    return pastDaysOffset;
  }
  calculateDuration(startDate: Date, finishDate: Date): string {
    const start = new Date(startDate);
    const finish = new Date(finishDate);

    const durationMs = finish.getTime() - start.getTime();
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);

    return `${hours} hours ${minutes} min`;
  }
  //end customized Calendar//
  //request and response//
  getFormations(): void {
    this.formationsService.getFormations().subscribe((res: any) => {
      this.formations = res;
      console.log(this.formations);
    });
  }
  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Failed to load groups:', error);
      }
    );
  }
  deleteSession(session: Session): void {
    if (!session || !session.id) {
      console.log('Session ID is undefined.');
      return;
    }

    const dialogRef = this.dialog.open(this.removeDialog, {
      data: session,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.sessionService.deleteSession(session.id!).subscribe(
          () => {
            this.sessionDetails = this.sessionDetails.filter(
              (s) => s.id !== session.id
            );
            this.snackBar.open('Session deleted successfuly', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error) => {
            this.snackBar.open('Error deleting session:${error}', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      }
    });
  }
  createSession() {
    if (this.selectedDay) {
      if (this.selectedGroups.length === 0) {
        this.snackBar.open('Please select one or more groups', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours());
        const sessionTimeParts = this.sessionTime.split(':');
        const sessionHour = parseInt(sessionTimeParts[0], 10);
        const sessionMinute = parseInt(sessionTimeParts[1], 10);
        const selectedDate = new Date(
          this.currentYear,
          this.getMonthIndex(this.currentMonth),
          this.selectedDay,
          sessionHour,
          sessionMinute
        );

        if (selectedDate >= currentDate) {
          const groupIdselected: number[] = this.selectedGroups.map((group) =>
            Number(group.id)
          );

          const selectedDateUTC = new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
          );

          // Convert start and finish dates to the frontend timezone
          const frontendTimezoneOffset = new Date().getTimezoneOffset() * 60000;
          const startDateTimezoneAdjusted = new Date(
            selectedDateUTC.getTime() + frontendTimezoneOffset
          );
          const finishDateTimezoneAdjusted = new Date(
            selectedDateUTC.getTime() +
            this.sessionDuration * 60 * 60 * 1000 +
            frontendTimezoneOffset
          );
          const newFormation: Formation = new Formation();
          newFormation.id = this.selectedTraining;

          const session: Session = {
            sessionName: this.sessionName,
            description: this.sessionDescription,
            startDate: startDateTimezoneAdjusted,
            finishDate: finishDateTimezoneAdjusted,
            groups: this.groups, // Assuming this.groups is an array of Groups objects with the correct structure
            userPresence: {}, // Represents the map of userId to presence status

            // groups: groupIdselected.map((groupId) => ({
            //   id: groupId,
            // })),
            formation: newFormation,
          };

          console.log('selected groups hey', groupIdselected);

          this.sessionService.ajoutSession(session, groupIdselected).subscribe(
            (response) => {
              console.log('Session created:', response);
              this.closeGroupsDialog();
              this.closeSessionDialog();
              this.snackBar.open('Session created successfully', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
              this.fetchSessionDetails(selectedDate);
            },

            (error) => {
              console.error('Failed to create session:', error);
            }
          );
        } else {
          console.error('Please select a future date and time for the session');
        }
      }
    } else {
      console.error('No date selected')
    }
  }
  fetchSessionDetails(selectedDate: Date) {
    const backendTimezone = 'Africa/Tunis';
    const selectedDateUTC = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );
    const backendOffset =
      selectedDate.getTimezoneOffset() - this.currentDate.getTimezoneOffset();
    const adjustedSelectedDate = new Date(
      selectedDateUTC.getTime() - backendOffset * 60000
    );

    this.sessionService.getSessionsByDate(adjustedSelectedDate).subscribe(
      (sessions: Session[]) => {
        this.sessionDetails = sessions;
        console.log(sessions);
        sessions.forEach((session) => {
          console.log('Session object:', session);
          session.groups = [];
          this.fetchGroupsForSession(session);
        });
      },
      (error) => {
        console.error('Failed to fetch session details:', error);
      }
    );
  }

  fetchGroupsForSession(session: Session) {
    console.log('Session groups before mapping:', session.groups);
    const sessionGroupIds: number[] = session.groups
      .map((group) => group.id)
      .filter((id): id is number => id !== undefined);
    console.log('Session group IDs:', sessionGroupIds);

    if (session.id !== undefined) {
      this.groupService.getGroupsBySessionId(session.id).subscribe(
        (groups) => {
          console.log('Fetched groups:', groups);
          session.groups = groups;
        },
        (error) => {
          console.error('Failed to fetch groups for session:', error);
        }
      );
    }
  }
  //end request and response//
  //Dialogs //
  @ViewChild('sessionDialog') sessionDialog!: TemplateRef<any>;
  sessionDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('groupsDialog') groupsDialog!: TemplateRef<any>;
  groupsDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  currentDateTime: string = new Date().toISOString().substring(0, 16);
  confirmationDialogRef!: MatDialogRef<any> | undefined;

  confirmAddSessionToday() {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 2);

    if (this.sessionTime < currentDateTime.toISOString().substring(0, 5)) {
      this.sessionTime = currentDateTime.toISOString().substring(0, 5);
    }

    this.confirmationDialogRef?.close(true);
  }
  openSessionDialog() {
    if (this.formations.length > 0) {
      this.selectedTraining = this.formations[0].id;
    }
    if (this.selectedDay !== null) {
      const selectedDate = new Date(
        this.currentYear,
        this.getMonthIndex(this.currentMonth),
        this.selectedDay
      );
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        this.sessionTime = currentDate.toISOString().substring(11, 16);
        this.sessionDialogRef = this.dialog.open(this.sessionDialog);
      } else if (selectedDate.toDateString() === currentDate.toDateString()) {
        this.confirmationDialogRef = this.dialog.open(this.confirmationDialog);
        this.confirmationDialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.sessionTime = new Date(
              currentDate.getTime() + 2 * 60 * 60 * 1000
            )
              .toISOString()
              .substring(11, 16);
            this.sessionDialogRef = this.dialog.open(this.sessionDialog);
          }
        });
      } else {
        this.snackBar.open(
          'Please select a future date for the session',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    } else {
      this.snackBar.open('Please select a date first', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
  selectGroup(group: Groups) {
    const index = this.selectedGroups.findIndex((g) => g.id === group.id);
    if (index !== -1) {
      this.selectedGroups.splice(index, 1);
    } else {
      this.selectedGroups.push(group);
    }
  }
  isGroupSelected(group: Groups): boolean {
    return this.selectedGroups.some((g) => g.id === group.id);
  }

  openGroupsDialog() {
    if (!this.sessionName || !this.sessionDescription) {
      this.snackBar.open(
        'Please enter a name and description for the session',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
      return;
    }
    if (!this.sessionDuration || this.sessionDuration <= 0) {
      this.snackBar.open(
        'Please enter a valid duration for the session minimum is 1 hour',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
      return;
    }
    if (this.selectedTraining) {
      console.log('Selected Training ID:', this.selectedTraining);
      console.log('Formations:', this.formations);
      const selectedTraining = this.formations.find(
        (formation) => formation.id === Number(this.selectedTraining)
      );

      if (selectedTraining) {
        this.groupService.getGroupsByFormation(selectedTraining.id).subscribe(
          (groups) => {
            this.groups = groups;
            this.groupsDialogRef = this.dialog.open(this.groupsDialog);
            console.log(groups);
          },
          (error) => {
            console.error('Failed to load groups:', error);
          }
        );
      } else {
        console.error('Invalid training selected');
      }
    } else {
      console.error('No training selected');
    }
  }
  getSelectedTrainingName() {
    const selectedTraining = this.formations.find(
      (formation) => formation.id === Number(this.selectedTraining)
    );
    return selectedTraining ? selectedTraining.nomFormation : '';
  }
  closeSessionDialog(): void {
    this.sessionDialogRef?.close();
  }

  closeGroupsDialog(): void {
    this.selectedGroups = [];
    this.groupsDialogRef?.close();
    this.selectedGroups = [];
  }

  cancelAddSessionToday() {
    this.confirmationDialogRef?.close();
  }
}
