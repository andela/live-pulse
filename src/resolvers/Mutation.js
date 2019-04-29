import Dashboard from './Dashboard';
import DataSource from './DataSource';
import Entity from './Entity';
import Graph from './Graph';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { createDataSource, deleteDataSource, updateDataSource } = DataSource;
const { createEntity, deleteEntity, updateEntity } = Entity;
const { createGraph, deleteGraph, updateGraph } = Graph;
const { signIn, signUp } = User;

export default {
  createDashboard,
  createDataSource,
  createEntity,
  createGraph,
  deleteDashboard,
  deleteDataSource,
  deleteEntity,
  deleteGraph,
  updateDashboard,
  updateDataSource,
  updateEntity,
  updateGraph,
  signIn,
  signUp
}
