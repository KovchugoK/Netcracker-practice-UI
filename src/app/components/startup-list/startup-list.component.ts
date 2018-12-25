import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {searchStartupsAction} from '../../store/actions/startups.actions';
import {selectStartups, isLoading} from '../../store/selectors/startups.selector';
import {skipWhile, take} from 'rxjs/internal/operators';
import {AdminService} from '../../services/admin.service';



@Component({
  selector: 'app-startup-list',
  templateUrl: './startup-list.component.html',
  styleUrls: ['./startup-list.component.css']
})
export class StartupListComponent implements OnInit {
  id: string;
  constructor(private ngRedux: NgRedux<AppState>,
             private adminService: AdminService,
              ) {}

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectStartups)
  startupList: Observable<Startup[]>;

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(searchStartupsAction(this.ngRedux.getState().startupSearchToolbarState.startupSearchParams)));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectStartups));

  }
  blockStartup(startup: Startup) {
    this.adminService.blockStartup(startup.id).subscribe();
    startup.nonBlock = false;
    console.log(startup.id);
    console.log('Стартап заблокирован');
  }
  unBlockStartup(startup: Startup) {
    this.adminService.unBlockStartup(startup.id).subscribe();
    startup.nonBlock = true;
    console.log(startup.id);
    console.log('Стартап разблокирован');
  }


}
