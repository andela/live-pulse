import Dashboard from './Dashboard';
import Func from './Func';
import FunctionContext from './FunctionContext';
import Graph from './Graph';
import LineGenerator from './LineGenerator';
import User from './User';

const { createDashboard, deleteDashboard, updateDashboard } = Dashboard;
const { createFunc, createFuncFromUrl, deleteFunc, updateFunc } = Func;
const { createDataSource, createHook, deleteFunctionContext, updateFunctionContext } = FunctionContext;
const { createGraph, deleteGraph, updateGraph } = Graph;
const { createLineGenerator, deleteLineGenerator, updateLineGenerator } = LineGenerator;
const { signIn, signUp } = User;

export default {
  createDashboard,
  createDataSource,
  createFunc,
  createFuncFromUrl,
  createGraph,
  createHook,
  createLineGenerator,
  deleteDashboard,
  deleteFunc,
  deleteFunctionContext,
  deleteGraph,
  deleteLineGenerator,
  updateDashboard,
  updateFunc,
  updateFunctionContext,
  updateGraph,
  updateLineGenerator,
  signIn,
  signUp
}
