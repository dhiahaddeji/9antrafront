import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-generate-certif',
  templateUrl: './generate-certif.component.html',
  styleUrls: ['./generate-certif.component.css']
})
export class GenerateCertifComponent implements OnInit {
  activeTab: 'generate' | 'manage' = 'generate';

  // ── Generate tab ──
  certifForm: FormGroup;
  showThankYouPopup = false;
  isLoading = false;
  errorMessage = '';

  predefinedPeriods = ['1 month','2 months','3 months','4 months','5 months','6 months','1 year'];
  monthOptions = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  allStudents: any[] = [];
  filteredStudents: any[] = [];
  selectedStudents: any[] = [];
  isLoadingStudents = false;
  searchInput = '';
  showDropdown = false;

  allFormations: any[] = [];
  filteredFormations: any[] = [];
  selectedFormation: any = null;
  isLoadingFormations = false;
  formationSearchInput = '';
  showFormationDropdown = false;

  // ── Manage tab ──
  allCerts: any[] = [];
  filteredCerts: any[] = [];
  certSearch = '';
  isLoadingCerts = false;
  editingId: number | null = null;
  editForm: any = {};
  isRegenerating = false;
  manageError = '';

  private backendBase = environement.BASE_URL.replace('/api', '');

  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient) {
    this.certifForm = this.fb.group({
      students: ['', Validators.required],
      periode: ['', Validators.required],
      formation: ['', Validators.required],
      month: ['', Validators.required],
      start: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadFormations();
  }

  switchTab(tab: 'generate' | 'manage') {
    this.activeTab = tab;
    if (tab === 'manage' && this.allCerts.length === 0) this.loadCerts();
  }

  // ── Generate ──────────────────────────────────────────────────────────────

  loadStudents(): void {
    this.isLoadingStudents = true;
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.allStudents = (res as any[]).filter((u: any) => u.roles?.some((r: any) => r.name === 'ETUDIANT') && u.enabled === 1);
        this.filteredStudents = this.allStudents;
        this.isLoadingStudents = false;
      },
      () => { this.isLoadingStudents = false; this.errorMessage = 'Failed to load students'; }
    );
  }

  loadFormations(): void {
    this.isLoadingFormations = true;
    this.userService.getAllFormations().subscribe(
      (res: any[]) => { this.allFormations = res; this.filteredFormations = res; this.isLoadingFormations = false; },
      () => { this.isLoadingFormations = false; this.errorMessage = 'Failed to load formations'; }
    );
  }

  filterStudents(event: any): void {
    const q = (event.target.value || '').toLowerCase().trim();
    this.searchInput = q;
    this.filteredStudents = q ? this.allStudents.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.username.toLowerCase().includes(q)
    ) : this.allStudents;
    this.showDropdown = true;
  }

  selectStudent(student: any): void {
    if (!this.selectedStudents.find(s => s.id === student.id)) this.selectedStudents.push(student);
    this.certifForm.patchValue({ students: 'selected' });
    this.searchInput = '';
    this.filteredStudents = this.allStudents;
    this.showDropdown = false;
  }

  removeStudent(id: number): void {
    this.selectedStudents = this.selectedStudents.filter(s => s.id !== id);
    if (!this.selectedStudents.length) this.certifForm.patchValue({ students: '' });
  }

  isStudentSelected(id: number): boolean { return this.selectedStudents.some(s => s.id === id); }

  filterFormations(event: any): void {
    const q = (event.target.value || '').toLowerCase().trim();
    this.formationSearchInput = q;
    this.filteredFormations = q ? this.allFormations.filter(f => f.nomFormation.toLowerCase().includes(q)) : this.allFormations;
    this.showFormationDropdown = true;
  }

  selectFormation(f: any): void {
    this.selectedFormation = f;
    this.certifForm.patchValue({ formation: 'selected' });
    this.formationSearchInput = '';
    this.filteredFormations = this.allFormations;
    this.showFormationDropdown = false;
  }

  liste(): void {
    if (!this.certifForm.valid || !this.selectedStudents.length || !this.selectedFormation) {
      this.errorMessage = 'Please fill all fields and select at least one student and a formation';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const v = this.certifForm.value;
    let value_date = v.start;
    if (value_date) {
      const d = new Date(value_date);
      value_date = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    }
    const studentNames = this.selectedStudents.map(s => `${s.id}:${s.firstName} ${s.lastName}`).join('\n');
    axios.post(`${this.backendBase}/api/certif/Generer`, {
      liste: studentNames, periode: v.periode, nom_formation: this.selectedFormation.nomFormation, month: v.month, date: value_date
    }).then(() => {
      this.showThankYouPopup = true;
      setTimeout(() => this.showThankYouPopup = false, 3000);
      if (this.allCerts.length > 0) this.loadCerts();
    }).catch(err => {
      this.errorMessage = err.response?.data?.message || 'Error generating certificate. Please try again.';
    }).finally(() => { this.isLoading = false; });
  }

  // ── Manage ────────────────────────────────────────────────────────────────

  loadCerts(): void {
    this.isLoadingCerts = true;
    this.manageError = '';
    this.http.get<any[]>(`${this.backendBase}/api/certif/all`).subscribe(
      (res) => {
        this.allCerts = res;
        this.filteredCerts = res;
        this.isLoadingCerts = false;
      },
      () => { this.isLoadingCerts = false; this.manageError = 'Failed to load certificates'; }
    );
  }

  filterCerts(): void {
    const q = this.certSearch.toLowerCase();
    this.filteredCerts = q ? this.allCerts.filter(c =>
      (`${c.studentFirstName} ${c.studentLastName}`).toLowerCase().includes(q) ||
      (c.formation || '').toLowerCase().includes(q) ||
      (c.month || '').toLowerCase().includes(q)
    ) : [...this.allCerts];
  }

  startEdit(cert: any): void {
    this.editingId = cert.id;
    this.editForm = {
      name: `${cert.studentFirstName} ${cert.studentLastName}`.trim(),
      period: cert.period,
      formation: cert.formation,
      month: cert.month,
      date: cert.date ? cert.date.substring(0, 10) : ''
    };
  }

  cancelEdit(): void { this.editingId = null; this.editForm = {}; }

  regenerate(certId: number): void {
    this.isRegenerating = true;
    this.manageError = '';
    this.http.put(`${this.backendBase}/api/certif/update/${certId}`, this.editForm, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${this.editForm.name?.replace(/ /g,'_') || certId}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.isRegenerating = false;
        this.cancelEdit();
        this.loadCerts();
      },
      () => { this.isRegenerating = false; this.manageError = 'Failed to regenerate certificate'; }
    );
  }
}
