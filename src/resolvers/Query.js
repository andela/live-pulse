export default {
  dashboard: (root, args, context, info) => context.prisma.dashboard(args),
  dashboards: (root, args, context, info) => context.prisma.dashboards()
}
