import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account';
import {ActivatedRoute } from '@angular/router';
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {Observable} from "rxjs/index";
import {isLoading, isSelected, selectAccountFromState} from "../../store/selectors/account.selector";
import {selectAccount} from "../../store/actions/account-state.actions";
import {addContactAction} from "../../store/actions/contacts.actions";
import {selectCurrentUser} from "../../store/selectors/current-user.selector";
import {User} from "../../model/User";
import {showDialogAction} from "../../store/actions/dialogs.actions";
import {RechargeBalanceComponent} from "../dialogs/recharge-balance/recharge-balance.component";
import {DeleteAccountComponent} from "../dialogs/delete-account/delete-account.component";



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

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectAccountFromState)
  account: Observable<Account>;

  constructor(private ngRedux: NgRedux<AppState>,
              private accountService: AccountService,
              private route: ActivatedRoute) {
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectAccount(this.id));
    this.user.subscribe(value => this.currentUserId=value.id);
  }

  deleteAccount() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteAccountComponent,
      width: '210px',
      data: {accountId: this.id}
    }));
  }


  addContact(){
    this.ngRedux.dispatch(addContactAction(this.id,this.currentUserId));
  }

  rechargeBalance(){
    this.ngRedux.dispatch(showDialogAction({
      componentType: RechargeBalanceComponent,
      width: '400px',
      data: null
    }));
  }
}




