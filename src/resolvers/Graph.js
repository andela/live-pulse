import moment from 'moment';

export default {
  createGraph: async (root, args, context, info) => {
    let { dashboardId } = args;
    let dashboard = await context.prisma.dashboard({ id: dashboardId });
    let dashboardEntity = await context.prisma.dashboard({ id: dashboardId }).entity();
    let entity;
    if (dashboardEntity) {
      entity = {
        connect: { id: dashboardEntity.id }
      }
    }
    // the actual graph
    let graph = await context.prisma.createGraph({
      entity,
      updateInterval: dashboard.updateInterval,
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      dashboard: { connect: { id: dashboardId } },
    });
    // the graphUpdate
    context.prisma.createGraphUpdate({
      graph: { connect: { id: graph.id } },
      time: moment().add(parseInt(graph.updateInterval, 10), 'm').toDate(),
    });
    // return graph
    return graph;
  },
  createdBy: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).dashboard(),
  entity: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).entity(),
  graph: async (root, args, context, info) => await context.prisma.graph(args),
  graphs: async (root, args, context, info) => await context.prisma.graphs(args),
  deleteGraph: async (root, args, context, info) => await context.prisma.deleteGraph(args),
  lineGenerators: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).lineGenerators(),
  update: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).update(),
  updateGraph: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    // the actual graph
    let graph = await context.prisma.updateGraph(input);
    // the graphUpdate
    let graphUpdate = await context.prisma.graph({ id: graph.id }).update();
    if (graphUpdate) {
      await context.prisma.updateGraphUpdate({
        where: {
          id: graphUpdate.id
        },
        data: {
          time: moment().add(parseInt(graph.updateInterval, 10), 'm').toDate(),
        }
      });
    } else {
      await context.prisma.createGraphUpdate({
        graph: { connect: { id: graph.id } },
        time: moment().add(parseInt(graph.updateInterval, 10), 'm').toDate(),
      });
    }
    // return graph
    return graph;
  }
}
