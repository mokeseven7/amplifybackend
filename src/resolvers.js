import { User } from './models/User';
import {GraphQLScalarType, Kind} from 'graphql';

export const resolvers = {
    Query: {
        hello: () => "hello",
        user: async (root, { email }, context, info) => {
            let existingUser = await User.findOne({email})
            
            let userType = {
              id: existingUser._id,
              email: existingUser.email,
              created_at: existingUser.created_at
            }

            console.log(userType);
            
            return userType;
        }
    },
    Mutation: {
        createUser: async (_, { email, password }) => {
            let created_at = new Date;
            const newUser = new User({ email, password, created_at })
            await newUser.save();
            console.log(newUser);
            return newUser;
        }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        serialize(value) {
          return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        },
      }),
}
