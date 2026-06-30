import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PathService } from 'src/app/MesServices/Path/path.service';
import { Path } from 'src/app/Models/E-learning/Path';

@Component({
  selector: 'app-admin-path-details',
  templateUrl: './admin-path-details.component.html',
  styleUrls: ['./admin-path-details.component.css']
})
export class AdminPathDetailsComponent implements OnInit {

  path!: Path
  id!: number

  constructor(private ps: PathService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    this.ps.getOnePath(this.id).subscribe(
      (data: Path) => {this.path = data;}
    )
  }

  getImage() {
    return "assets/Paths/Path_" + this.id + "/" + this.path.image
  }

}
