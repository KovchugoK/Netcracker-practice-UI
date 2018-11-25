import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpecialistService} from "../../services/specialist.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  @Output()
  onBussinesRoleSelect = new EventEmitter<string>();


  constructor(private specialisService: SpecialistService) {

  }

  _onBussinesRoleSelect(bussinesRoleName: string) {
    this.onBussinesRoleSelect.emit(bussinesRoleName);
  }


  ngOnInit() {
  }

}
