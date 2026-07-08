import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  adminProjects: Company[] = [];
  filtered: Company[] = [];
  selectedCompany: Company | null = null;
  searchQuery: string = '';
  showSearch: boolean = false;
  showAddForm: boolean = false;
  addLoading: boolean = false;
  addError: string = '';
  addSuccess: boolean = false;
  selectedFile: File | null = null;
  newCompany = { nom: '', description: '', adresse: '', email: '', numtel: '' };

  constructor(private sp: CompanyService) {}

  ngOnInit(): void {
    this.sp.getAllByS().subscribe({
      next: (companies: Company[]) => {
        this.adminProjects = companies;
        this.filtered = companies;
      },
      error: (error: any) => console.error(error)
    });
  }

  filterCompanies(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filtered = this.adminProjects.filter(c =>
      !q ||
      c.nom?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.adresse?.toLowerCase().includes(q)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filtered = [...this.adminProjects];
  }

  openModal(company: Company): void {
    this.selectedCompany = company;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedCompany = null;
    document.body.style.overflow = '';
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch();
    }
  }

  openContactModal(): void {
    this.showAddForm = true;
    this.addError = '';
    this.addSuccess = false;
    this.newCompany = { nom: '', description: '', adresse: '', email: '', numtel: '' };
    this.selectedFile = null;
    document.body.style.overflow = 'hidden';
  }

  closeAddForm(): void {
    this.showAddForm = false;
    document.body.style.overflow = '';
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  submitCompany(): void {
    this.addLoading = true;
    this.addError = '';
    const fd = new FormData();
    fd.append('nom', this.newCompany.nom);
    fd.append('description', this.newCompany.description);
    fd.append('adresse', this.newCompany.adresse);
    fd.append('email', this.newCompany.email);
    fd.append('numtel', this.newCompany.numtel);
    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }
    this.sp.create(fd).subscribe({
      next: () => {
        this.addLoading = false;
        this.addSuccess = true;
      },
      error: () => {
        this.addLoading = false;
        this.addError = 'Submission failed. Please try again.';
      }
    });
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
