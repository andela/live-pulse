import Dashboard from './Dashboard';
import Graph from './Graph';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { createGraph, deleteGraph, updateGraph } = Graph;
const { signIn, signUp } = User;

export default {
  createDashboard,
  createGraph,
  deleteDashboard,
  deleteGraph, 
  updateDashboard,
  updateGraph,
  signIn,
  signUp
}
