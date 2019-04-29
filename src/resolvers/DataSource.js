export default {
  createDataSource: async (root, args, context, info) => {
    return await context.prisma.createDataSource({
      ...args.data,
      createdBy: { connect: { id: context.user.id } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.dataSource({ id: root.id }).createdBy(),
  dataSource: async (root, args, context, info) => await context.prisma.dataSource(args),
  dataSources: async (root, args, context, info) => await context.prisma.dataSources(args),
  deleteDataSource: async (root, args, context, info) => await context.prisma.deleteDataSource(args),
  updateDataSource: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateDataSource(input);
  }
}
