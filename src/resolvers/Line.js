export default {
  lineGenerator: async (root, args, context, info) => await context.prisma.line({ id: root.id }).lineGenerator(),
  points: async (root, args, context, info) => await context.prisma.line({ id: root.id }).points(),
}
