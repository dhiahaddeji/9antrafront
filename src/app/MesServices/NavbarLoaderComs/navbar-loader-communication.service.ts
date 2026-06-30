import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarLoaderCommunicationService {

  
  private navbarHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  navbarHeight$: Observable<number> = this.navbarHeightSubject.asObservable();

  setNavbarHeight(height: number) {
    this.navbarHeightSubject.next(height);
  }
}
