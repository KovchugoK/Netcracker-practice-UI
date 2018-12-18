import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {skipWhile, take} from 'rxjs/internal/operators';
import {DialogResult} from '../../../model/dialog-result';
import {Credential} from '../../../model/Credential';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../../store';
import {loginUserAction} from '../../../store/actions/current-user.actions';
import {isLoading, selectErrorMessage} from '../../../store/selectors/current-user.selector';
import {Observable} from 'rxjs';
import {Role} from '../../../model/Role';
import {NgxPermissionsService} from 'ngx-permissions';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;


  credentialForm: FormGroup;
  returnUrl: string;
  @select(selectErrorMessage)
  error: Observable<string>;
  roleNames: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private permissionsServise: NgxPermissionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  ngOnInit() {
    this.credentialForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get login(): FormControl {
    return this.credentialForm.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.credentialForm.get('password') as FormControl;
  }

  getErrorText(controlName: string): string {
    const control = this.credentialForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
    this.addRole(this.ngRedux.getState().currentUserState.currentUser.roles);
  }

  private getErrorMessage(control: FormControl): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Field is required';
      }
      if (control.errors['minlength']) {
        errorMessage = 'Min length - 6 symbols';
      }
    }
    return errorMessage;
  }

  onSubmit() {
    if (this.credentialForm.invalid) {
      return;
    }

    this.ngRedux.dispatch(loginUserAction(this.credentialForm.value as Credential));
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() =>
        this.error.pipe(skipWhile(error => error !== null), take(1)).subscribe(() => this.onCancelClick()));

  }
  addRole(roles: Role[]) {
    roles.forEach(role => this.roleNames.push(role.roleName));
    this.permissionsServise.loadPermissions(this.roleNames);
  }

}


