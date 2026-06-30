import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathService } from 'src/app/MesServices/Path/path.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-paths-add-form',
  templateUrl: './admin-paths-add-form.component.html',
  styleUrls: ['./admin-paths-add-form.component.css']
})
export class AdminPathsAddFormComponent implements OnInit {


  pathsForm!: FormGroup
  errorMessage: string = '';
  imagepath = ''
  goals: any[] = []


  constructor(private ps: PathService, private formBuilder: FormBuilder, private router: Router) { }

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

  addPath() {
    if (this.pathsForm.valid) {

      const formData = new FormData();
      var goals = this.pathsForm.get('learningGoals')?.value.split(',');
      goals.forEach((g: any) => { this.goals.push({ description: g }) })

      //var modules = this.extractTitleDescriptionPairs(this.pathsForm.get('learningModules')?.value)
      const path = {
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


      this.ps.addPath(formData)
        .subscribe(
          (data) => {
            Swal.fire({
              title: 'Path has been added successfully',
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
              title: 'Error while adding this path',
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

}
