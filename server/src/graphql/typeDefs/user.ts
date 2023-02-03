import { gql } from 'apollo-server-core';

const typeDefs = gql`

  type User {
    id: String
    username: String
    email: String
    emailVerified: Boolean
    name: String
    image: String
  }

  type SearchedUser {
    id: String
    username: String
    image: String
  }

  type Query {
    searchUsers(username: String!): [SearchedUser]
  }

  type Mutation {
    createUsername(username: String!): CreateUserResponse
  }

  type CreateUserResponse {
    success: Boolean, error: String
  }
`;

export default typeDefs;