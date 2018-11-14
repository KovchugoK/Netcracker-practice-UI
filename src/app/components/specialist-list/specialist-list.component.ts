import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {SpecialistService} from "../../services/specialist.service";
import {AccountDTO} from "../../model/AccountDTO";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  accountList: Observable<AccountDTO[]>;
  opened: false;

  constructor(private specialisService: SpecialistService) {
  }

  ngOnInit() {
    this.reloadData();
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
      });;
  }

}
