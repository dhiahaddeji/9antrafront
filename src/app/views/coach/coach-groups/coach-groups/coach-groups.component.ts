import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { RecordService } from './../../../../MesServices/Record/record.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coach-groups',
  templateUrl: './coach-groups.component.html',
  styleUrls: ['./coach-groups.component.css'],
})
export class CoachGroupsComponent implements OnInit {
  groups: any[] = [];
  formations: any[] = [];

  RecordForm!: FormGroup;
  groupForm!: FormGroup;

  selectedGroup: any = null;
  idGroupe!: any;

  showCreateModal = false;
  isCreating = false;

  private jwtToken: string;

  constructor(
    private groupsService: GroupService,
    private formationsService: FormationsService,
    public userAuthService: UserAuthService,
    private formBuilder: FormBuilder,
    private recordService: RecordService,
    private router: Router
  ) {
    this.jwtToken = localStorage.getItem('jwtToken') || '';
  }

  ngOnInit(): void {
    this.RecordForm = this.formBuilder.group({
      title: ['', Validators.required],
      video: '',
    });
    this.groupForm = this.formBuilder.group({
      groupName: ['', [Validators.required, Validators.minLength(2)]],
      formationId: [''],
    });
    this.loadGroups();
    this.loadFormations();
  }

  loadGroups(): void {
    if (!this.jwtToken) return;
    const formateurId = this.userAuthService.getId();
    this.groupsService.getGroupsByFormateurId(formateurId).subscribe({
      next: (groups) => { this.groups = groups; },
      error: (err) => console.error('Error loading groups:', err),
    });
  }

  loadFormations(): void {
    this.formationsService.getFormations().subscribe({
      next: (data: any) => { this.formations = data; },
      error: (err) => console.error('Error loading formations:', err),
    });
  }

  openCreateModal(): void {
    this.groupForm.reset();
    this.showCreateModal = true;
  }

  createGroup(): void {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }
    const val = this.groupForm.value;
    const coachId = this.userAuthService.getId();

    const newGroup = new Groups();
    newGroup.groupName = val.groupName;
    newGroup.creationDate = new Date();
    newGroup.formateur = { id: coachId };
    if (val.formationId) {
      newGroup.formation = { id: Number(val.formationId) };
    }

    this.isCreating = true;
    this.groupsService.addGroups(newGroup).subscribe({
      next: () => {
        this.isCreating = false;
        this.showCreateModal = false;
        this.loadGroups();
        Swal.fire({ icon: 'success', title: 'Group created!', timer: 1500, showConfirmButton: false });
      },
      error: (err) => {
        this.isCreating = false;
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not create group.' });
      },
    });
  }

  deleteGroup(id: number): void {
    Swal.fire({
      title: 'Delete this group?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupsService.deleteGroups(id).subscribe({
          next: () => {
            this.loadGroups();
            Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Could not delete group.' });
          },
        });
      }
    });
  }

  getIdGroupe(id: any): void {
    this.idGroupe = id;
    this.groupsService.getGroupsById(id).subscribe((group) => {
      this.selectedGroup = group;
    });
  }

  AddRecordsForm(): void {
    const formData = new FormData();
    formData.append('title', this.RecordForm.get('title')?.value);
    formData.append('groupId', this.idGroupe);
    formData.append('idUser', localStorage.getItem('id')!);
    const photoFile = this.RecordForm.get('video')?.value;
    if (photoFile instanceof File) {
      formData.append('file', photoFile, photoFile.name);
    }
    this.recordService.addRecord(formData).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Record Added Successfully', showConfirmButton: true })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = `coach/groups/${this.idGroupe}/records`;
            }
          });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not add record.' });
      },
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.RecordForm.get('video')!.setValue(event.target.files[0]);
    }
  }

  getStudentImages(groupId: number): string[] {
    const group = this.groups.find((g) => g.id === groupId);
    if (!group?.etudiants) return [];
    return group.etudiants.slice(0, 3).map((s: any) => s.image);
  }
}
