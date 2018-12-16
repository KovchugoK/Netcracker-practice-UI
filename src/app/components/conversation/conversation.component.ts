import {Component, OnInit} from '@angular/core';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
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


  constructor() {
  }

  ngOnInit() {
  }
}
