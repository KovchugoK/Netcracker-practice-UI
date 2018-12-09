import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SearchObject} from "../../model/SearchObject";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store/index";
import {selectStartupSearchObj} from "../../store/selectors/sprcialists-search-toolbar.selector";
import {BusinessRole} from "../../model/BusinessRole";
import {Skill} from "../../model/Skill";
import {searchResumesAction} from "../../store/actions/resume.actions";
import {updateSpecialistsSearchToolbarAction} from "../../store/actions/specialists-search-toolbar.actions";
import {ResumeService} from "../../services/resume.service";
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  searchForm: FormGroup;
  skillsList: Skill[];
  rolesList: BusinessRole[];
  creatorSearchView = false;

  constructor(private ngRedux: NgRedux<AppState>,
              private fb: FormBuilder,
              private resumeService: ResumeService) {
  }

  ngOnInit() {
    this.resumeService.getAllSkills().subscribe(skillsList => this.skillsList = skillsList);
    this.resumeService.getSpecialistsBusinessRole().subscribe(businessRole => this.rolesList = businessRole);
    this.ngRedux.select(selectStartupSearchObj).pipe(map(value => this.transformResumeSearchParams(value)))
      .subscribe(specialistsSearchObj => this.initializeForm(specialistsSearchObj));
  }

  private initializeForm(searchObj: SearchObject) {
    this.searchForm = this.fb.group({
      roles: [searchObj.roles],
      skills: [searchObj.skills],
      searchString: [searchObj.searchString],
    });
  }


  search() {
    this.ngRedux.dispatch(searchResumesAction(this.searchForm.value as SearchObject));
    this.ngRedux.dispatch(updateSpecialistsSearchToolbarAction(this.searchForm.value as SearchObject));
  }

  private transformResumeSearchParams(searchObj: SearchObject) {
    this.creatorSearchView = true;
    return searchObj;
  }




}
