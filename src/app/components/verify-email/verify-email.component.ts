import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../store";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NgRedux, select} from "@angular-redux/store";
import {skipWhile, take} from "rxjs/internal/operators";
import {updateRouterState} from "../../store/actions/router.actions";
import {isLoading} from "../../store/selectors/current-user.selector";
import {Observable} from "rxjs/index";
import {showDialogAction} from "../../store/actions/dialogs.actions";
import {SignInComponent} from "../dialogs/sign-in/sign-in.component";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;
  token: string;

  constructor(
              private ngRedux: NgRedux<AppState>,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.userService.verifyEmail(this.token).subscribe();
    this.ngRedux.dispatch(updateRouterState('/main-page'));
    this.ngRedux.dispatch(showDialogAction({
      componentType: SignInComponent,
      width: '500px',
      data: null
    }));
  }


}
