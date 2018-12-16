import {Injectable} from '@angular/core';
import {ConversationService} from '../../services/conversation.service';
import {MessageService} from '../../services/message.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {
  FETCH_CONVERSATIONS,
  fetchConversationsFailedAction,
  fetchConversationsSuccessAction,
  GET_CONVERSATION, getConversationFailedAction, getConversationSuccessAction
} from '../actions/conversation.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {TransformService} from '../../utils/transform.service';
import {of} from 'rxjs';

@Injectable()
export class ConversationsEpic {
  constructor(private conversationsService: ConversationService, private messagesService: MessageService) {
  }

  fetchConversations$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_CONVERSATIONS).pipe(
      switchMap(({payload}) => {
        return this.conversationsService
          .getUserConversations(payload.userId)
          .pipe(
            map(conversations => fetchConversationsSuccessAction(TransformService.transformToMap(conversations))),
            catchError(error => of(fetchConversationsFailedAction(error.message)))
          );
      })
    );
  };

  getConversation$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(GET_CONVERSATION).pipe(
      switchMap(({payload}) => {
          return this.conversationsService
            .getConversationByUsersIds(payload.yourId, payload.otherId)
            .pipe(
              map(conversation => getConversationSuccessAction(conversation)),
              catchError(error => of(getConversationFailedAction(error.message)))
            );
        }
      )
    );
  };
}
