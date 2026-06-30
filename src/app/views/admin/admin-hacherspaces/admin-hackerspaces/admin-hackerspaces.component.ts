import { Component, OnInit } from '@angular/core';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-hackerspaces',
  templateUrl: './admin-hackerspaces.component.html',
  styleUrls: ['./admin-hackerspaces.component.css']
})
export class AdminHackerspacesComponent implements OnInit {
  Hackerspace:any=[]


  constructor(private hs: HackerspacesService) { }


  deleteHackerspace(id: any) {
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
        this.hs.deleteHackerspace(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your hackerspace has been deleted.', 'success');
          this.getAllHackerspaces(); // Update the page after successful deletion
        });
      }
    });
  }


  getAllHackerspaces() {
    this.hs.getAllHackerspaces().subscribe(res => {
      this.Hackerspace=res
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.getAllHackerspaces();
  }
}
