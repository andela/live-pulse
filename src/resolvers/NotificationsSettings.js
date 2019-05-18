export default {
  settings: async (root, args, context, info) => await context.prisma.notificationsSettings({ id: root.id }).settings(),
}
