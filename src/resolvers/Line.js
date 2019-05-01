export default {
  // createLine: async (root, args, context, info) => await context.prisma.createLine(args),
  // deleteLine: async (root, args, context, info) => await context.prisma.deleteLine(args),
  // line: async (root, args, context, info) => await context.prisma.line(args),
  // lines: async (root, args, context, info) => await context.prisma.lines(args),
  lineGenerator: async (root, args, context, info) => await context.prisma.line({ id: root.id }).lineGenerator(),
  points: async (root, args, context, info) => await context.prisma.line({ id: root.id }).points(),
  // updateLine: async (root, args, context, info) => {
  //   const input = {
  //     where: {
  //       id: args.id
  //     },
  //     data: args.data
  //   };
  //   return await context.prisma.updateLine(input);
  // }
}
