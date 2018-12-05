import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {User} from '../../model/User';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  opened = false;
  @ViewChild('sidenav')
  nav: MatSidenav;


  @select(selectCurrentUser)
  currentUser: Observable<User>;


  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
  }

  onClick() {
    this.nav.toggle();
    this.opened = !this.opened;
  }

}
