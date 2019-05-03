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
    return await context.prisma.createGraph({
      entity,
      updateInterval: dashboard.updateInterval,
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      dashboard: { connect: { id: dashboardId } },
      updateTime: moment().add(parseInt((args.data.updateInterval || dashboard.updateInterval), 10), 'm').toDate()
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).dashboard(),
  entity: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).entity(),
  graph: async (root, args, context, info) => await context.prisma.graph(args),
  graphs: async (root, args, context, info) => await context.prisma.graphs(args),
  deleteGraph: async (root, args, context, info) => await context.prisma.deleteGraph(args),
  lineGenerators: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).lineGenerators(),
  updateGraph: async (root, args, context, info) => {
    let graph = await context.prisma.graph({ id: args.id });
    const input = {
      where: {
        id: args.id
      },
      data: {
        ...args.data,
        updateTime: moment().add(parseInt((args.data.updateInterval || graph.updateInterval), 10), 'm').toDate()
      }
    };
    return await context.prisma.updateGraph(input);
  }
}
