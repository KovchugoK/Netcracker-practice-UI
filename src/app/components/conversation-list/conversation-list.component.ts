import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {conversationsList, isLoading} from '../../store/selectors/conversation.selector';
import {Observable} from 'rxjs';
import {Conversation} from '../../model/Conversation';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../store';
import {skipWhile, take} from 'rxjs/operators';
import {fetchConversationsAction} from '../../store/actions/conversation.action';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {User} from '../../model/User';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(conversationsList)
  conversations: Observable<Conversation[]>;

  @select(selectCurrentUser)
  currentUser: Observable<User>;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>, private router: Router) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() =>
        this.ngRedux.dispatch(fetchConversationsAction(this.ngRedux.getState().currentUserState.currentUser.account.id))
      );

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(conversationsList));
  }

  selectConversation(otherUserId: string) {
    this.router.navigate(['/conversations', otherUserId]);
  }
}
