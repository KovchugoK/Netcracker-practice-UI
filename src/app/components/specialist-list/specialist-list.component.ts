import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {SpecialistService} from "../../services/specialist.service";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  accountList: Observable<Account[]>;
  opened: false;

  constructor(private specialisService: SpecialistService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.accountList = this.specialisService.getSpecialistList();
  }

}
