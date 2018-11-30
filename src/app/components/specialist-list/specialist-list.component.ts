import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {SpecialistService} from "../../services/specialist.service";
import {AccountDTO} from "../../model/AccountDTO";
import {Account} from "../../model/Account";
import {SearchObject} from "../../model/SearchObject";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  accountList: Observable<AccountDTO[]>;

  constructor(private specialisService: SpecialistService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  selectSearchObj(searchObj: SearchObject) {
    this.reloadData(searchObj);
  }

  reloadData(searchObj: SearchObject = null) {
    this.accountList = this.specialisService.getSpecialistList(searchObj);
  }

  onClick(account: Account) {
    this.specialisService.post(account as Account).subscribe(
      value => {
        console.log('[POST] create Fav successfully', value);
      }, error => {
        console.log('FAIL to create');
      },
      () => {
        console.log('POST Fav - now completed.');
      });
    ;
  }

}
