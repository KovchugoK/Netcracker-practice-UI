import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {SpecialistService} from "../../services/specialist.service";
import {AccountDTO} from "../../model/AccountDTO";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit, DoCheck {

  accountList: Observable<AccountDTO[]>;

  constructor(private specialisService: SpecialistService) {
  }

  ngOnInit() {
    console.log("onInit");
    this.reloadData();
  }

  ngDoCheck() {
    console.log("doCheck");
    if (this.specialisService.businessRole != '') {
      this.accountList = this.specialisService.getSpecialistList();
    }
    this.specialisService.businessRole = '';
  }

  reloadData() {
    this.accountList = this.specialisService.getSpecialistList();
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
