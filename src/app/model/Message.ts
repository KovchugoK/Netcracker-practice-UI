import {Account} from './Account';

export class Message {
  conversationId: string;
  senderAccount: Account;
  receiveAccount: Account;
  msg: string;
  creationDate: Date;
}
