import utils from '../utils';

const { getUserId } = utils;

export default {
  createDashboard: async (root, args, context, info) => {
    const userId = await getUserId(context);
    return await context.prisma.createDashboard({
      ...args,
      createdBy: { connect: { id: userId } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.dashboard({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.dashboard(args),
  dashboards: async (root, args, context, info) => await context.prisma.dashboards({ where: args }),
  deleteDashboard: async (root, args, context, info) => await context.prisma.deleteDashboard(args),
  graphs: async (root, args, context, info) => await context.prisma.dashboard({ id: root.id }).graphs(),
  updateDashboard: async (root, args, context, info) => await context.prisma.updateDashboard(args)
}
