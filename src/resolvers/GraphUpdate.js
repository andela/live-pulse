export default {
  graph: async (root, args, context, info) => await context.prisma.graphUpdate({ id: root.id }).graph(),
}
