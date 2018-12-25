import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {StartupService} from '../../../services/startup.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';

import {DialogResult} from '../../../model/dialog-result';
import {updateBalanceAction} from '../../../store/actions/current-user.actions';

@Component({
  selector: 'app-recharge-balance',
  templateUrl: './recharge-balance.component.html',
  styleUrls: ['./recharge-balance.component.css']
})
export class RechargeBalanceComponent implements OnInit {

  rechargeBalanceForm: FormGroup;
  currentBalance: number;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              public dialogRef: MatDialogRef<RechargeBalanceComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.initializeForm();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {

      }
    });
  }

  private initializeForm() {
    this.rechargeBalanceForm = this.fb.group({
      sumToAdd: ['', [Validators.required, Validators.pattern('[1-9][0-9]*'), Validators.maxLength(7)]],
    });
  }

  get sumToAdd(): FormControl {
    return this.rechargeBalanceForm.get('sumToAdd') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.rechargeBalanceForm.get(controlName) as FormControl;
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

  rechargeBalance() {
    this.currentBalance = Number(this.ngRedux.getState().currentUserState.currentUser.account.balance);
    const rechargeSum = Number(this.rechargeBalanceForm.controls['sumToAdd'].value);
    this.currentBalance = Number(this.currentBalance + rechargeSum);
    this.ngRedux.dispatch(updateBalanceAction(this.ngRedux.getState().currentUserState.currentUser.account.id, this.currentBalance));
    this.dialogRef.close(DialogResult.CLOSE);
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

}
