import Dashboard from './Dashboard';
import Graph from './Graph';
import Mutation from './Mutation';
import Query from './Query';
import User from './User';

export default {
  Dashboard: {
    createdBy: Dashboard.createdBy,
    graphs: Dashboard.graphs
  },
  Graph: {
    createdBy: Graph.createdBy,
    dashboard: Graph.dashboard
  },
  Mutation,
  Query,
  User: {
    dashboards: User.dashboards,
    graphs: User.graphs
  }
}