export default {
  createDashboard: async (root, args, context, info) => {
    if (context.user) {
      return await context.prisma.createDashboard({
        ...args.data,
        createdBy: { connect: { id: context.user.id } }
      });
    } else {
      throw new Error('Not authenticated');
    }
  },
  createdBy: async (root, args, context, info) => await context.prisma.dashboard({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.dashboard(args),
  dashboards: async (root, args, context, info) => await context.prisma.dashboards(args),
  deleteDashboard: async (root, args, context, info) => await context.prisma.deleteDashboard(args),
  graphs: async (root, args, context, info) => await context.prisma.dashboard({ id: root.id }).graphs(),
  updateDashboard: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateDashboard(input);
  }
}
