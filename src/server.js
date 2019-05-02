import 'babel-polyfill' // eslint-disable-line
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GraphQLServer, PubSub } from 'graphql-yoga';

import auth from './middlewares/auth';
import directives from './directives';
import { prisma } from './generated/prisma-client';
import GraphWorker from './workers/GraphWorker';
import resolvers from './resolvers';

let src = 'build'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  src = 'src'
}

let graphWorker = new GraphWorker();

const pubsub = new PubSub();

const server = new GraphQLServer({
  directiveResolvers: directives.legacy,
  middlewares: [auth.authentication],
  schemaDirectives: directives.schema,
  typeDefs: `./${src}/schema/index.graphql`,
  resolvers,
  context: async (request) => {
    return {
      ...request,
      prisma, 
      pubsub,
    }
  },
})

server.start({ port: process.env.PORT || 5000 }, (options) => console.log(`Server is running on port ${options.port}`));

setInterval(function() {
  pubsub.publish('testCreated', {
    mutation: "CREATED",
    node: {
      text: "haha"
    }
  })
}, 1000 * 10);
// setInterval(graphWorker.findGraphsToUpdate, 1000 * 60);

// const app = new express();
// app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.get('/', async (req, res) => {
//   res.status(200).send(`Hello World!<br /><br />Welcome to Live Pulse from ${req.connection.remoteAddress}`);
// });

// let server = app.listen(process.env.PORT || 5000, () => {
//   let port = server.address().port;
//   console.log(`Server started on port ${port}`)
// })
