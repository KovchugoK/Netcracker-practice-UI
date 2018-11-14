import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Account} from "../../model/Account";
import {InvestorService} from "../../services/investor.service";

@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  accountList: Observable<Account[]>;
  opened: false;

  constructor(private investorService: InvestorService) {
  }

  onClick(account: Account) {
    this.investorService.post(account as Account).subscribe(
      value => {
        console.log('[POST] create Fav successfully', value);
      }, error => {
        console.log('FAIL to create');
      },
      () => {
        console.log('POST Fav - now completed.');
      });;
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.accountList = this.investorService.getInvestorList();
  }
}

