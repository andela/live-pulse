export default {
  createEntity: async (root, args, context, info) => {
    return await context.prisma.createEntity({
      ...args.data,
      createdBy: { connect: { id: context.user.id } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).createdBy(),
  dashboards: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).dashboards(),
  deleteEntity: async (root, args, context, info) => await context.prisma.deleteEntity(args),
  entity: async (root, args, context, info) => await context.prisma.entity(args),
  entities: async (root, args, context, info) => await context.prisma.entities(args),
  graphs: async (root, args, context, info) => await context.prisma.entity({ id: root.id }).graphs(),
  updateEntity: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateEntity(input);
  }
}
