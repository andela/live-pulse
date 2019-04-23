export default {
  createDashboard: async (root, args, context, info) => {
    // args.updateInterval = args.updateInterval || (15 * 60); // default to 15 minutes
    return await context.prisma.createDashboard(args);
  },
  dashboard: async (root, args, context, info) => await context.prisma.dashboard(args),
  dashboards: async (root, args, context, info) => await context.prisma.dashboards({ where: args }),
  deleteDashboard: async (root, args, context, info) => await context.prisma.deleteDashboard(args),
  updateDashboard: async (root, args, context, info) => {
    const options = {
      where: {
        id: args.id
      },
      data: {
        icon: args.icon,
        publicUrl: args.publicUrl,
        title: args.title,
        updateInterval: args.updateInterval
      }
    };
    return await context.prisma.updateDashboard(options);
  }
}
