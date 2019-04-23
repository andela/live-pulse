import Dashboard from './Dashboard';
import Mutation from './Mutation';
import Query from './Query';
import User from './User';

const { createdBy } = Dashboard;
const { dashboards } = User;

export default {
  Dashboard: {
    createdBy
  },
  Mutation,
  Query,
  User: {
    dashboards
  }
}