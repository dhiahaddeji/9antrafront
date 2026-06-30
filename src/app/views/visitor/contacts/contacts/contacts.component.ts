import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  category!: string

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.category =  this.route.snapshot.paramMap.get('category') || ''
  }
}

