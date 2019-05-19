import 'babel-polyfill' // eslint-disable-line
import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';

import auth from './middlewares/auth';
import directives from './directives';
import { prisma } from './generated/prisma-client';
import GraphWorker from './workers/GraphWorker';
import resolvers from './resolvers';

import email from './integrations/Email';

let src = 'build'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  src = 'src'
}

let graphWorker = new GraphWorker();

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
    }
  },
})

// email.send();

server.start({ port: process.env.PORT || 3000 }, (options) => console.log(`Server is running on port ${options.port}`));

//setInterval(graphWorker.findGraphsToUpdate, 1000 * 60);
