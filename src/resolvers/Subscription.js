import createdPoint from './CreatedPoint';

export default {
  // createdPoint,
  createdDashboard: {
    subscribe: (root, args, context, info) => 
      context.prisma.$subscribe.dashboard({ mutation_in: ["CREATED", "UPDATED"] }).node(),
    resolve: payload => payload,
  }
}
