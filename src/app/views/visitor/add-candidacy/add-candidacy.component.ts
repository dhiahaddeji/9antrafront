import { Component, OnInit } from '@angular/core';
import { CandidacyService } from 'src/app/MesServices/Candidacy/candidacy.service';
import { Candidacy } from 'src/app/Models/Candidacy';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-candidacy',
  templateUrl: './add-candidacy.component.html',
  styleUrls: ['./add-candidacy.component.css']
})
export class AddCandidacyComponent implements OnInit {
  formSubmitted: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.project.experience = ""; // Initialise avec une valeur vide pour la sélection par défaut
    this.project.education = ""; // Initialise avec une valeur vide pour la sélection par défaut
    this.project.type = ""; // Initialise avec une valeur vide pour la sélection par défaut
  }

  constructor(private candidacyService: CandidacyService) {}
  
  project: Candidacy = new Candidacy();
  
  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier (PDF ou DOC)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: 'Please select a valid CV file (PDF or DOC)',
        });
        event.target.value = '';
        return;
      }
      this.project.cv = file;
    }
  }
  
  lettreM!: File | null;
  
  onLettreMSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier (PDF ou DOC)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: 'Please select a valid cover letter file (PDF or DOC)',
        });
        event.target.value = '';
        return;
      }
      this.project.lettreM = file;
    }
  }
  
  onSubmit() {
    if (!this.project.cv) {
      Swal.fire({
        icon: 'error',
        title: 'Missing CV',
        text: 'Please upload your CV',
      });
      return;
    }

    if (!this.project.lettreM) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Cover Letter',
        text: 'Please upload your cover letter',
      });
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('nom', this.project.nom);
    formData.append('prenom', this.project.prenom);
    formData.append('numtel', this.project.numtel.toString());
    formData.append('email', this.project.email);
    formData.append('education', this.project.education);
    formData.append('experience', this.project.experience);
    formData.append('type', this.project.type);
    formData.append('cv', this.project.cv);
    formData.append('lettreM', this.project.lettreM);
    formData.append('lettre', this.project.lettre);

    this.candidacyService.createCandidacy(formData).subscribe(
      (response) => {
        // Handle successful response
        console.log('Candidacy created successfully', response);
        this.formSubmitted = true;
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your candidacy has been submitted successfully',
        });
      },
      (error) => {
        // Handle error response
        console.error('Error creating candidacy', error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit your candidacy. Please try again.',
        });
      }
    );
  }
}
