import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Account} from "../../model/Account";
import {InvestorService} from "../../services/investor.service";
import {Resume} from "../../model/Resume";
import {selectResumes, isLoading} from "../../store/selectors/resume.selector";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store/index";
import {skipWhile, take} from "rxjs/internal/operators";
import {fetchResumesAction, fetchResumesSpecialistsAction} from "../../store/actions/resume.actions";

@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;

  constructor(private ngRedux: NgRedux<AppState>) {

  }


  /*resumeList: Observable<Resume[]>;

  constructor(private investorService: InvestorService) {
  }

  onClick(account: Account) {
    this.investorService.post(account as Account).subscribe(
      value => {
        console.log('[POST] create Fav successfully', value);
      }, error => {
        console.log('FAIL to create');
      },
      () => {
        console.log('POST Fav - now completed.');
      });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.resumeList = this.investorService.getInvestorList();
  }*/

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchResumesSpecialistsAction()));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectResumes));
  }

}

