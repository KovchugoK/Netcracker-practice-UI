import {Message} from './Message';

export class Conversation {
  id: string;
  firstAccount: Account;
  secondAccount: Account;
  name: string;
  conversationMessages: Message[];
}
