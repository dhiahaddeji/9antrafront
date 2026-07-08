import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { User } from 'src/app/Models/user.model';
import axios from 'axios';

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

  allStudents: User[] = [];
  filteredStudents: User[] = [];
  selectedStudents: User[] = [];
  searchQuery: string = '';
  showDropdown: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.certifForm = this.fb.group({
      periode: ['', Validators.required],
      formation: ['', Validators.required],
      month: ['', Validators.required],
      start: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: any) => {
      this.allStudents = (users as any[]).filter(u =>
        u.enabled &&
        u.roles && u.roles.some((r: any) => r.name === 'ETUDIANT')
      );
    });
  }

  openDropdown(): void {
    this.filteredStudents = this.allStudents.filter(u =>
      !this.selectedStudents.find(s => s.id === u.id)
    );
    this.showDropdown = true;
  }

  onSearchChange(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredStudents = this.allStudents.filter(u =>
      !this.selectedStudents.find(s => s.id === u.id) &&
      (!q ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q))
    );
    this.showDropdown = true;
  }

  selectStudent(student: User): void {
    if (!this.selectedStudents.find(s => s.id === student.id)) {
      this.selectedStudents.push(student);
    }
    this.searchQuery = '';
    this.filteredStudents = [];
    this.showDropdown = false;
  }

  removeStudent(student: User): void {
    this.selectedStudents = this.selectedStudents.filter(s => s.id !== student.id);
  }

  hideDropdown(): void {
    setTimeout(() => { this.showDropdown = false; }, 150);
  }

  liste(): void {
    if (!this.certifForm.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
    if (this.selectedStudents.length === 0) {
      this.errorMessage = 'Please select at least one student';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.certifForm.value;

    let value_date = formValue.start;
    if (value_date) {
      const date = new Date(value_date);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      value_date = dd + '/' + mm + '/' + yyyy;
    }

    const studentNames = this.selectedStudents
      .map(s => `${s.firstName} ${s.lastName}`)
      .join('\n');

    const article = {
      liste: studentNames,
      periode: formValue.periode,
      nom_formation: formValue.formation,
      month: formValue.month,
      date: value_date
    };

    axios.post("https://9antrabackend-production.up.railway.app/api/certif/Generer", article)
      .then(_ => {
        this.showThankYouPopup = true;
        this.certifForm.reset();
        this.selectedStudents = [];

        setTimeout(() => { this.showThankYouPopup = false; }, 3000);
      })
      .catch(err => {
        this.errorMessage = err.response?.data?.message || 'Error generating certificate. Please try again.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
