import {Injectable} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../index';



@Injectable()
export class AccountEpic {
  constructor(private accountService: AccountService, private ngRedux: NgRedux<AppState>) {
  }

}

