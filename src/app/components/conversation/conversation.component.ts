import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {skipWhile, take} from 'rxjs/operators';
import {Conversation} from '../../model/Conversation';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../store';
import {currentConversation, isLoading} from '../../store/selectors/conversation.selector';
import {getConversationAction} from '../../store/actions/conversation.action';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(currentConversation)
  currentConversation: Observable<Conversation>;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() =>
        this.ngRedux.dispatch(getConversationAction(
          this.ngRedux.getState().currentUserState.currentUser.account.id,
          this.route.snapshot.paramMap.get('id')
          )
        )
      );
  }
}
