const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    profile: Profile!
    savedBooks: [Book]!
  }

  type Book {
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput {
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  type Profile {
    mainInterest: String
  }

  input ProfileInput {
    mainInterest: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    saveProfile(profileData: ProfileInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
