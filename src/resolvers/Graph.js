import utils from '../utils';

const { getUserId } = utils;

export default {
  createGraph: async (root, args, context, info) => {
    const userId = await getUserId(context);
    return await context.prisma.createGraph({
      ...args,
      createdBy: { connect: { id: userId } },
      dashboard: { connect: { id: args.dashboard.id } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).createdBy(),
  dashboard: async (root, args, context, info) => await context.prisma.graph({ id: root.id }).dashboard(),
  graph: async (root, args, context, info) => await context.prisma.graph(args),
  graphs: async (root, args, context, info) => await context.prisma.graphs({ where: args }),
  deleteGraph: async (root, args, context, info) => await context.prisma.deleteGraph(args),
  updateGraph: async (root, args, context, info) => await context.prisma.updateGraph(args)
}
