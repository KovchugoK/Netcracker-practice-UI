import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SpecialistService} from '../../services/specialist.service';
import {Account} from '../../model/Account';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  accountList: Observable<Account[]>;
  opened: false;

  constructor(private specialistService: SpecialistService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.accountList = this.specialistService.getSpecialistList();
  }

  onClick(account: Account) {
    this.specialistService.post(account).subscribe(
      value => {
        console.log('[POST] create Fav successfully', value);
      }, error => {
        console.log('FAIL to create');
      },
      () => {
        console.log('POST Fav - now completed.');
      });
  }

}
