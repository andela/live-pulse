import createdPoint from './CreatedPoint';

class TestCreated {
  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.resolve = this.resolve.bind(this);
  }
  subscribe(root, args, context, info) {
    try {
      console.log("subscribe")
      console.log(this.resolve);
      return context.prisma.$subscribe.test({ mutation_in: ["CREATED", "UPDATED"] }).node();
    } catch (e) {
      console.log(e)
    }
  }
  resolve(payload, args, context, info) {
    try {
      console.log("resolve")
      return payload
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  // createdPoint,
  // testCreated: {
  //   subscribe: (root, args, context, info) => {
  //     try {
  //       console.log("subscribe")
  //       console.log(resolve);
  //       return context.prisma.$subscribe.test({ mutation_in: ["CREATED", "UPDATED"] }).node();
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   },
  //   resolve: (payload, args, context, info) => {
  //     try {
  //       console.log("resolve")
  //       return payload
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   },
  // }
  testCreated: new TestCreated()
}
