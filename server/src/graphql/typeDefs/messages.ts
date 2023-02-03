import { gql } from 'apollo-server-core';

const messageTypeDefs = gql`
    type Message {
        id: String
        sender: User
        body: String
        createdAt: Date
    }
`

export default messageTypeDefs