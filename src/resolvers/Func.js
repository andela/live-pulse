import request from 'request-promise-native';

export default {
  createFunc: async (root, args, context, info) => {
    return await create(root, args, context, info);
  },
  createFuncFromUrl: async (root, args, context, info) => {
    let { url } = args;

    let response = await request({
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      resolveWithFullResponse: true
    });
    let json = response.body;
    delete json.id;
    if (json.type) {
      json.type = json.type.toUpperCase();
    }

    let args2 = {
      data: {
        ...json
      }
    };
    console.log(args2);

    return await create(root, args2, context, info);
  },
  createdBy: async (root, args, context, info) => await context.prisma.func({ id: root.id }).createdBy(),
  contexts: async (root, args, context, info) => await context.prisma.func({ id: root.id }).contexts(),
  deleteFunc: async (root, args, context, info) => await context.prisma.deleteFunc(args),
  func: async (root, args, context, info) => await context.prisma.func(args),
  funcs: async (root, args, context, info) => await context.prisma.funcs(args),
  updateFunc: async (root, args, context, info) => {
    // check for required options
    let currentFunc = await context.prisma.func({ id: args.id });
    if (args.data.options || args.data.optionsSchema) {
      let options = args.data.options || currentFunc.options;
      let optionsSchema = args.data.optionsSchema || currentFunc.optionsSchema;
      let optionsSchemaKeys = Object.keys(optionsSchema);
      // if options is null/undefined
      if (!options) {
        throw new Error(`Missing required options: ${optionsSchemaKeys.join(', ')}`);
      }
      // if options is NOT null/undefined
      let missingOptions = [];
      for (let i = 0; i < optionsSchemaKeys.length; i++) {
        if(!options[optionsSchemaKeys[i]]) {
          missingOptions.push(optionsSchemaKeys[i]);
        }
      }
      if (missingOptions.length > 0) {
        throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
      }
    }

    // checks succeeded
    const input = {
      where: {
        id: args.id
      },
      data: args.data
    };
    return await context.prisma.updateFunc(input);
  }
}

async function create(root, args, context, info) {
  let { options, optionsSchema } = args.data;
  // check for optionsSchema
  if (optionsSchema) {
    let optionsSchemaKeys = Object.keys(optionsSchema);
    // if options is null/undefined
    if (!options) {
      throw new Error(`Missing required options: ${optionsSchemaKeys.join(', ')}`);
    }
    // if options is NOT null/undefined
    let missingOptions = [];
    for (let i = 0; i < optionsSchemaKeys.length; i++) {
      if(!options[optionsSchemaKeys[i]]) {
        missingOptions.push(optionsSchemaKeys[i]);
      }
    }
    if (missingOptions.length > 0) {
      throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
    }
  }

  // checks succeeded
  return await context.prisma.createFunc({
    ...args.data,
    createdBy: { connect: { id: context.user.id } }
  });
}
