import moment from 'moment';
import vm from 'vm';

import { prisma } from '../generated/prisma-client';

export default class GraphWorker {
  constructor() {
    this.executeDataSource = this.executeDataSource.bind(this);
    this.executeEndpointDataSource = this.executeEndpointDataSource.bind(this);
    this.executeFunctionDataSource = this.executeFunctionDataSource.bind(this);
    this.findGraphsToUpdate = this.findGraphsToUpdate.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
  }
  async executeDataSource(dataSource, graph, entity, lineGenerator) {
    let { env, requiredParams, source, type } = dataSource;
    let { parameterAliases } = lineGenerator;

    // get args
    let  args = {};
    if (requiredParams && requiredParams.length > 0) {
      // the graph must have an entity
      if (!entity) {
        throw new Error('The parent graph must have an entity');
        // TODO: write this to the graph's OR line generator's log
      }
      // get the requiredParams from entity.data
      for (let i = 0; i < requiredParams.length; i++) {
        args[requiredParams[i]] = entity.data[requiredParams[i]];
      }
      if (parameterAliases) {
        // override the values in args with those from parameterAliases
        let parameterAliasesEntries = Object.entries(parameterAliases);
        for (let i = 0; i < parameterAliasesEntries.length; i++) {
          args[parameterAliasesEntries[i][0]] = entity.data[parameterAliasesEntries[i][1]];
        }
      }
    }

    let result;
    // pass to the appropriate executor
    if (type === 'ENDPOINT') {
      result = await this.executeEndpointDataSource(source, args, env);
    } else if (type === 'FUNCTION') {
      // TODO: get results from endpoints and pass them to functions
      result = await this.executeFunctionDataSource(source, args, env)
    }
    console.log(result);
    if (typeof result !== 'undefined') {
      // create a line for the line generator (if no line already exists)
      let line = await prisma.lineGenerator({ id: lineGenerator.id }).line();
      if (!line) {
        line = await prisma.createLine({
          lineGenerator: {
            connect: { id: lineGenerator.id }
          }
        });
      }
      // create a point for that line
      await prisma.createPoint({
        hidden: lineGenerator.state === 'HIDDEN',
        line: {
          connect: { id: line.id }
        },
        x: new Date(),
        y: result
      });
    }
  }
  async executeEndpointDataSource(source, args, env) {
    // TODO
  }
  async executeFunctionDataSource(source, args, env) {
    // see: https://stackoverflow.com/questions/46561959/execute-javascript-functions-from-a-string-in-nodejs

    const sandbox = {
      args,
      env
    };
    try {
      const script = new vm.Script(`(function(){${source}})()`);
      const context = new vm.createContext(sandbox);
      let result = script.runInContext(context);
      return result;
    } catch (error) {
      // TODO: write this to the graph's OR line generator's log
      console.log(error);
    }
  }
  async findGraphsToUpdate() {
    let graphs = await prisma.graphs({
      where: {
        updateTime_lte: new Date()
      }
    });
    for(let i = 0; i < graphs.length; i++) {
      this.updateGraph(graphs[i]);
    }
  }
  async updateGraph(graph) {
     // update the graph
    await prisma.updateGraph({
      where: {
        id: graph.id
      },
      data: {
        updateTime: moment().add(parseInt(graph.updateInterval, 10), 'm').toDate(),
      }
    });
    // get the line generators in the graph
    let lineGenerators = await prisma.graph({ id: graph.id }).lineGenerators();
    lineGenerators = lineGenerators.filter(l => l.state !== 'DISABLED');
    let entity = await prisma.graph({ id: graph.id }).entity();
    for(let i = 0; i < lineGenerators.length; i++) {
      // get the line generator's data source
      let dataSource = await prisma.lineGenerator({ id: lineGenerators[i].id }).dataSource();
      if (dataSource) {
        this.executeDataSource(dataSource, graph, entity, lineGenerators[i])
      }
    }
  }
}
