import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account';
import {ActivatedRoute } from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {Observable} from 'rxjs/index';
import {isSelected, selectAccountFromState} from '../../store/selectors/account.selector';
import {selectAccount} from '../../store/actions/account-state.actions';
import {deleteAccountAction} from '../../store/actions/accounts.actions';
import {Startup} from '../../model/Startup';
import {AdminService} from '../../services/admin.service';
import {User} from '../../model/User';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string;
  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectAccountFromState)
  account: Observable<Account>;

  constructor(private ngRedux: NgRedux<AppState>,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectAccount(this.id));
  }

  deleteAccount() {
    this.ngRedux.dispatch(deleteAccountAction(this.id));
  }
  get currentUser(): User {
    return this.ngRedux.getState().accountPageState.accountModel.user;
  }

  blockUser(user: User) {
    this.adminService.blockUser(user.id).subscribe();
    user.nonBlock = false;
    console.log('User заблокирован');
  }

  unBlockUser(user: User) {
    this.adminService.unBlockUser(user.id).subscribe();
    user.nonBlock = true;
    console.log('User разблокирован');
  }
}




