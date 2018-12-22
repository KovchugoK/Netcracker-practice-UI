import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {selectCurrentUser} from '../store/selectors/current-user.selector';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {Message} from '../model/Message';
import * as io from 'socket.io-client';
import {AppState} from '../store';
import {updateMessagesAction} from '../store/actions/message.action';
import {fetchConversationsAction} from '../store/actions/conversation.action';

@Injectable({
  providedIn: 'root'
})
export class ChatServerService {

  private socket;

  private url: 'http://localhost:10000';

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  public connect(token: string, userId: string) {
    this.socket = io('http://localhost:10000', {
      query: {
        token: token,
        userId: userId
      }
    });

    this.socket.on('new_message', (message) => {
      if (this.ngRedux.getState().conversationsState.conversations.size === 0 ||
        this.ngRedux.getState().conversationsState.conversations.get(message.conversationId) === null) {
        this.ngRedux.dispatch(fetchConversationsAction(this.ngRedux.getState().currentUserState.currentUser.account.id));
      } else {
        this.ngRedux.dispatch(updateMessagesAction(message));
      }
    });
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(message: Message) {
    this.socket.emit('new_message', message, (answer) => {
      if (answer === 1) {
        this.ngRedux.dispatch(updateMessagesAction(message));
      }
    });
  }
}
