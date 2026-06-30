import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { NavbarLoaderCommunicationService } from 'src/app/MesServices/NavbarLoaderComs/navbar-loader-communication.service';
//import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
//import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
//import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewInit {

  tabCategorie: any = []
  Categorie = ""
  Formation: any = [];
  tabFormation: any = [];
  id: any;
  user: any ;
  userImage:any=null;
  tabHackerSpace: any = [{ region: 'Tunis Lac 1' }]
  isLoading: boolean = false;
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;

  constructor(private cs: CategorieService,
    private elementRef: ElementRef,
    private fs: FormationsService,
    private HackerSpaceService: HackerspacesService,

    private navbarLoaderService: NavbarLoaderCommunicationService, //{ }
    //export class NavBarComponent implements OnInit {
    //user: any;
    //tabCategorie: any = [];
    //Categorie = '';
    //Formation: any = [];
    //tabFormation: any = [];
    //id: any;
    //tabHackerSpace: any = [];

    //constructor(
    //private cs: CategorieService,
    //private fs: FormationsService,
    //private HackerSpaceService: HackerspacesService,
    private authService: UserAuthService,
    private userService: UserService,
    private route: Router,
    private us: UserAuthService
  ) { }
  getAllCategorie() {
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res;
      console.log(this.tabCategorie);
    });
    this.loadUserInfo();
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.clear();

        this.route.navigate(['/login']);
      }
    });
  }
  scrollToTop() {
    // Scroll the page to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn2();
  }
  loadUserInfo(): void {
    const userId = localStorage.getItem('id');
    if (!userId) return;
    this.userService.getUserById(userId).subscribe(
      (user: any) => {
        this.user = user;
        this.userImage = this.user.image;
        this.isLoading = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAllHackerSpace() {
    this.HackerSpaceService.getAllHackerspaces().subscribe((res: any) => {
      this.tabHackerSpace = Array.isArray(res) ? res : [];
      if (!this.tabHackerSpace.some((h: any) => h.region === 'Tunis Lac 1')) {
        this.tabHackerSpace = [{ region: 'Tunis Lac 1' }, ...this.tabHackerSpace];
      }
    }, () => {
      this.tabHackerSpace = [{ region: 'Tunis Lac 1' }];
    });
  }

  getFormationByCategorie(categoryId: any) {
    this.fs.getFormationByCategorie(categoryId).subscribe((res) => {
      this.tabFormation = res;
    });
  }
  ngOnInit(): void {
    this.loadUserInfo();
    this.isLoading=false;
    this.getAllCategorie()
    //this.getFormationByCategorie(this.id)
    this.getAllHackerSpace()

  }

  ngAfterViewInit() {
    // Send the height of the navbar to the shared service
    const navbarHeight = this.navbar.nativeElement.offsetHeight;
    this.navbarLoaderService.setNavbarHeight(navbarHeight);
  }

  redirectToDahsboard() {
    if(this.us.isLoggedIn1()) {
      let roles: any[] = this.us.getRoles1();

      if(roles.includes('ADMINISTRATEUR'))
        this.route.navigate(['admin'])

      if(roles.includes('ETUDIANT'))
        this.route.navigate(['student'])

        if(roles.includes('FORMATEUR'))
        this.route.navigate(['coach'])
    }
  }

  navigateToHackerspace(region: string) {
    this.scrollToTop();
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown) => dropdown.classList.remove('show'));
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
    this.route.navigate(['/hackerspace', region]);
  }

  navigateToOffers() {
    console.log('navigateToOffers appelée');
    this.scrollToTop();
    
    // Close all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('show');
    });
    
    // Close mobile navbar if open
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
    
    this.route.navigate(['/offers']).then(success => {
      console.log('Navigation vers /offers:', success);
    }).catch(error => {
      console.error('Erreur navigation:', error);
    });
  }

  navigateToCompany() {
    console.log('navigateToCompany appelée');
    this.scrollToTop();
    
    // Close all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('show');
    });
    
    // Close mobile navbar if open
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
    
    this.route.navigate(['/company']).then(success => {
      console.log('Navigation vers /company:', success);
    }).catch(error => {
      console.error('Erreur navigation:', error);
    });
  }

}
