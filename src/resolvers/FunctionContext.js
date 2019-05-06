export default {
  createDataSource: async (root, args, context, info) => {
    return await context.prisma.createFunctionContext({
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      lineGenerator: { connect: { id: args.lineGeneratorId } }
    });
  },
  createHook: async (root, args, context, info) => {
    return await context.prisma.createFunctionContext({
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      hookedTo: { connect: { id: args.lineGeneratorId } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.functionContext({ id: root.id }).createdBy(),
  deleteFunctionContext: async (root, args, context, info) => await context.prisma.deleteFunctionContext(args),
  func: async (root, args, context, info) => await context.prisma.functionContext({ id: root.id }).func(),
  hookedTo: async (root, args, context, info) => await context.prisma.functionContext({ id: root.id }).hookedTo(),
  lineGenerator: async (root, args, context, info) => await context.prisma.functionContext({ id: root.id }).lineGenerator(),
  logs: async (root, args, context, info) => await context.prisma.functionContext({ id: root.id }).logs(),
  updateFunctionContext: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateFunctionContext(input);
  }
}
