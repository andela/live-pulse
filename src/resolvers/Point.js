export default {
  // createPoint: async (root, args, context, info) => await context.prisma.createPoint(args),
  // deletePoint: async (root, args, context, info) => await context.prisma.deletePoint(args),
  line: async (root, args, context, info) => await context.prisma.point({ id: root.id }).line(),
  point: async (root, args, context, info) => await context.prisma.point(args),
  points: async (root, args, context, info) => await context.prisma.points(args),
  // updatePoint: async (root, args, context, info) => {
  //   const input = {
  //     where: {
  //       id: args.id
  //     },
  //     data: args.data
  //   };
  //   return await context.prisma.updatePoint(input);
  // }
}
