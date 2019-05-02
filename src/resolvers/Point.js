export default {
  line: async (root, args, context, info) => await context.prisma.point({ id: root.id }).line(),
}
