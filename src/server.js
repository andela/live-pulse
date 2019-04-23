import 'babel-polyfill' // eslint-disable-line
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GraphQLServer } from 'graphql-yoga';

import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';

let src = 'build'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  src = 'src'
}

const server = new GraphQLServer({
  typeDefs: `./${src}/schema/index.graphql`,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  },
})

server.start({ port: process.env.PORT || 5000 }, (options) => console.log(`Server is running on port ${options.port}`))

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
