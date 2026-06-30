import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Groups } from 'src/app/Models/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminGroupmembersComponent } from '../../admin-groupmembers/admin-groupmembers/admin-groupmembers.component';
import { MatDialog } from '@angular/material/dialog';
import { CertificatService } from 'src/app/MesServices/Certificat/certificat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css'],
})
export class AdminGroupsComponent implements OnInit {
  @ViewChild('staticBackdrop1') createGroupModalRef!: ElementRef;
  
  formations: any[] = [];
  tabCoach: any = [];
  taballusers: any = [];
  groups: Groups = new Groups();
  myForm: FormGroup;
  groupCreationSuccess = false;
  groupCreationError = false;
  allGroups: any[] = [];
  showCreateModal = false;
  openMenuId: number | null = null;
  
  // Pour la sélection des étudiants
  availableStudents: any[] = [];
  selectedStudents: any[] = [];
  currentGroupId: number | null = null;
  showStudentSelectionModal = false;

  constructor(
    private formationsService: FormationsService,
    private sr: UserService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.myForm = this.fb.group({
      formationId: ['', Validators.required],
      groupName: ['', Validators.required],
      formateurId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.getFormations();
    this.getallCoach();
    this.groupService.groupData$.subscribe((groups) => {
      this.allGroups = groups;
    });
  }

  openCreateGroupModal(): void {
    this.myForm.reset();
    const modalEl = document.getElementById('staticBackdrop1');
    if (modalEl) {
      const MdbModal = (window as any).mdb?.Modal ?? (window as any).bootstrap?.Modal;
      if (MdbModal) new MdbModal(modalEl, { backdrop: 'static', keyboard: false }).show();
    }
  }

  closeCreateGroupModal(): void {
    const modalEl = document.getElementById('staticBackdrop1');
    if (modalEl) {
      const MdbModal = (window as any).mdb?.Modal ?? (window as any).bootstrap?.Modal;
      const instance = MdbModal?.getInstance(modalEl);
      if (instance) instance.hide();
    }
  }
  openGroupMembersDialog(groupId: number) {
    const dialogRef = this.dialog.open(AdminGroupmembersComponent, {
      data: { groupId: groupId },
    });
  }

  getFormations(): void {
    this.formationsService.getFormations().subscribe(
      (res: any) => {
        this.formations = res || [];
        console.log('Formations loaded:', this.formations);
        if (this.formations.length === 0) {
          console.warn('No formations available');
        }
      },
      (error) => {
        console.error('Error loading formations:', error);
        this.snackBar.open('Error loading formations', 'Close', { duration: 3000 });
      }
    );
  }

  getallCoach() {
    this.sr.getAllUsers().subscribe(
      (res) => {
        this.taballusers = res || [];
        this.tabCoach = this.taballusers.filter(
          (user: { roles: any[]; enabled: number }) => {
            return (
              user.roles.some((role) => role.name === 'FORMATEUR') &&
              user.enabled === 1
            );
          }
        );
        console.log('Coaches loaded:', this.tabCoach);
        if (this.tabCoach.length === 0) {
          console.warn('No coaches available');
        }
      },
      (error) => {
        console.error('Error loading coaches:', error);
        this.snackBar.open('Error loading coaches', 'Close', { duration: 3000 });
      }
    );
  }

  toggleMenu(groupId: number): void {
    this.openMenuId = this.openMenuId === groupId ? null : groupId;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  createGroup(): void {
    console.log('createGroup called');
    console.log('Form valid:', this.myForm.valid);
    console.log('Form value:', this.myForm.value);
    
    if (this.myForm.valid) {
      this.groups = new Groups();
      this.groups.creationDate = new Date();
      this.groups.groupName = this.myForm.get('groupName')?.value;
      this.groups.period = '';
      this.groups.formation = {
        id: this.myForm.get('formationId')?.value,
      };
      this.groups.formateur = {
        id: this.myForm.get('formateurId')?.value,
      };

      console.log('Sending group data:', this.groups);

      this.groupService.addGroups(this.groups).subscribe(
        (response) => {
          this.myForm.reset();
          this.getAllGroups();
          this.closeCreateGroupModal();
          this.snackBar.open('Group created successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        },
        (error) => {
          console.error('Error creating group:', error);
          this.snackBar.open('Error creating group', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      console.warn('Form is invalid');
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  confirmDeleteGroup(groupId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this group.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGroup(groupId);
      }
    });
  }

  deleteGroup(groupId: number): void {
    this.groupService.deleteGroups(groupId).subscribe(
      () => {
        this.getAllGroups();
        Swal.fire('Deleted!', 'The group has been deleted.', 'success');
      },
      (error) => {
        console.error('Error deleting group:', error);
        Swal.fire(
          'Error',
          'An error occurred while deleting the group.',
          'error'
        );
      }
    );
  }

  getAllGroups(): void {
    this.groupService.getAllGroups().subscribe(
      (groups) => {
        this.allGroups = groups || [];
        console.log('Groups loaded:', this.allGroups);
      },
      (error) => {
        console.error('Error loading groups:', error);
        this.snackBar.open('Error loading groups', 'Close', { duration: 3000 });
      }
    );
  }

  getStudentImages(groupId: number): string[] {
    const group = this.allGroups.find((g) => g.id === groupId);
    if (!group || !group.etudiants) {
      return [];
    }

    const studentImages: string[] = [];

    for (const student of group.etudiants.slice(0, 3)) {
      studentImages.push(student.image);
    }

    return studentImages;
  }

  addStudentsToGroup(groupId: number): void {
    this.currentGroupId = groupId;
    this.selectedStudents = [];
    
    // Récupère les étudiants disponibles pour ce groupe
    this.groupService.getAvailableStudents(groupId).subscribe(
      (students: any[]) => {
        this.availableStudents = students || [];
        this.showStudentSelectionModal = true;
        console.log('Available students:', this.availableStudents);
        if (this.availableStudents.length === 0) {
          Swal.fire('Info', 'No available students to add to this group', 'info');
          this.showStudentSelectionModal = false;
        }
      },
      (error: any) => {
        console.error(error);
        Swal.fire('Error', 'Could not load available students', 'error');
      }
    );
  }

  toggleStudentSelection(student: any): void {
    const index = this.selectedStudents.findIndex(s => s.id === student.id);
    if (index > -1) {
      this.selectedStudents.splice(index, 1);
    } else {
      this.selectedStudents.push(student);
    }
  }

  isStudentSelected(student: any): boolean {
    return this.selectedStudents.some(s => s.id === student.id);
  }

  confirmAddStudents(): void {
    if (this.selectedStudents.length === 0) {
      Swal.fire('Warning', 'Please select at least one student', 'warning');
      return;
    }

    const studentIds = this.selectedStudents.map(s => s.id);
    
    if (this.currentGroupId) {
      this.groupService.addStudentsToGroup(this.currentGroupId, studentIds).subscribe(
        (response: any) => {
          Swal.fire('Success!', response, 'success');
          this.closeStudentSelectionModal();
          this.getAllGroups();
        },
        (error: any) => {
          console.error(error);
          Swal.fire('Error', 'Could not add students to group', 'error');
        }
      );
    }
  }

  closeStudentSelectionModal(): void {
    this.showStudentSelectionModal = false;
    this.selectedStudents = [];
    this.availableStudents = [];
    this.currentGroupId = null;
  }
}
