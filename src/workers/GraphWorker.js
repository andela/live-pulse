import moment from 'moment';
import vm from 'vm';

import { prisma } from '../generated/prisma-client';

export default class GraphWorker {
  constructor() {
    this.executeFunction = this.executeFunction.bind(this);
    this.executeFunctionContext = this.executeFunctionContext.bind(this);
    this.executeLocalFunction = this.executeLocalFunction.bind(this);
    this.executeWebFunction = this.executeWebFunction.bind(this);
    this.findGraphsToUpdate = this.findGraphsToUpdate.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
  }
  async executeFunction(func, { context, dashboard, graph, isDataSource, lineGenerator }) {
    let { options, optionsSchema, parametersSchema, source, type } = func;

    let response = {};
    
    // get args
    let  args = {};
    if (parametersSchema) {
      let parametersSchemaKeys = Object.keys(parametersSchema);
      let contextVariables = context.variables;
      let dashboardvariables = dashboard.variables;
      let graphVariables = graph.variables;
      for (let i = 0; i < parametersSchemaKeys.length; i++) {
        if (contextVariables && contextVariables[parametersSchemaKeys[i]]) {
          // get the args from the context variables
          args[parametersSchemaKeys[i]] = contextVariables[parametersSchemaKeys[i]];
        } else if (graphVariables && graphVariables[parametersSchemaKeys[i]]) {
          // if args are not found in context variables get them from graph variables
          args[parametersSchemaKeys[i]] = graphVariables[parametersSchemaKeys[i]];
        } else if (dashboardvariables && dashboardvariables[parametersSchemaKeys[i]]) {
          // if args are not found in context variables get them from graph variables
          args[parametersSchemaKeys[i]] = dashboardvariables[parametersSchemaKeys[i]];
        } else {
          let schema = parametersSchema[parametersSchemaKeys[i]];
          if (schema.required === true) {
            response.errors = response.errors || [];
            response.errors.push({
              message: `The variable '${parametersSchemaKeys[i]}' is required but cannot be found.`
            });
          }
        }
      }
    }

    // get options
    if (optionsSchema) {
      let optionsSchemaKeys = Object.keys(optionsSchema);
      for (let i = 0; i < optionsSchemaKeys.length; i++) {
        if (!options[optionsSchemaKeys[i]]) {
          let schema = optionsSchema[optionsSchemaKeys[i]];
          if (schema.required === true) {
            response.errors = response.errors || [];
            response.errors.push({
              message: `The option '${optionsSchemaKeys[i]}' is required but cannot be found.`
            });
          }
        }
      }
    }

    // get line
    let fragment = `
      fragment LineWithPoints on Line {
        id
        points {
          id
          hidden
          x
          y
        }
      }
    `;
    let line = await prisma.lineGenerator({ id: lineGenerator.id }).line().$fragment(fragment);

    if (!response.errors || response.errors.length === 0) {
      if (type === 'LOCAL') {
        // TODO: get responses from web functions and pass them to local functions??
        response = await this.executeLocalFunction(source, line, args, options);
      } else if (type === 'WEB') {
        response = await this.executeWebFunction(source, line, args, options);
      }
    }

    if (isDataSource && (!response.errors || response.errors.length === 0) && isNaN(response.data)) {
      response.errors = response.errors || [];
      response.errors.push({
        message: `Data returned from function '${func.name}' is not a number.`
      });
    }
    if (response.errors && response.errors.length > 0) {
      let { errors } = response;
      for (let i = 0; i < errors.length; i++) {
        await prisma.createLog({
          context: {
            connect: { id: context.id }
          },
          message: errors[i].message,
          type: 'ERROR'
        });
      }
      // delete old logs (not just logs belonging to this context)
      await prisma.deleteManyLogs({
        updatedAt_lt: moment().subtract(7, 'days').toDate()
      });
    } else {
      if (isDataSource) {
        // create a line for the line generator (if no line already exists)
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
          y: response.data
        });
        // delete old points
        await prisma.deleteManyPoints({
          line: {
            id: line.id
          },
          updatedAt_lt: moment().subtract(parseInt(graph.updateInterval, 10) * 120, 'm').toDate()
        });
        // execute hooks
        let hooks = await prisma.lineGenerator({ id: lineGenerator.id }).hooks();
        for (let i = 0; i < hooks.length; i++) {
          this.executeFunctionContext(hooks[i], {
            dashboard,
            graph,
            isDataSource: false,
            lineGenerator
          });
        }
      }
    }
  }
  async executeFunctionContext(context, { dashboard, graph, isDataSource, lineGenerator }) {
    if (context) {
      let func = await prisma.functionContext({ id: context.id }).func();
      this.executeFunction(func, {
        context,
        dashboard,
        graph,
        isDataSource,
        lineGenerator
      });
    }
  }
  async executeLocalFunction(source, line, args, options) {
    // see: https://stackoverflow.com/questions/46561959/execute-javascript-functions-from-a-string-in-nodejs

    const sandbox = {
      args,
      line,
      options
    };
    try {
      const script = new vm.Script(`(function(){${source}})()`);
      const context = new vm.createContext(sandbox);
      let data = script.runInContext(context);
      return { data };
    } catch (error) {
      return { errors: [error] };
    }
  }
  async executeWebFunction(source, line, args, options) {
    // TODO
  }
  async findGraphsToUpdate() {
    let graphs = await prisma.graphs({
      where: {
        updateTime_lte: moment().format('YYYY-MM-DDTHH:mm:59.999Z')
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
    let dashboard = await prisma.graph({ id: graph.id }).dashboard();
    let lineGenerators = await prisma.graph({ id: graph.id }).lineGenerators({
      where: {
        state_not: 'DISABLED'
      }
    });
    for(let i = 0; i < lineGenerators.length; i++) {
      // get the line generator's data source
      let dataSource = await prisma.lineGenerator({ id: lineGenerators[i].id }).dataSource();
      this.executeFunctionContext(dataSource, {
        dashboard,
        graph,
        isDataSource: true,
        lineGenerator: lineGenerators[i]
      });
    }
  }
}
