import {Account} from './Account';

export class Message {
  conversationId: string;
  senderId: string;
  receiveId: string;
  msg: string;
  creationDate: Date;
}
