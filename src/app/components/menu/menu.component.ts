import {Component, OnInit} from '@angular/core';

import {SpecialistService} from "../../services/specialist.service";
import {AccountDTO} from "../../model/AccountDTO";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  accountList: Observable<AccountDTO[]>;

  constructor(private specialisService: SpecialistService) {

  }

  isSelected(businessRoleName: string): void {
    this.specialisService.businessRole = businessRoleName;
    console.log(businessRoleName);
  }


  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    //console.log(this.selected);
  }
}
