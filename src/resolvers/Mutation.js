import Dashboard from './Dashboard';
import Entity from './Entity';
import Graph from './Graph';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { createEntity, deleteEntity, updateEntity } = Entity;
const { createGraph, deleteGraph, updateGraph } = Graph;
const { signIn, signUp } = User;

export default {
  createDashboard,
  createEntity,
  createGraph,
  deleteDashboard,
  deleteEntity,
  deleteGraph,
  updateDashboard,
  updateEntity,
  updateGraph,
  signIn,
  signUp
}
