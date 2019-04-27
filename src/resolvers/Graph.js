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
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).dashboard(),
  entity: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).entity(),
  graph: async (root, args, context, info) => await context.prisma.graph(args),
  graphs: async (root, args, context, info) => await context.prisma.graphs(args),
  deleteGraph: async (root, args, context, info) => await context.prisma.deleteGraph(args),
  updateGraph: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateGraph(input);
  }
}
