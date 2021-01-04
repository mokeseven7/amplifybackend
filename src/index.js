//If this isnt first, nothing in .env will be available in process.env
import { setup } from './config/setup';

import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';

//Preload all the env vars into memory before ANYTHING runs
setup();


const startServer = async () => {
  
  //Create the Web & GraphQL Servers
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  //Plugin for express to know how to handle graphql queries
  server.applyMiddleware( { app } );

  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
  await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

  //Open the tcp connection
  app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)}

startServer();