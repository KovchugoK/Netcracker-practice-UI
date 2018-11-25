import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {SpecialistService} from "../../services/specialist.service";
import {AccountDTO} from "../../model/AccountDTO";
import {Observable} from "rxjs/index";
import {BusinessRole} from "../../model/BusinessRole";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  @Output()
  onBussinesRoleSelect = new EventEmitter<string>();


  constructor(private specialisService: SpecialistService) {

  }

  _onBussinesRoleSelect(bussinesRoleName: string) {
    this.onBussinesRoleSelect.emit(bussinesRoleName);
  }


  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
  }
}