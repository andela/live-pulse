import Dashboard from './Dashboard';
import DataSource from './DataSource';
import Entity from './Entity';
import Graph from './Graph';
import Mutation from './Mutation';
import Query from './Query';
import User from './User';

export default {
  Dashboard: {
    createdBy: Dashboard.createdBy,
    entity: Dashboard.entity,
    graphs: Dashboard.graphs
  },
  DataSource: {
    createdBy: DataSource.createdBy
  },
  Entity: {
    createdBy: Entity.createdBy,
    dashboards: Entity.dashboards,
    graphs: Entity.graphs
  },
  Graph: {
    createdBy: Graph.createdBy,
    dashboard: Graph.dashboard,
    entity: Graph.entity,
  },
  Mutation,
  Query,
  User: {
    dashboards: User.dashboards,
    dataSources: User.dataSources,
    entities: User.entities,
    graphs: User.graphs
  }
}