export default {
  subscribe: (root, args, context, info) => {
      try {
        console.log("subscribe")
        return context.prisma.$subscribe.point({ mutation_in: ['CREATED'] }).node();
      } catch (e) {
        console.log(e)
      }
  },
  resolve: payload => {
    try {
      console.log("resolve")
      return payload
    } catch (e) {
      console.log(e)
    }
  },
}
