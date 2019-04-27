export default {
  createGraph: async (root, args, context, info) => {//------
    return await context.prisma.createGraph({
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      dashboard: { connect: { id: args.dashboardId } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).createdBy(),
  dashboards: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).dashboards(),
  graphs: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).graphs(),
  deleteGraph: async (root, args, context, info) => await context.prisma.deleteGraph(args),//------
  updateGraph: async (root, args, context, info) => {//------
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateGraph(input);
  }
}
