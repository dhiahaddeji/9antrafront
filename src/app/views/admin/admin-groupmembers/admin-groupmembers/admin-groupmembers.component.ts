import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CertificatService } from 'src/app/MesServices/Certificat/certificat.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Certificat } from 'src/app/Models/Certificat';
import { Students } from 'src/app/Models/Students';
import { Groups } from 'src/app/Models/group.model';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-groupmembers',
  templateUrl: './admin-groupmembers.component.html',
  styleUrls: [
    './admin-groupmembers.component.css',
    '../../../../../assets/css/groupmembers.css',
  ],
})
export class AdminGroupmembersComponent implements OnInit {
  group!: Groups;
  groups!: Groups[];
  students!: any[];
  studentsOfGroup!: any[];
  usernameFilter: string = '';
  studentDetails: any[] = [];
  userIdRemove!: number;
  allGroups: any[] = [];
  taballusers: any = [];
  tabStudent: any = [];
  tabFormation: any = [];
  Formation = '';
  status = '';
  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;
  addUserDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  confirmationDialogRef: MatDialogRef<any> | undefined;
  @ViewChild('confirmationDeleteDialog')
  confirmationDeleteDialog!: TemplateRef<any>;
  confirmationDeleteDialogRef: MatDialogRef<any> | undefined;
  @ViewChild('addcertif') addcertif!: TemplateRef<any>;
  addcertifRef!: MatDialogRef<any> | undefined;
  @ViewChild('updatecertif') updatecertif!: TemplateRef<any>;
  updatecertifRef!: MatDialogRef<any> | undefined;
  @ViewChild('addcertifNo') addcertifNo!: TemplateRef<any>;
  addcertifNoRef!: MatDialogRef<any> | undefined;
  @ViewChild('confirmationCertif') confirmationCertif!: TemplateRef<any>;
  confirmationCertifRef!: MatDialogRef<any> | undefined;
  @ViewChild('nouser') nouser!: TemplateRef<any>;
  nouserRef!: MatDialogRef<any> | undefined;

  @ViewChild('deleteConfirmationDialog')
  deleteConfirmationDialog!: TemplateRef<any>;
  deleteConfirmationDialogRef!: MatDialogRef<any> | undefined;
  certificatesGenerated = false;
  groupId!: number;
  newPeriode!: string;
  newMonth!: string;
  certificateForm: FormGroup;

  sessionClosed = false;
  showCloseSessionDialog = false;
  closeMonth = '';
  isClosing = false;
  closeResult: any = null;
  monthOptions = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number },
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private dialog: MatDialog,
    private sr: UserService,
    private fr: FormationsService,
    private certificateService: CertificatService,
    private formBuilder: FormBuilder
  ) {
    this.certificateForm = this.formBuilder.group({
      month: '',
      periode: '',
    });
  }
  showAddCertifNoDialog: boolean = false;

  cer!: Certificat;
  // Pre-fill the other form fields with the existing project data

  openModifyCertifDialog(): void {
    this.updatecertifRef = this.dialog.open(this.updatecertif);
  }

  openConfirmationCertifDialog(): void {
    this.confirmationCertifRef = this.dialog.open(this.confirmationCertif, {
      width: '400px', // Set the desired width
    });
    this.confirmationCertifRef.afterClosed().subscribe((result) => {
      // Perform actions based on user interaction
      if (result) {
        this.showAddCertifNoDialog = true;
        window.location.reload();
        // Additional logic after user clicks "OK" in confirmationCertif
      }
    });
  }

  onConfirmationCertifOKClick(): void {
    // Close the dialog
    this.confirmationCertifRef?.close();

    // Reload the page
    window.location.reload();
  }

  openAddUserDialog(groupId: number): void {
    this.group.id = groupId;
    console.log(this.group.id);
    this.addUserDialogRef = this.dialog.open(this.addUserDialog);
  }
  openBottomSheet(): void {
    this.nouserRef = this.dialog.open(this.nouser);
  }

  openAddCertifDialog(groupId: number): void {
    if (this.group.etudiants?.length === 0) {
      this.openBottomSheet();
    } else if (this.group.certificatesGenerated) {
      this.addcertifRef = this.dialog.open(this.addcertifNo);
    } else {
      this.group.id = groupId;
      console.log(this.group.id);
      this.addcertifRef = this.dialog.open(this.addcertif);
    }
  }

  closeAddUserDialog(): void {
    this.addUserDialogRef?.close();
  }
  closeCertiDialog(): void {
    this.addcertifRef?.close();
  }
  openDeleteConfirmationDialog(groupId: number): void {
    this.deleteConfirmationDialogRef = this.dialog.open(
      this.deleteConfirmationDialog
    );
    this.deleteConfirmationDialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.deleteCertificates(groupId);
        window.location.reload();
      }
    });
  }

  modifyCertificates(): void {
    if (this.certificateForm.valid) {
      const formData = new FormData();
      formData.append('periode', this.certificateForm.value.periode); // Use form value
      formData.append('month', this.certificateForm.value.month); // Use form value
      this.certificateService.update(this.group.id, formData).subscribe(
        (response) => {
          console.log('Certificates modified successfully:', response);
          // Add any additional logic or notifications here
        },
        (error) => {
          console.error('Error modifying certificates:', error);
          this.openConfirmationCertifDialog();
          // Handle error, show error message, etc.
        }
      );
    }
  }

  // Function to delete certificates
  deleteCertificates(groupId: number): void {
    this.certificateService.deleteCertificatesForGroup(groupId).subscribe(
      () => {
        console.log('Certificates deleted successfully');
        // Additional logic or notifications here
      },
      (error) => {
        console.error('Error deleting certificates:', error);
        // Handle error, show error message, etc.
      }
    );
  }

  openCloseSessionDialog(): void {
    this.closeMonth = '';
    this.closeResult = null;
    this.showCloseSessionDialog = true;
  }

  confirmCloseSession(): void {
    if (!this.closeMonth) return;
    this.isClosing = true;
    this.certificateService.closeGroupSession(this.group.id, this.closeMonth).subscribe({
      next: (res) => {
        this.closeResult = res;
        this.sessionClosed = true;
        this.isClosing = false;
        this.fetchGroupMembers();
      },
      error: (err) => {
        console.error('Error closing session:', err);
        this.isClosing = false;
        this.closeResult = { error: err.error || 'Failed to close session' };
      }
    });
  }

  ngOnInit(): void {
    const groupId = this.data.groupId;
    this.fetchGroupMembers();
    this.getAllStudents();
    this.getAllFormation();
    this.certificateService.getGroupStatus(groupId).subscribe({
      next: (status) => { this.sessionClosed = status.sessionClosed; },
      error: () => {}
    });

    // Pre-fill certificate form fields
    this.loadCertificateValues(groupId);
    this.certificateService.getCertificateValuesByGroupId(groupId).subscribe(
      (certificat) => {
        this.certificateForm.patchValue({
          month: certificat.month,
          periode: certificat.periode,
        });
      },
      (error) => {
        console.error('Error loading certificate values:', error);
      }
    );
  }

  loadCertificateValues(groupId: number): void {
    this.certificateService.getCertificateValuesByGroupId(groupId).subscribe(
      (certificat) => {
        this.cer = certificat;

        // Pre-fill the certificate form fields with retrieved data
        this.certificateForm.patchValue({
          month: certificat.month,
          periode: certificat.periode,
        });
      },
      (error) => {
        console.error('Error loading certificate values:', error);
      }
    );
  }

  getAllFormation() {
    this.fr.getFormations().subscribe((res) => {
      this.tabFormation = res;
      console.log(this.tabFormation);
    });
  }
  getfilts() {
    this.sr
      .getFormationByTypeFormationAndStatus(this.Formation, this.status)
      .subscribe((res) => {
        this.tabStudent = res;
        console.log(this.tabStudent);
      });
  }
  getStudentFullname(userId: number): string {
    const student = this.studentDetails.find(
      (student) => student.id === userId
    );
    return student ? `${student.firstName} ${student.lastName}` : '';
  }
  fetchGroupMembers(): void {
    console.log(this.data.groupId);
    this.groupService.getGroupsById(this.data.groupId).subscribe(
      (group) => {
        this.group = group;
        if (group.etudiants) {
          this.studentsOfGroup = group.etudiants.map((etudiant) => etudiant.id);
          this.studentDetails = [];
          this.studentsOfGroup.forEach((studentId: number) => {
            this.userService.getUserById(studentId).subscribe(
              (student) => {
                console.log(student);
                this.studentDetails.push(student);
              },
              (error) => {
                console.error('Error retrieving student details:', error);
              }
            );
          });
        }
      },
      (error) => {
        console.error('Error retrieving group members:', error);
      }
    );
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().subscribe((groups) => {
      this.allGroups = groups;
    });
  }
  getAllStudents() {
    this.userService.getAllUsers().subscribe((res) => {
      this.taballusers = res;
      console.log(this.taballusers);
      this.students = this.taballusers.filter(
        (user: { roles: any[]; enabled: number }) => {
          return (
            user.roles.some((role) => role.name === 'ETUDIANT') &&
            user.enabled === 1
          );
        }
      );

      console.log(this.students);
    });
  }
  /*getAllStudents(): void {
    this.userService.getAllUsers().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }*/
  get filteredStudents() {
    if (this.usernameFilter.trim() === '') {
      console.log(this.students);
      
      return this.students.filter(
        (student) =>
          !this.group.etudiants?.some((etudiant) => etudiant.id === student.id)
      );
    } else {
      const filterNames = this.usernameFilter.trim().toLowerCase().split(' ');

      return this.students.filter((student) => {
        const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`;
        return (
          filterNames.every((name) => fullName.includes(name)) &&
          !this.group.etudiants?.some((etudiant) => etudiant.id === student.id)
        );
      });
    }
  }
  userd!: string;
  addUserToGroup(groupId: number, userId: number) {
    const group = this.group;
    if (!group) {
      console.error('Group not found');
      return;
    }

    if (group.etudiants?.some((etudiant) => etudiant.id === userId)) {
      this.snackBar.open('User already exists in the group', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    this.groupService.addEtudiantToGroup(groupId, userId).subscribe(
      (response) => {
        if (typeof response === 'string') {
          // Handle success message
          console.log(response);
          this.snackBar.open(response, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          group.etudiants?.push({ id: userId, username: this.userd });
          console.log(this.userd);
          this.fetchGroupMembers();
          this.groupService.getAllGroups().subscribe((groups) => {
            this.groupService.updateGroupData(groups);
          });
        } else {
          // Handle other response data if needed
        }
      },
      (error) => {
        console.error('Error adding user to group:', error);
      }
    );
  }
  removeUserFromGroup(groupId: number, userId: number) {
    this.userIdRemove = userId;
    this.groupService.removeEtudiantFromGroup(groupId, userId).subscribe(
      (response: any) => {
        console.log('User removed from group successfully');
        this.fetchGroupMembers();
        this.groupService.getAllGroups().subscribe((groups) => {
          this.groupService.updateGroupData(groups);
        });
      },
      (error) => {
        console.error('Error removing user from group:', error.error);
      }
    );
  }
  openConfirmationDialog(groupId: number, userId: number): void {
    this.userIdRemove = userId;
    this.confirmationDialogRef = this.dialog.open(this.confirmationDialog);

    this.confirmationDialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.removeUserFromGroup(groupId, userId);
      }
    });
  }

  onConfirm(): void {
    this.confirmationDeleteDialogRef?.close(true);
  }

  onCancel(): void {
    this.confirmationDeleteDialogRef?.close(false);
  }
  cancelDelete(): void {
    this.confirmationDialogRef?.close();
  }
  cancelDeleteCer(): void {
    this.deleteConfirmationDialogRef?.close();
  }
  confirmDelete(): void {
    this.confirmationDialogRef?.close('confirm');
  }
  certif: Certificat = new Certificat();
  generateCertificates(groupId: number, month: string, periode: string): void {
    this.certificateService
      .genererCertificatForGroup(groupId, month, periode)
      .subscribe(
        () => {
          console.log('Certificates generated successfully');
          // Handle any success actions, such as showing a success message
        },
        (error) => {
          console.error('Error generating certificates:', error);
          // Handle any error actions, such as showing an error message
        }
      );
  }
  isLoading = false;

  saveCertif() {
    this.isLoading = true;

    const formData = new FormData();
    formData.append('periode', this.certif.periode);
    formData.append('month', this.certif.month);

    this.certificateService.create(this.group.id, formData).subscribe(
      (data) => {
        console.log(data);

        this.certif = new Certificat();
        this.isLoading = false; // Disable loading state after completion

        // After generating certificates
        this.openConfirmationCertifDialog();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      },
      (error) => {
        console.log(error);
        this.isLoading = false; // Disable loading state in case of error
      }
    );
  }
  isValidCertif(): boolean {
    return this.certif.month !== undefined && this.certif.periode !== undefined;
  }

  saveCertifu() {
    if (!this.isValidCertif()) {
      console.error('Invalid certificate data');
      return;
    }

    const formData = new FormData();
    formData.append('periode', this.certif.periode);
    formData.append('month', this.certif.month);

    this.certificateService.create(this.group.id, formData).subscribe(
      (data) => {
        console.log(data);
        this.certif = new Certificat();
      },
      (error) => console.error(error)
    );
  }
}
