export default {
  createDataSource: async (root, args, context, info) => {
    // check for required env vars
    if (args.data.requiredEnvVars && args.data.requiredEnvVars.set && args.data.requiredEnvVars.set.length > 0) {
      let requiredEnvVars = args.data.requiredEnvVars.set;
      let env = args.data.env;
      // if env is null/undefined
      if (!env) {
        throw new Error(`Missing required environment variables: ${requiredEnvVars.join(', ')}`);
      }
      // if env is NOT null/undefined
      let missingEnvVars = [];
      for (let i = 0; i < requiredEnvVars.length; i++) {
        if(!env[requiredEnvVars[i]]) {
          missingEnvVars.push(requiredEnvVars[i]);
        }
      }
      if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
      }
    }

    // checks succeeded
    return await context.prisma.createDataSource({
      ...args.data,
      createdBy: { connect: { id: context.user.id } }
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.dataSource({ id: root.id }).createdBy(),
  dataSource: async (root, args, context, info) => await context.prisma.dataSource(args),
  dataSources: async (root, args, context, info) => await context.prisma.dataSources(args),
  deleteDataSource: async (root, args, context, info) => await context.prisma.deleteDataSource(args),
  lineGenerators: async (root, args, context, info) => await context.prisma.dataSource({ id: root.id }).lineGenerators(),
  updateDataSource: async (root, args, context, info) => {
    // check for required env vars
    let currentDataSource = await context.prisma.dataSource({ id: args.id });
    if ((args.data.requiredEnvVars && args.data.requiredEnvVars.set && args.data.requiredEnvVars.set.length > 0) ||
    (args.data.env)) {
      let requiredEnvVars = currentDataSource.requiredEnvVars;
      if (args.data.requiredEnvVars && args.data.requiredEnvVars.set) {
        requiredEnvVars = args.data.requiredEnvVars.set;
      }
      let env = args.data.env || currentDataSource.env;
      // if env is null/undefined
      if (!env) {
        throw new Error(`Missing required environment variables: ${requiredEnvVars.join(', ')}`);
      }
      // if env is NOT null/undefined
      let missingEnvVars = [];
      for (let i = 0; i < requiredEnvVars.length; i++) {
        if(!env[requiredEnvVars[i]]) {
          missingEnvVars.push(requiredEnvVars[i]);
        }
      }
      if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
      }
    }
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateDataSource(input);
  }
}
