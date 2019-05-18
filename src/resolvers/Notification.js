export default {
  user: async (root, args, context, info) => await context.prisma.notification({ id: root.id }).user(),
}
