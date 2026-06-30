import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PathService } from 'src/app/MesServices/Path/path.service';
import { Path } from 'src/app/Models/E-learning/Path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-paths-update-form',
  templateUrl: './admin-paths-update-form.component.html',
  styleUrls: ['./admin-paths-update-form.component.css']
})
export class AdminPathsUpdateFormComponent implements OnInit{

  pathsForm!: FormGroup
  errorMessage: string = '';
  imagepath = ''
  id?: number
  goals: any[] = []
  gls: String = ''
  filePath: string = '';

  constructor(private ps: PathService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pathsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      language: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      learningGoals: ['', Validators.required],
      careerDevelopment: ['', Validators.required],
      //learningModules: ['', Validators.required],
      image: '',
    })

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne(this.id)
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pathsForm.get('image')!.setValue(file);
      console.log(this.pathsForm.get('image')!.value);
    } else {
      this.pathsForm.get('image')!.setValue(this.imagepath);
    }
  }

  updatePath() {
    if (this.pathsForm.valid) {

      const formData = new FormData();
      var goals = this.pathsForm.get('learningGoals')?.value.split(',');
      goals.forEach((g: any) => { this.goals.push({ description: g }) })

      //var modules = this.extractTitleDescriptionPairs(this.pathsForm.get('learningModules')?.value)
      const path = {
        id: this.id,
        title: this.pathsForm.get('title')?.value,
        description: this.pathsForm.get('description')?.value,
        duration: this.pathsForm.get('duration')?.value,
        language: this.pathsForm.get('language')?.value,
        careerDevelopment: this.pathsForm.get('careerDevelopment')?.value,
        //learningModules: modules,
        price: this.pathsForm.get('price')?.value,
        learningGoals: this.goals
      }
      formData.append('path', JSON.stringify(path));
      const photoFile = this.pathsForm.get('image')?.value;
      if (photoFile instanceof File) {
        formData.append('image', photoFile, photoFile.name);
      }

      formData.forEach((key, value) => {
        console.log(key, value);
      });


      this.ps.updatePath(formData)
        .subscribe(
          (data) => {
            Swal.fire({
              title: 'Path has been updated successfully',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            // Handle successful response
            this.router.navigateByUrl("/admin/paths")
          },
          (error) => {
            // Handle error response
            Swal.fire({
              title: 'Error while updating this path',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          })

    } else {
      this.errorMessage = "Error adding Path"
    }

  }

  // extractTitleDescriptionPairs(inputString: string): { title: string, description: string }[] {
  //   const pattern = /([^:,]+):([^,]+)/g;
  //   const pairs: { title: string, description: string }[] = [];
  //   let match;
  
  //   while ((match = pattern.exec(inputString)) !== null) {
  //     const [_, title, description] = match;
  //     pairs.push({ title: title.trim(), description: description.trim() });
  //   }
  
  //   return pairs;
  // }

  getOne(id: number) {
    this.ps.getOnePath(id).subscribe(
      (data: Path) => {
        this.pathsForm.get('title')?.setValue(data.title)
        this.pathsForm.get('description')?.setValue(data.description)
        this.pathsForm.get('duration')?.setValue(data.duration)
        this.pathsForm.get('language')?.setValue(data.language)
        this.pathsForm.get('image')?.setValue(data.image)
        this.pathsForm.get('price')?.setValue(data.price)
        this.pathsForm.get('careerDevelopment')?.setValue(data.careerDevelopment)

        // var learnM: string = ''
        // data.learningModules?.forEach((module) => {
        //   if(module.title && module.description){
        //     learnM += module.title + ': ' + module.description + ','
        //   }
        // })
  
        data.learningGoals?.forEach((goal) => {
          if (goal.description) {
            this.gls += goal.description + ",";
          }
        });

        this.imagepath = "assets/Paths/Path_" + id + "/" + data.image

        this.filePath = this.getFileTypeFromPath(this.imagepath)
        this.convertPathToFile(this.imagepath, this.filePath)
              .then((file: File) => {
                this.pathsForm.get('image')?.setValue(file)
              })
              .catch((error: Error) => {
                console.error('Error converting file:', error);
              });

        this.gls = this.gls.slice(0, -1)
        this.pathsForm.get('learningGoals')?.setValue(this.gls)

        // learnM = learnM.slice(0, -1)
        // console.log(learnM);
        
        
        // this.pathsForm.get('learningModules')?.setValue(learnM)
      }
    )
  }

  convertPathToFile(filePath: string, fileType: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', filePath);
      xhr.responseType = 'blob';
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
          const file = new File([blob], fileName, { type: fileType });
          resolve(file);
        } else {
          reject(new Error('Failed to fetch the file.'));
        }
      };
  
      xhr.onerror = function() {
        reject(new Error('An error occurred while fetching the file.'));
      };
  
      xhr.send();
    });
  }

  getFileTypeFromPath(filePath: string): string {
    const extension = filePath.split('.').pop();
  
  // Map file extensions to corresponding MIME types
  const fileTypeMap: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    avif: 'image/avif',
    gif: 'image/gif',
    // Add more file extensions and MIME types as needed
  };

  // Get the file type based on the extension
  const fileType = fileTypeMap[extension!.toLowerCase()];
  
  return fileType || '';
  }
}
