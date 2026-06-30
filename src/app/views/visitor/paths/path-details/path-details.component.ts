import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import { PathService } from 'src/app/MesServices/Path/path.service';
import { Path } from 'src/app/Models/E-learning/Path';

@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.css']
})
export class PathDetailsComponent implements OnInit {


  path!: Path
  id!: number
  showLoader: boolean = true
  navbarHeight!: number;

  constructor(
    private ps: PathService,
     private route: ActivatedRoute,
     private navbarLoaderService: NavbarLoaderCommunicationService,
     private router: Router) {}

  ngOnInit(): void {
    this.loadPath()
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getOne()
  }

  getOne() {
    this.ps.getOnePath(this.id).subscribe(
      (data: Path) => {
        this.path = data
      }
    )
  }

  getImage(p: Path): string {
    return "assets/Paths/Path_" + this.id + "/" + p.image
  }

  loadPath() {
    setTimeout(() => {
      this.showLoader = false
    }, 500);
  }

  getLoaderStyle() {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height;
    });
    const marginTop = this.navbarHeight + 50;
    return { 'margin-top.px': marginTop };
  }

  contact(id: number) {
    this.router.navigate(['paths/contact', id]);
  }

}
