import { gql } from 'apollo-server-express';


export const typeDefs = gql`
    scalar Date

    type Query {
        hello: String!
        user(email: String!): User
    }

    type User {
        id: ID
        email: String
        password: String
        created_at: Date
    }
 
    type Mutation {
        createUser(email: String!, password: String!): User!
    }
`