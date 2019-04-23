import Dashboard from './Dashboard';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { signIn, signUp } = User;

export default {
  createDashboard,
  deleteDashboard,
  updateDashboard,
  signIn,
  signUp
}
