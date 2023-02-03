import { gql } from 'apollo-server-core';

const conversationTypeDefs = gql`

  scalar Date

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }

  type Query {
    conversations: [Conversation]
  }

  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
    createdAt: Date
    updatedAt: Date
  }
`;

/* CreateConversationResponse: Devuelve el id de la conversacion */


export default conversationTypeDefs;