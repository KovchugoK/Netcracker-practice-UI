import {AppState} from '../index';

export const selectConversations = (state: AppState) => Array.from(state.conversationsState.conversations.values());
