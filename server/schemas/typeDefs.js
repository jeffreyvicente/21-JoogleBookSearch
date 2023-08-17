// Should have data from client/src/utils

const {gql} = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    input InputBook {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }


    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(email: String!, password:String!): Auth
        login(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: InputBook!): User
        removeBook(bookId: Int!): User
    }
    `;


    module.exports = typeDefs;