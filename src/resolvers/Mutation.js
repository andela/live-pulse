export default {
  createDashboard: (root, args, context) => context.prisma.createDashboard(args),
  deleteDashboard: (root, args) => { return { id: 10, title: args.title }; },
  updateDashboard: (root, args) => { return { id: 10, title: args.title }; }
}
