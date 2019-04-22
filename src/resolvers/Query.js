export default {
  dashboard: async (root, args, context, info) => await context.prisma.dashboard(args),
  dashboards: async (root, args, context, info) => await context.prisma.dashboards({ where: args })
}
