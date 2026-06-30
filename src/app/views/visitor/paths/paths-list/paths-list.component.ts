import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
import { PathService } from 'src/app/MesServices/Path/path.service';
import { Path } from 'src/app/Models/E-learning/Path';

@Component({
  selector: 'app-paths-list',
  templateUrl: './paths-list.component.html',
  styleUrls: ['./paths-list.component.css']
})
export class PathsListComponent implements OnInit {


  navbarHeight!: number;
  showMore: boolean = false;
  paths: Path[] = [];
  allPaths: Path[] = [];

  constructor(private ps: PathService, private navbarLoaderService: NavbarLoaderCommunicationService, private router: Router) {}

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.ps.getPaths().subscribe(
      (data: Path[]) => {
        this.paths = data
        this.allPaths = data
        this.paths = this.paths.slice(0, 3)
      }
    )
  }

  getImage(path: Path) {
    return "assets/Paths/Path_" + path.id + "/" + path.image + "?h=447782bd49c9399b3bdfae8d5e73b264"
  }

  getTopStyle() {
    this.navbarLoaderService.navbarHeight$.subscribe((height) => {
      this.navbarHeight = height;
    });
    //const marginTop = this.navbarHeight + 50;
    //const contentHeight = this.getContentHeight();
    return { 'margin-top.px': this.navbarHeight };
    //return { 'margin-top.px': this.navbarHeight, 'height': contentHeight, 'max-height.px': 300 };
  }

//   getContentHeight(): string {
//     // Calculate the height of the content dynamically (you can adjust the padding value as needed)
//     const contentHeight = window.innerHeight - this.navbarHeight - 150; // 150px for padding and margins
//     return `${contentHeight}px`;
// }

  clickShowMore() {
    this.showMore = !this.showMore
  }

  askForCoach() {
    this.router.navigate(['/contacts', 'Coach'])
  }
}
