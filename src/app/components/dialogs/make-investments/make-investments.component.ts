import {Component, Inject, OnInit} from '@angular/core';
import {StartupDialogData} from '../../../model/dialog-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';
import {NgRedux, select} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {StartupService} from '../../../services/startup.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  makeInvestmentInStartupAction,
} from '../../../store/actions/startup-state.actions';
import {selectCurrentUser} from '../../../store/selectors/current-user.selector';
import {Observable} from 'rxjs';
import {User} from '../../../model/User';

@Component({
  selector: 'app-make-investments',
  templateUrl: './make-investments.component.html',
  styleUrls: ['./make-investments.component.css']
})
export class MakeInvestmentsComponent implements OnInit {

  investmentForm: FormGroup;
  startupId: string;
  balance: number;
  error: string;
  @select(selectCurrentUser)
  currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              public dialogRef: MatDialogRef<MakeInvestmentsComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: StartupDialogData) {
  }

  ngOnInit() {
    this.startupId = this.data.startupId;
    this.currentUser.subscribe(user => this.balance = user.account.balance);
    this.initializeForm();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {

      }
    });
  }

  private initializeForm() {
    this.investmentForm = this.fb.group({
      sumOfInvestment: ['', [Validators.required, Validators.pattern('[1-9][0-9]*'), Validators.maxLength(7)]],
    });
  }

  get sumOfInvestment(): FormControl {
    return this.investmentForm.get('sumOfInvestment') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.investmentForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  private getErrorMessage(control: FormControl): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Field is required';
      }
      if (control.errors['maxlength']) {
        errorMessage = 'Max 7 digits';
      }
      if (control.errors['pattern']) {
        errorMessage = 'You can input only digits';
      }
    }
    return errorMessage;
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  makeInvestment() {
    const sum = this.investmentForm.controls['sumOfInvestment'].value as number;
    if (sum <= this.balance && sum !== 0) {
      this.ngRedux.dispatch(makeInvestmentInStartupAction(this.ngRedux.getState().currentUserState.currentUser.account,
        this.ngRedux.getState().startupPageState.startupModel, sum));
      this.dialogRef.close(DialogResult.CLOSE);
    } else {
      this.error = 'You do not have enough money to make this investment!';
    }

  }

}
