import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { environement } from 'src/environement/environement.dev';

@Component({
  selector: 'app-generate-certif',
  templateUrl: './generate-certif.component.html',
  styleUrls: ['./generate-certif.component.css']
})
export class GenerateCertifComponent implements OnInit {
  certifForm: FormGroup;
  showThankYouPopup: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  
  predefinedPeriods: string[] = ['1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '1 year'];
  monthOptions: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  students: any[] = [];
  allStudents: any[] = [];
  filteredStudents: any[] = [];
  selectedStudents: any[] = [];
  isLoadingStudents: boolean = false;
  searchInput: string = '';
  showDropdown: boolean = false;

  formations: any[] = [];
  allFormations: any[] = [];
  filteredFormations: any[] = [];
  selectedFormation: any = null;
  isLoadingFormations: boolean = false;
  formationSearchInput: string = '';
  showFormationDropdown: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
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

  loadStudents(): void {
    this.isLoadingStudents = true;
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        const students = (res as any[]).filter(
          (u: any) => u.roles?.some((r: any) => r.name === 'ETUDIANT') && u.enabled === 1
        );
        this.allStudents = students;
        this.filteredStudents = students;
        this.isLoadingStudents = false;
      },
      (err: any) => {
        console.error('Error loading students:', err);
        this.isLoadingStudents = false;
        this.errorMessage = 'Failed to load students from database';
      }
    );
  }

  loadFormations(): void {
    this.isLoadingFormations = true;
    this.userService.getAllFormations().subscribe(
      (res: any[]) => {
        this.allFormations = res;
        this.filteredFormations = res;
        this.isLoadingFormations = false;
        console.log('Formations loaded:', this.allFormations);
      },
      (err: any) => {
        console.error('Error loading formations:', err);
        this.isLoadingFormations = false;
        this.errorMessage = 'Failed to load formations from database';
      }
    );
  }

  filterStudents(event: any): void {
    const searchTerm = (event.target.value || '').toLowerCase().trim();
    this.searchInput = searchTerm;
    
    if (searchTerm === '') {
      this.filteredStudents = this.allStudents;
    } else {
      this.filteredStudents = this.allStudents.filter(student => 
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm) ||
        student.username.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
      );
    }
    this.showDropdown = true;
  }

  selectStudent(student: any): void {
    // Check if already selected
    if (!this.selectedStudents.find(s => s.id === student.id)) {
      this.selectedStudents.push(student);
    }
    
    // Update form control with a marker value
    this.certifForm.patchValue({ students: 'selected' });
    
    // Clear input and hide dropdown
    this.searchInput = '';
    this.filteredStudents = this.allStudents;
    this.showDropdown = false;
  }

  removeStudent(studentId: number): void {
    this.selectedStudents = this.selectedStudents.filter(s => s.id !== studentId);
    
    // Clear form control if no students selected
    if (this.selectedStudents.length === 0) {
      this.certifForm.patchValue({ students: '' });
    }
  }

  isStudentSelected(studentId: number): boolean {
    return this.selectedStudents.some(s => s.id === studentId);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.filteredStudents = this.allStudents;
    }
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  // Formation filter methods
  filterFormations(event: any): void {
    const searchTerm = (event.target.value || '').toLowerCase().trim();
    this.formationSearchInput = searchTerm;
    
    if (searchTerm === '') {
      this.filteredFormations = this.allFormations;
    } else {
      this.filteredFormations = this.allFormations.filter(formation => 
        formation.nomFormation.toLowerCase().includes(searchTerm)
      );
    }
    this.showFormationDropdown = true;
  }

  selectFormation(formation: any): void {
    this.selectedFormation = formation;
    
    // Update form value with a marker
    this.certifForm.patchValue({ formation: 'selected' });
    
    // Clear input and hide dropdown
    this.formationSearchInput = '';
    this.filteredFormations = this.allFormations;
    this.showFormationDropdown = false;
  }

  toggleFormationDropdown(): void {
    this.showFormationDropdown = !this.showFormationDropdown;
    if (this.showFormationDropdown) {
      this.filteredFormations = this.allFormations;
    }
  }

  closeFormationDropdown(): void {
    this.showFormationDropdown = false;
  }

  liste(): void {
    console.log('Form valid:', this.certifForm.valid);
    console.log('Selected Students:', this.selectedStudents);
    console.log('Selected Formation:', this.selectedFormation);

    if (!this.certifForm.valid || this.selectedStudents.length === 0 || !this.selectedFormation) {
      console.warn('Form is invalid, no students selected, or no formation selected');
      this.errorMessage = 'Please select at least one student and a formation';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.certifForm.value;
    
    // Format date
    let value_date = formValue.start;
    if (value_date) {
      const date = new Date(value_date);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); 
      const yyyy = date.getFullYear();
      value_date = dd + '/' + mm + '/' + yyyy;
    }

    // Format: "id:firstName lastName" — backend uses ID for reliable user lookup
    const studentNames = this.selectedStudents
      .map(student => `${student.id}:${student.firstName} ${student.lastName}`)
      .join('\n');

    const article = {
      liste: studentNames,
      periode: formValue.periode,
      nom_formation: this.selectedFormation.nomFormation,
      month: formValue.month,
      date: value_date
    };

    console.log('Sending data:', article);

    const backendUrl = environement.BASE_URL.replace('/api', '');
    axios.post(`${backendUrl}/api/certif/Generer`, article)
      .then(res => {
        console.log('Certificate generated:', res.data);
        this.showThankYouPopup = true;
        setTimeout(() => {
          this.showThankYouPopup = false;
        }, 3000);
      })
      .catch(err => {
        console.error('Error generating certificate:', err);
        this.errorMessage = err.response?.data?.message || 'Error generating certificate. Please try again.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
