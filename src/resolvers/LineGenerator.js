export default {
  createLineGenerator: async (root, args, context, info) => {
    let { graphId } = args;
    let { dataSource, parameterAliases } = args.data;
    let missingFields = [];
    let graphEntity = await context.prisma.graph({ id: graphId }).entity();
    // checks
    if (parameterAliases) {
      // the graph must have an entity
      if (!graphEntity) {
        throw new Error('The parent graph must have an entity');
      }
      // for each value in the parameterAliases there must be a matching key in the graphEntity.data
      let parameterAliasesValues = Object.values(parameterAliases);
      for (let i = 0; i < parameterAliasesValues.length; i++) {
        if(!graphEntity.data[parameterAliasesValues[i]]) {
          missingFields.push(parameterAliasesValues[i]);
        }
      }
      if (missingFields.length > 0) {
        throw new Error(`Missing fields in the graph's entity: ${missingFields.join(', ')}`);
      }
    }
    if (dataSource && dataSource.connect) {
      missingFields = [];
      // the graph must have an entity
      if (!graphEntity) {
        throw new Error('The parent graph must have an entity');
      }
      //
      dataSource = await context.prisma.dataSource({ id: dataSource.connect.id });
      let { requiredParams } = dataSource;
      if (requiredParams && requiredParams.length > 0) {
        let missingFieldsInParameterAliases = [];
        if (parameterAliases) {
          // get items in the requiredParams that are missing in the keys of parameterAliases
          for (let i = 0; i < requiredParams.length; i++) {
            if(!parameterAliases[requiredParams[i]]) {
              missingFieldsInParameterAliases.push(requiredParams[i]);
            }
          }
        } else {
          missingFieldsInParameterAliases = requiredParams;
        }
        // see if the missing fields in the keys of parameterAliases can be found in graphEntity
        for (let i = 0; i < missingFieldsInParameterAliases.length; i++) {
          if(!graphEntity.data[missingFieldsInParameterAliases[i]]) {
            missingFields.push(missingFieldsInParameterAliases[i]);
          }
        }
        if (missingFields.length > 0) {
          throw new Error(`Missing fields in the graph's entity: ${missingFields.join(', ')}`);
        }
      }
    }
    // all checks succeeded
    return await context.prisma.createLineGenerator({
      ...args.data,
      createdBy: { connect: { id: context.user.id } },
      graph: { connect: { id: graphId } },
    });
  },
  createdBy: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).createdBy(),
  dataSource: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).dataSource(),
  graph: async (root, args, context, info) => await context.prisma.lineGenerator({ id: root.id }).graph(),
  deleteLineGenerator: async (root, args, context, info) => await context.prisma.deleteLineGenerator(args),
  lineGenerator: async (root, args, context, info) => await context.prisma.lineGenerator(args),
  lineGenerators: async (root, args, context, info) => await context.prisma.lineGenerators(args),
  updateLineGenerator: async (root, args, context, info) => {
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateLineGenerator(input);
  }
}
