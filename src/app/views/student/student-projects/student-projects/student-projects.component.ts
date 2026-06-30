import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Projects } from 'src/app/Models/Projects';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrls: ['./student-projects.component.css']
})
export class StudentProjectsComponent implements OnInit{
  project:any ;
  selectedProjectId: number | null = null;

  constructor(private sanitazer: DomSanitizer,private projectService: ProjectService , private sr: UserService ,  private authService: UserAuthService) { }
  ngOnInit() {
    console.log("id"+localStorage.getItem('id'))
    this.getUserByid(localStorage.getItem('id'));

    this.reloadData();

  }
  data: any = [];
  username!: string;
  country!: string;
  numeroTel!: string;
  email!: string;
  photo!: any;
  image!: any;
  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.country = this.data.Country;
      this.numeroTel = this.data.numeroTel;
      this.email = this.data.username;
      this.photo = this.data.image;
    });
  }
  reloadData() {
    this.project = this.projectService.getProjectStudent2(localStorage.getItem('id')).subscribe((res)=>{
      this.project=res;
      console.log(res);
     });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectService.addProject2(file,localStorage.getItem('id')).subscribe(
        (response) => {
          // Traitement de la réponse
          console.log(response);
          this.reloadData();

        },
        (error) => {
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

    // Concaténer toutes les parties du nom de fichier après le premier "_" (inclus)
    const fileNameWithoutTimestamp = parts.slice(1).join('_');

    // Supprimer l'extension du fichier
    const dotIndex = fileNameWithoutTimestamp.lastIndexOf('.');
    if (dotIndex !== -1) {
      return fileNameWithoutTimestamp.substring(0, dotIndex);
    }

    return fileNameWithoutTimestamp;
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

  deleteProject = (id: number) => {
    if (confirm('Are you sur?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        // Recharge la page après la suppression
        this.reloadData();

      });
    }
  }
 // Declare the selectedProject property
selectedProject: any;

// Rest of your component code...

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
id!: number;


onFileChangeU(event: any, projectId: number): void {
  const file = event.target.files[0];
  if (file) {
    this.projectService.updateProject(projectId, file).subscribe(
      (response) => {
        // Traitement de la réponse
        console.log(response);
        this.reloadData();
        this.selectedProjectId = projectId;
        this.projectService.getProjectId(projectId).subscribe((project: Projects) => {
          this.selectedProject = project; // Store the selected project details
        });
      },
      (error) => {
        // Gestion des erreurs
        console.error(error);
      }
    );
  }
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




}
