/* Users */
import { ConversationPopulated } from '../../../server/src/util/types'

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariable {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>
}

export interface SearchedUser {
  id: string;
  username: string
  image: string;
}

/* Conversations */

export interface CreateConversationData {
  createConversation: {
    conversationId: string; /* Devuelve el ID del chat creado */
  };
}

export interface CreateConversationInput {
  createConversation: {
    participantIds: string[]
  }  /* Pide en el input los ids de los participantes */
}

export interface ConversationsData {
  conversations: ConversationPopulated[]
}