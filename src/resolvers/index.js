import Dashboard from './Dashboard';
import Func from './Func';
import FunctionContext from './FunctionContext';
import Graph from './Graph';
import Line from './Line';
import LineGenerator from './LineGenerator';
import Log from './Log';
import Mutation from './Mutation';
import Notification from './Notification';
import NotificationsSettings from './NotificationsSettings';
import Point from './Point';
import Query from './Query';
import Settings from './Settings';
import Subscription from './Subscription';
import User from './User';

export default {
  Dashboard: {
    createdBy: Dashboard.createdBy,
    graphs: Dashboard.graphs
  },
  Func: {
    createdBy: Func.createdBy,
    contexts: Func.contexts
  },
  FunctionContext: {
    createdBy: FunctionContext.createdBy,
    func: FunctionContext.func,
    hookedTo: FunctionContext.hookedTo,
    lineGenerator: FunctionContext.lineGenerator,
    logs: FunctionContext.logs
  },
  Graph: {
    createdBy: Graph.createdBy,
    dashboard: Graph.dashboard,
    lineGenerators: Graph.lineGenerators,
  },
  Line: {
    lineGenerator: Line.lineGenerator,
    points: Line.points,
  },
  LineGenerator: {
    createdBy: LineGenerator.createdBy,
    dataSource: LineGenerator.dataSource,
    graph: LineGenerator.graph,
    hooks: LineGenerator.hooks,
    line: LineGenerator.line,
  },
  Log: {
    context: Log.context,
  },
  Mutation,
  Notification: {
    user: Notification.user,
  },
  NotificationsSettings: {
    settings: NotificationsSettings.settings,
  },
  Point: {
    line: Point.line,
  },
  Query,
  Settings: {
    notifications: Settings.notifications,
    user: Settings.user,
  },
  Subscription,
  User: {
    dashboards: User.dashboards,
    funcs: User.funcs,
    functionContexts: User.functionContexts,
    graphs: User.graphs,
    lineGenerators: User.lineGenerators,
    notifications: User.notifications,
    settings: User.settings,
  }
}