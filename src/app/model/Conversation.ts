import {Message} from './Message';

export class Conversation {
  id: string;
  yourAccount: Account;
  otherAccount: Account;
  name: string;
  lastMessage: Message;
}
