import {Component} from '@angular/core';
import {User} from './model/User';
import {Observable} from 'rxjs';
import {select} from '@angular-redux/store';
import {currentUser} from './store/selectors/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @select(currentUser)
  currentUser: Observable<User>;
}
