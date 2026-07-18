import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/environement/environement.dev';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-account',
  templateUrl: './admin-create-account.component.html',
  styleUrls: ['./admin-create-account.component.css']
})
export class AdminCreateAccountComponent implements OnInit {
  activeTab: 'accounts' | 'create' = 'accounts';
  createTab: 'admin' | 'coach' | 'student' = 'admin';
  isLoading = false;
  searchTerm = '';

  private base = environement.BASE_URL;

  allUsers: any[] = [];
  roleOptions = ['ADMINISTRATEUR', 'FORMATEUR', 'ETUDIANT'];

  admin = { firstName: '', lastName: '', email: '', password: '', phone: '' };
  coach = { firstName: '', lastName: '', email: '', password: '', phone: '', skills: '', linkedin: '', github: '', country: '', typeFormation: '' };
  coachCvFile: File | null = null;
  student = { firstName: '', lastName: '', email: '', password: '', phone: '', country: '', typeFormation: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.http.get<any[]>(`${this.base}/user/all`).subscribe({
      next: (users) => this.allUsers = users,
      error: () => {}
    });
  }

  get filteredUsers() {
    const q = this.searchTerm.toLowerCase();
    if (!q) return this.allUsers;
    return this.allUsers.filter(u =>
      (u.firstName + ' ' + u.lastName + ' ' + u.username).toLowerCase().includes(q)
    );
  }

  getRoleName(user: any): string {
    if (!user.roles?.length) return '—';
    return user.roles.map((r: any) => r.name).join(', ');
  }

  getRoleBadgeClass(user: any): string {
    const role = user.roles?.[0]?.name || '';
    if (role === 'ADMINISTRATEUR') return 'badge-admin';
    if (role === 'FORMATEUR') return 'badge-coach';
    return 'badge-student';
  }

  toggleEnabled(user: any) {
    const newVal = user.enabled === 1 ? 0 : 1;
    this.http.get(`${this.base}/user/changeEnabledUser/${user.id}`).subscribe({
      next: () => { user.enabled = newVal; },
      error: () => Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update status' })
    });
  }

  changeRole(user: any, newRole: string) {
    this.http.put(`${this.base}/user/change-role/${user.id}`, { role: newRole }).subscribe({
      next: () => {
        user.roles = [{ name: newRole }];
        Swal.fire({ icon: 'success', title: 'Role updated', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      },
      error: (err) => Swal.fire({ icon: 'error', title: 'Error', text: err.error?.message || 'Failed to change role' })
    });
  }

  onCvSelected(e: any) {
    if (e.target.files.length > 0) this.coachCvFile = e.target.files[0];
  }

  createAdmin() {
    if (!this.admin.firstName || !this.admin.email || !this.admin.password) return;
    this.isLoading = true;
    this.http.post(`${this.base}/auth/create-admin`, {
      firstName: this.admin.firstName, lastName: this.admin.lastName,
      username: this.admin.email, password: this.admin.password, phone: this.admin.phone
    }).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Admin created', text: this.admin.email });
        this.admin = { firstName: '', lastName: '', email: '', password: '', phone: '' };
        this.loadUsers();
      },
      error: (err) => { this.isLoading = false; Swal.fire({ icon: 'error', title: 'Error', text: err.error?.message || 'Failed' }); }
    });
  }

  createCoach() {
    if (!this.coachCvFile) { Swal.fire({ icon: 'warning', title: 'CV required', text: 'Please upload a CV file.' }); return; }
    this.isLoading = true;
    const fd = new FormData();
    fd.append('firstName', this.coach.firstName);
    fd.append('lastName', this.coach.lastName);
    fd.append('username', this.coach.email);
    fd.append('password', this.coach.password);
    fd.append('numeroTel', this.coach.phone);
    fd.append('skills', this.coach.skills);
    fd.append('Linkedin', this.coach.linkedin);
    fd.append('Github', this.coach.github);
    fd.append('country', this.coach.country);
    fd.append('typeFormation', this.coach.typeFormation);
    fd.append('CV', this.coachCvFile);
    this.http.post(`${this.base}/auth/signup`, fd).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Coach created', text: `${this.coach.email} — awaiting activation.` });
        this.coach = { firstName: '', lastName: '', email: '', password: '', phone: '', skills: '', linkedin: '', github: '', country: '', typeFormation: '' };
        this.coachCvFile = null;
        this.loadUsers();
      },
      error: (err) => { this.isLoading = false; Swal.fire({ icon: 'error', title: 'Error', text: err.error?.message || 'Failed' }); }
    });
  }

  createStudent() {
    if (!this.student.firstName || !this.student.email || !this.student.password) return;
    this.isLoading = true;
    this.http.post(`${this.base}/auth/create-student`, {
      firstName: this.student.firstName, lastName: this.student.lastName,
      username: this.student.email, password: this.student.password,
      phone: this.student.phone, country: this.student.country, typeFormation: this.student.typeFormation
    }).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Student created', text: this.student.email });
        this.student = { firstName: '', lastName: '', email: '', password: '', phone: '', country: '', typeFormation: '' };
        this.loadUsers();
      },
      error: (err) => { this.isLoading = false; Swal.fire({ icon: 'error', title: 'Error', text: err.error?.message || 'Failed' }); }
    });
  }
}
