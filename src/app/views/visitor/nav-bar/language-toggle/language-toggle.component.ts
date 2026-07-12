import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css']
})
export class LanguageToggleComponent implements OnInit {
  activeLang = 'en';

  ngOnInit() {
    this.activeLang = localStorage.getItem('preferredLang') || 'en';
  }

  setLang(lang: string) {
    this.activeLang = lang;
    localStorage.setItem('preferredLang', lang);
    (window as any).setLang(lang);
  }
}
