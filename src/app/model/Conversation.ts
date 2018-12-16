import {Message} from './Message';

export class Conversation {
  conversationId: string;
  yourAccount: Account;
  otherAccount: Account;
  name: string;
  lastMessage: Message;
}
