//If this isnt first, nothing in .env will be available in process.env
import { setup } from './config/setup';

import { ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';

//Preload all the env vars into memory before ANYTHING runs
setup();


const startServer = async () => {

  //Create the websesrver
  const app = express();
  const port = process.env.PORT || 4000;

  // Build GraphQL schema based on SDL definitions and resolvers maps
  const server = new ApolloServer({ typeDefs, resolvers, introspection:true });
  server.applyMiddleware( { app } );

  //Setup the database connection
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
  await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


  

  //Open the tcp connection
  app.listen({ port }, () =>

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)}

startServer();