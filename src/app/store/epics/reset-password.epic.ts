import {NgRedux} from "@angular-redux/store";
import {Injectable} from "@angular/core";
import {AppState} from "../index";
import {ActionsObservable} from "redux-observable";
import {map, switchMap} from "rxjs/operators";
import {ResetPasswordService} from "../../services/reset-password.service";
import {SEND_EMAIL, sendResetPasswordEmailSuccessAction} from "../actions/reset-password.actions";
import {AnyAction} from "redux";

@Injectable()
export class ResetPasswordEpic {
  constructor(private resetPasswordService: ResetPasswordService, private ngRedux: NgRedux<AppState>) {
  }

  sendEmail$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SEND_EMAIL).pipe(
      switchMap(({payload}) => {
        console.log(payload.email);
        return this.resetPasswordService
          .sendEmail(payload.email)
          .pipe(
            map(value => sendResetPasswordEmailSuccessAction(value))
          );
      })
    );
  };
}
