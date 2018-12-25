import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account';
import {ActivatedRoute } from '@angular/router';
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {Observable} from "rxjs/index";
import {isSelected, selectAccountFromState} from "../../store/selectors/account.selector";
import {selectAccount} from "../../store/actions/account-state.actions";
import {deleteAccountAction} from "../../store/actions/accounts.actions";
import {addContactAction} from "../../store/actions/contacts.actions";
import {selectCurrentUser} from "../../store/selectors/current-user.selector";
import {User} from "../../model/User";



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string;
  currentUserId:string;
  @select(selectCurrentUser)
  user: Observable<User>;

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
    this.user.subscribe(value => this.currentUserId=value.id);
  }

  deleteAccount() {
    this.ngRedux.dispatch(deleteAccountAction(this.id));
  }

  addContact(){
    this.ngRedux.dispatch(addContactAction(this.id,this.currentUserId));
  }
  get currentPageUser(): User {
    console.log(this.ngRedux.getState().accountPageState.accountModel.user.nonBlock);
    console.log(this.id);
    return this.ngRedux.getState().accountPageState.accountModel.user;
  }

  get currentUser(): User {
    return this.ngRedux.getState().currentUserState.currentUser;
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




