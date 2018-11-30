import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpecialistService} from "../../services/specialist.service";
import {FormControl} from "@angular/forms";
import {SearchObject} from "../../model/SearchObject";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  skills = new FormControl();
  skillsList: string[] =  ['Java', 'Python', 'C', 'SQL', 'TypeScript', 'JavaScript', 'Angular',
    'Spring', 'HTML', 'CSS', 'Paint', 'JUnit'];

  roles = new FormControl();
  rolesList: string[] = ['Developer', 'Designer', 'TE'];

  searchObj: SearchObject = new SearchObject();


  @Output()
  onSearchSelected = new EventEmitter<SearchObject>();


  constructor(private specialisService: SpecialistService) {
  }

  onClick(){
    this.searchObj.searchString = (<HTMLInputElement>document.getElementById("name")).value;
    this.searchObj.roles = this.roles.value;
    console.log(this.roles.value);
    this.searchObj.skills = this.skills.value;
    this.onSearchSelected.emit(this.searchObj);
  }

  ngOnInit() {
  }

}
