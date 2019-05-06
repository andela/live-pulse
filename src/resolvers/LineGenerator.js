export default {
  createLineGenerator: async (root, args, context, info) => {
    return await context.prisma.createLineGenerator({
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      graph: { connect: { id: args.graphId } },
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).createdBy(),
  dataSource: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).dataSource(),
  deleteLineGenerator: async (root, args, context, info) => await context.prisma.deleteLineGenerator(args),
  graph: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).graph(),
  hooks: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).hooks(),
  line: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).line(),
  updateLineGenerator: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateLineGenerator(input);
  }
}
