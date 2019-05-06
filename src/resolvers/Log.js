export default {
  context: async (root, args, context, info) => await context.prisma.log({ id: root.id }).context(),
}
