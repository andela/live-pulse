export default {
  notifications: async (root, args, context, info) => await context.prisma.settings({ id: root.id }).notifications(),
  user: async (root, args, context, info) => await context.prisma.settings({ id: root.id }).user(),
}
