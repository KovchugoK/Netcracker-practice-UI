import {Conversation} from '../../model/Conversation';
import {Reducer} from 'redux';
import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_FAILED,
  FETCH_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION,
  GET_CONVERSATION_FAILED,
  GET_CONVERSATION_SUCCESS
} from '../actions/conversation.action';

export interface ConversationsState {
  readonly conversations: Map<string, Conversation>;
  readonly currentConversation: Conversation;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  conversations: new Map<string, Conversation>(),
  currentConversation: null,
  isLoading: false
};

export const conversationsReducer:
  Reducer<ConversationsState> = (state: ConversationsState = INITIAL_STATE, action): ConversationsState => {
  switch (action.type) {
    case FETCH_CONVERSATIONS:
      return {...state, isLoading: true};
    case FETCH_CONVERSATIONS_SUCCESS:
      return {...state, ...action.payload, isLoading: false};
    case FETCH_CONVERSATIONS_FAILED:
      return {...state, ...action.payload, isLoading: false};
    case GET_CONVERSATION:
      return {...state, isLoading: true};
    case GET_CONVERSATION_SUCCESS: {
      const conversations = new Map(state.conversations);
      conversations.set(action.payload.conversation.id, action.payload);
      return {...state, conversations: conversations, currentConversation: action.payload.conversation, isLoading: false};
    }
    case GET_CONVERSATION_FAILED:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
