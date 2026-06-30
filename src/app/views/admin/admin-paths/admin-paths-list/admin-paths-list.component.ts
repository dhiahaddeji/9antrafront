import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/MesServices/Path/path.service';
import { Path } from 'src/app/Models/E-learning/Path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-paths-list',
  templateUrl: './admin-paths-list.component.html',
  styleUrls: ['./admin-paths-list.component.css']
})
export class AdminPathsListComponent implements OnInit {


 paths: Path[] = [];


 constructor(private ps: PathService) {}


  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.ps.getPaths().subscribe(
      (data) => {
        this.paths = data
      }
    )
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.deletePath(id).subscribe( 
          () => {
            Swal.fire('Deleted!', 'This Path has been deleted.', 'success');
            this.getAll()
          },
          (error) => {
            Swal.fire('Error !', 'An error occured while deleting this path', 'error');
            this.getAll()
          }
        )
      }
    });
  }

  getImage(p: Path) {
    return "assets/Paths/Path_" + p.id + "/" + p.image
  }

}
