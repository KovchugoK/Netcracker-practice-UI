import {Component, Inject, OnInit} from '@angular/core';
import {StartupDialogData} from '../../../model/dialog-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {StartupService} from '../../../services/startup.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {selectStartup} from '../../../store/actions/startup-state.actions';

@Component({
  selector: 'app-make-investments',
  templateUrl: './make-investments.component.html',
  styleUrls: ['./make-investments.component.css']
})
export class MakeInvestmentsComponent implements OnInit {

  investmentForm: FormGroup;
  startupId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              public dialogRef: MatDialogRef<MakeInvestmentsComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: StartupDialogData) {
  }

  ngOnInit() {
    this.startupId = this.data.startupId;
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
    this.startupService.makeInvestment(this.ngRedux.getState().currentUserState.currentUser.account,
      this.ngRedux.getState().startupPageState.startupModel, this.investmentForm.controls['sumOfInvestment'].value)
      .subscribe(() => this.ngRedux.dispatch(selectStartup(this.startupId)));

  }

}
