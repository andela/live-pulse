export default {
  messageLogged: {
    subscribe: (root, args, context, info) => context.prisma.$subscribe.log({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  },
  pointCreated: {
    subscribe: (root, args, context, info) => context.prisma.$subscribe.point({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  }
}
