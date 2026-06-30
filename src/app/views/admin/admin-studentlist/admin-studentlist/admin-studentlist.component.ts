import { Component, OnInit } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-studentlist',
  templateUrl: './admin-studentlist.component.html',
  styleUrls: ['./admin-studentlist.component.css'],
})
export class AdminStudentlistComponent implements OnInit {
  taballusers: any = [];
  tabStudent: any = [];
  tabFormation: any = [];
  Formation = "";
  status = "";

  newStudent = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    numeroTel: '',
    typeFormation: '',
    country: '',
  };
  addStudentError = '';
  addStudentSuccess = '';
  isSubmitting = false;

  constructor(private sr: UserService, private fr: FormationsService) {}

  getfilts() {
    this.sr
      .getFormationByTypeFormationAndStatus(this.Formation, this.status)
      .subscribe((res) => {
        this.tabStudent = res;
      });
  }
  reset(){
    this.Formation=""
    this.status=""
  }
  getAllFormation() {
    this.fr.getFormations().subscribe((res) => {
      this.tabFormation = res;
    });
  }
  getallStudent() {
    this.sr.getAllUsers().subscribe((res) => {
      this.taballusers = res;
      this.tabStudent = this.taballusers.filter((user: { roles: any[] }) => {
        return user.roles.some((role) => role.name === 'ETUDIANT');
      });
    });
  }
  ngOnInit(): void {
    this.getallStudent();
    this.getAllFormation();
  }
  idUser!: Number;

  getId(id: any) {
    this.idUser = id;
  }

  updateEnable(enabled: any) {
    this.sr.updateEnabeld(this.idUser, enabled).subscribe((res) => {
      this.getallStudent();
    });
  }

  openAddStudentModal() {
    this.resetNewStudentForm();
    const modalEl = document.getElementById('addStudentModal');
    if (modalEl) {
      const MdbModal = (window as any).mdb?.Modal ?? (window as any).bootstrap?.Modal;
      if (MdbModal) {
        new MdbModal(modalEl, { backdrop: 'static', keyboard: false }).show();
      }
    }
  }

  closeAddStudentModal() {
    const modalEl = document.getElementById('addStudentModal');
    if (modalEl) {
      const MdbModal = (window as any).mdb?.Modal ?? (window as any).bootstrap?.Modal;
      const instance = MdbModal?.getInstance(modalEl);
      if (instance) instance.hide();
    }
  }

  resetNewStudentForm() {
    this.newStudent = { firstName: '', lastName: '', username: '', password: '', numeroTel: '', typeFormation: '', country: '' };
    this.addStudentError = '';
    this.addStudentSuccess = '';
    this.isSubmitting = false;
  }

  addStudent() {
    this.addStudentError = '';
    this.addStudentSuccess = '';
    if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.username || !this.newStudent.password) {
      this.addStudentError = 'Please fill in all required fields.';
      return;
    }
    this.isSubmitting = true;
    this.sr.signup(this.newStudent).subscribe(
      (res: any) => {
        this.isSubmitting = false;
        if (typeof res === 'string' && res.includes('already used')) {
          this.addStudentError = 'This email is already registered.';
        } else {
          this.addStudentSuccess = 'Student added successfully!';
          this.getallStudent();
          setTimeout(() => {
            this.closeAddStudentModal();
            this.resetNewStudentForm();
          }, 1500);
        }
      },
      (err: any) => {
        this.isSubmitting = false;
        this.addStudentError = err?.error?.message || 'Failed to add student. Please try again.';
      }
    );
  }
}
