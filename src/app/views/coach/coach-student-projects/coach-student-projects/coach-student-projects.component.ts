import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';

import { Projects } from 'src/app/Models/Projects';

@Component({
  selector: 'app-coach-student-projects',
  templateUrl: './coach-student-projects.component.html',
  styleUrls: ['./coach-student-projects.component.css']
})
export class CoachStudentProjectsComponent {
  project:any ;
  selectedProject: any;
  constructor(    private route: ActivatedRoute,
 private http: HttpClient, private  projectService: ProjectService , private router: Router , private sanitazer :DomSanitizer ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    this.projectService.getProjectsByUser(id).subscribe((event) => {
      this.project = event;

    });

  }
  reloadData() {
    const id = this.route.snapshot.params['id'];
    this.projectService.getProjectsByUser(id).subscribe((event) => {
      this.project = event;
    });
  }
  onFileChange(event:any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectService.addProject(file).subscribe(
        (response: any) => {
          // Traitement de la réponse
          console.log(response);
          this.reloadData();

        },
        (error: any) => {
          // Gestion des erreurs
          console.error(error);
        }
      );
    }
  }
  getFileNameWithoutTimestamp(fileName: string): string {
    // Extraire le nom du fichier sans le chemin
    const fileNameWithoutPath = fileName.substring(fileName.lastIndexOf('/') + 1);

    // Extraire la partie du nom de fichier avant le dernier "_" en utilisant split
    const parts = fileNameWithoutPath.split('_');
    const fileNameWithoutTimestamp = parts[parts.length - 1];

    // Supprimer l'extension du fichier
    const dotIndex = fileNameWithoutTimestamp.lastIndexOf('.');
    if (dotIndex !== -1) {
      return fileNameWithoutTimestamp.substring(0, dotIndex);
    }

    return fileNameWithoutTimestamp;
  }

  // Declare the selectedProject property

// Rest of your component code...
selectedProjectId: number | null = null;

selectProject(projectId: number): void {
  if (this.selectedProjectId === projectId) {
    // Deselect the project if it's already selected
    this.selectedProjectId = null;
    this.selectedProject = null; // Clear the selected project details
  } else {
    this.selectedProjectId = projectId;
    this.projectService.getProjectId(projectId).subscribe((project: Projects) => {
      this.selectedProject = project; // Store the selected project details
    });
  }
}
renamingProjectId: number | null = null;
dropdownStates: { [key: number]: boolean } = {};


toggleDropdown(projectId: number): void {
  this.dropdownStates[projectId] = !this.dropdownStates[projectId];
}

isDropdownOpen(projectId: number): boolean {
  return this.dropdownStates[projectId] || false;
}
updateRemark(remark: string): void {
  this.selectedProject.remark = remark.trim() === 'No Remark' ? '' : remark;
}
remarkTextArea:any;

addRemark(projectId: number, remark: string): void {
  if (!remark.trim()) {
    remark = ''; // Définir la valeur sur une chaîne vide
  }
  this.projectService.addRemarkToProject(projectId, remark)
    .subscribe(
      (      response: any) => {
        // Gérer la réponse du serveur ici
        console.log('Remark added:', response);
        this.reloadData();
      },
      (      error: any) => {
        // Gérer les erreurs ici
        console.error('Error adding remark:', error);
      }
    );

}

viewFile(fileName: string) {
  // Vérifier si le fichier est d'un type pris en charge
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  if (fileExtension === 'pdf' || fileExtension === 'docx' || fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'ppt') {
    const timestamp = Date.now();

    // Construire le chemin complet du fichier à partir du nom du dossier utilisateur et du nom du fichier
    const fileUrl = `../../../../../assets/Projects/${fileName}?timestamp=${timestamp}`;

    // Générer une URL sécurisée pour le fichier
    const url: SafeUrl = this.sanitazer.bypassSecurityTrustUrl(fileUrl);

    // Ouvrir une nouvelle fenêtre ou un nouvel onglet pour afficher le fichier
    window.open(url.toString());
  } else {
    // Gérer le cas où le fichier n'est pas d'un type pris en charge
    console.log('Unsupported file type');
  }
}




startRename(projectId: number): void {
  this.renamingProjectId = projectId;
}


  downloadFile(fileName: string): void {
    const timestamp = Date.now();
    const fileUrl = `../../../../../assets/Projects/${fileName}?timestamp=${timestamp}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileName;
    link.click();
  }
  getFileTypeImage(fileType: string): string {
    if (fileType === 'DOCX' || fileType === 'DOC') {
      return '../../../../assets/img/doc.png';
    } else if (fileType === 'PDF') {
      return '../../../assets/img/pdf.png';
    } else if (fileType === 'ZIP' || fileType === 'RAR') {
      return '../../../../../assets/img/code 1.png';
    }
    // Par défaut, renvoyer une image générique
    return '../../../../../assets/img/imagestudent.png';
  }

}
