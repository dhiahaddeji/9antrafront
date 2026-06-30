import { Component, OnInit } from '@angular/core';
import { DemandService } from 'src/app/MesServices/Demand/demand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-demands-list',
  templateUrl: './admin-demands-list.component.html',
  styleUrls: ['./admin-demands-list.component.css']
})
export class AdminDemandsListComponent implements OnInit {

  demands: any[] = []


  constructor(private ds: DemandService) {}

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.ds.getAll().subscribe(
      (data) => {
        this.demands = data
      }
    )
  }

  checkDetails(demand: any) {
    Swal.fire({
      title: demand.subject,
      text: demand.message
    })
  }

 

}
