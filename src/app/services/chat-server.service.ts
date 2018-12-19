import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {selectCurrentUser} from '../store/selectors/current-user.selector';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {Message} from '../model/Message';
import * as io from 'socket.io-client';
import {AppState} from '../store';

@Injectable({
  providedIn: 'root'
})
export class ChatServerService {

  private socket;

  private url: 'http://localhost:10000';

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  public connect() {
    this.socket = io('http://localhost:10000', {
      query: {
        token: this.ngRedux.getState().currentUserState.currentUser.token.accessToken,
        userId: this.ngRedux.getState().currentUserState.currentUser.account.id
      }
    });
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendMessage = (message: Message) => {
    return Observable.create((observer) => {
      this.socket.emit('new_message', message, (answer) => {
          observer.next(answer);
        }
      );
    });
  };

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new_message', (message) => {
        observer.next(message);
      });
    });
  };
}
