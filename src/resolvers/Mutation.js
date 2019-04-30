import Dashboard from './Dashboard';
import DataSource from './DataSource';
import Entity from './Entity';
import Graph from './Graph';
import LineGenerator from './LineGenerator';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { createDataSource, deleteDataSource, updateDataSource } = DataSource;
const { createEntity, deleteEntity, updateEntity } = Entity;
const { createGraph, deleteGraph, updateGraph } = Graph;
const { createLineGenerator, deleteLineGenerator, updateLineGenerator } = LineGenerator;
const { signIn, signUp } = User;

export default {
  createDashboard,
  createDataSource,
  createEntity,
  createGraph,
  createLineGenerator,
  deleteDashboard,
  deleteDataSource,
  deleteEntity,
  deleteGraph,
  deleteLineGenerator,
  updateDashboard,
  updateDataSource,
  updateEntity,
  updateGraph,
  updateLineGenerator,
  signIn,
  signUp
}
