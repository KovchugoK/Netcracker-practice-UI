import {Account} from './Account';

export class Message {
  conversationId: string;
  senderId: string;
  receiverId: string;
  msg: string;
  creationDate: Date;
}