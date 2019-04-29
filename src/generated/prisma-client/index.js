"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Dashboard",
    embedded: false
  },
  {
    name: "DataSource",
    embedded: false
  },
  {
    name: "DataSourceType",
    embedded: false
  },
  {
    name: "Entity",
    embedded: false
  },
  {
    name: "Graph",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/chieze-franklin-40314f/live-pulse-prisma-1/dev`
});
exports.prisma = new exports.Prisma();
