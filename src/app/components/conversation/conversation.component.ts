import {Component, OnInit} from '@angular/core';
import {Message} from '../../model/Message';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {filter, skipWhile, take} from 'rxjs/operators';
import {Conversation} from '../../model/Conversation';
import {MessageService} from '../../services/message.service';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../store';
import {isLoading, currentConversation} from '../../store/selectors/conversation.selector';
import {getConversationAction} from '../../store/actions/conversation.action';
import {fetchContactsAction} from '../../store/actions/contacts.actions';
import {selectContacts} from '../../store/selectors/contacts.selector';

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

  messages: Message[] = [
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'First'
    },
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    },
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    },
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    }, {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    }, {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    }, {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    },
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Other'
    },
    {
      conversationId: '1',
      senderId: '2',
      receiveId: '3',
      creationDate: new Date('2016-06-01 23:00:00'),
      msg: 'Last'
    }
  ];

  constructor(private messageService: MessageService, private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) {
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

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(currentConversation));

    /*this.currentConversation.pipe(filter(el => el != null), take(1)).subscribe((conver) => {
      // Message Logic
    });*/
  }
}
