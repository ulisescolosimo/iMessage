import { gql } from '@apollo/client';

const conversationFields = `
conversations {
    id
    participants {
        user {
            id
            username
        }
        hasSeenLatestMessage
        }
latestMessage {
    id
    sender {
        id
        username
    }
    body
    createdAt
}
updatedAt
}
`;

export default {
    Queries: {
        conversations: gql`
            query Conversations{
                ${conversationFields}
            }
        `
    },
    Mutation: {
        createConversation: gql`
            mutation CreateConversation($participantIds: [String]){
                createConversation(participantIds: $participantIds){
                    conversationId
                }
            }
        `
    }
}