import {Conversation} from '../../model/Conversation';
import {Reducer} from 'redux';
import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_FAILED,
  FETCH_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION, GET_CONVERSATION_FAILED, GET_CONVERSATION_SUCCESS
} from '../actions/conversation.action';
import {s} from '@angular/core/src/render3';

export interface ConversationsState {
  readonly conversations: Map<string, Conversation>;
}

const INITIAL_STATE = {
  conversations: new Map<string, Conversation>()
};

export const conversationsReducer:
  Reducer<ConversationsState> = (state: ConversationsState = INITIAL_STATE, action): ConversationsState => {
  switch (action.type) {
    case FETCH_CONVERSATIONS:
      return {...state, ...action.payload};
    case FETCH_CONVERSATIONS_SUCCESS:
      return {...state, ...action.payload};
    case FETCH_CONVERSATIONS_FAILED:
      return {...state, ...action.payload};
    case GET_CONVERSATION:
      return {...state, ...action.payload};
    case GET_CONVERSATION_SUCCESS:
      return {...state, ...action.payload};
    case GET_CONVERSATION_FAILED:
      return {...state, ...action.payload};
    default:
      return {...state, ...action.payload};
  }
};
