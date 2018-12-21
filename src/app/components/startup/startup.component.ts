import {Component, OnInit} from '@angular/core';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {
  isSelected,
  selectStartupFromState
} from '../../store/selectors/startups.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {selectStartup} from '../../store/actions/startup-state.actions';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {DeleteStartupComponent} from '../dialogs/delete-startup/delete-startup.component';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {User} from '../../model/User';
import {MakeInvestmentsComponent} from '../dialogs/make-investments/make-investments.component';
import {Investment} from '../../model/Investment';
import {skipWhile, take} from 'rxjs/internal/operators';
import {AdminService} from '../../services/admin.service';
import {JoinStartupComponent} from '../dialogs/join-startup/join-startup.component';
// import * as _ from 'lodash';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  id: string;
  groupedData: any = [];

  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectStartupFromState)
  startup: Observable<Startup>;

  @select(selectCurrentUser)
  currentUser: Observable<User>;

  investments: Investment[];
  currentInvestments: number;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              private route: ActivatedRoute,
              private  adminService: AdminService
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectStartup(this.id));

    this.isSelected.pipe(skipWhile(result => result === true), take(1)).subscribe(() =>
      this.ngRedux.select(selectStartupFromState).subscribe(startup => {
        this.currentInvestments = startup.startupInvestments.map(value => value.sumOfInvestment).reduce((a, b) => a + b, 0);
        // this.transformInvestments(startup.startupInvestments);
        return this.investments =
          startup.startupInvestments.sort(
            (value1, value2) => value2.sumOfInvestment - value1.sumOfInvestment);
      }));
    //   return this.investments =
    //     startup.startupInvestments.sort(
    //       (value1, value2) => value2.sumOfInvestment - value1.sumOfInvestment);
    // }));

  }


  // groupBy(list, keyGetter) {
  //   const map = new Map();
  //   list.forEach((item) => {
  //     const key = keyGetter(item);
  //     const collection = map.get(key);
  //     if (!collection) {
  //       map.set(key, [item]);
  //     } else {
  //       collection.push(item);
  //     }
  //   });
  //   return map;
  // }

  // transformInvestments(investments: Investment[]) {
  //   // const firstInvestor = investments[0].investor.id;
  //   // const grouped = this.groupBy(investments, investment => investment.investor.id);
  //   // console.log(grouped.get(firstInvestor));
  //
  //   from(this.investments)
  //     .groupBy(x => x.investor) // using groupBy from Rxjs
  //     .flatMap(group => group.toArray())// GroupBy dont create a array object so you have to flat it
  //     .map(g => {// mapping
  //       return {
  //         investor: g[0].investor, // take the first name because we grouped them by name
  //         sumOfInvestment: _.sumBy(g, 'sumOfInvestment'), // using lodash to sum quantity
  //       };
  //     })
  //     .toArray()
  //     .do(sum => console.log('sum:', sum)) // just for debug
  //     .subscribe(d => this.groupedData = d);
  // }

  deleteStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteStartupComponent,
      width: '200px',
      data: {startupId: this.id}
    }));
  }

  makeInvestments() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: MakeInvestmentsComponent,
      width: '400px',
      data: {startupId: this.id}
    }));
  }

  joinStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: JoinStartupComponent,
      width: '400px',
      data: {startupId: this.id}
    }));

    // this.ngRedux.dispatch(showDialogAction({
    //     componentType: RechargeBalanceComponent,
    //     width: '400px',
    //     data: null
    //   }));
  }

  get currentStartup(): Startup {
    return this.ngRedux.getState().startupPageState.startupModel;
  }

  blockStartup(startup: Startup) {
    this.adminService.blockStartup(startup).subscribe();
    startup.nonBlock = false;
  }

  unBlockStartup(startup: Startup) {
    this.adminService.unBlockStartup(startup).subscribe();
    startup.nonBlock = true;
  }


}
