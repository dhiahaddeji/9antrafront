import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.certifForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      periode: ['', Validators.required],
      formation: ['', Validators.required],
      month: ['', Validators.required],
      start: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  liste(): void {
    console.log('Form valid:', this.certifForm.valid);
    console.log('Form value:', this.certifForm.value);

    if (!this.certifForm.valid) {
      console.warn('Form is invalid');
      this.errorMessage = 'Please fill in all required fields';
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

    const article = {
      liste: formValue.name,
      periode: formValue.periode,
      nom_formation: formValue.formation,
      month: formValue.month,
      date: value_date
    };

    console.log('Sending data:', article);

    axios.post("https://9antrabackend-production.up.railway.app/api/certif/Generer", article)
      .then(res => {
        console.log('Certificate generated:', res.data);
        this.showThankYouPopup = true;
        this.certifForm.reset();
        
        // Hide popup after 3 seconds
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
