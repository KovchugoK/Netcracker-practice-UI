import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  opened = false;

  @ViewChild('sidenav')
  nav: MatSidenav;

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.nav.toggle();
    this.opened = !this.opened;
  }

}
