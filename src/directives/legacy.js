const hasRole = async (next, source, {roles}, context, info) => {
  if (context.user && roles.includes(context.user.role)) {
    return next();
  }
  throw new Error(`User must have one of the following roles: ${roles.join(', ')}`);
}

const isOwner = async (next, source, {resource, id}, context, info) => {
  let resourceId;
  let resourceIdArg = info.fieldNodes[0].arguments.find(a => a.name.value === id);
  if (resourceIdArg.value.kind === 'StringValue') {
    resourceId = resourceIdArg.value.value;
  } else if (resourceIdArg.value.kind === 'Variable') {
    resourceId = info.variableValues[id];
  }
  let owner;
  if (resource.toLowerCase() === 'dashboard') {
    owner = await context.prisma.dashboard({ id: resourceId }).createdBy();
  } else if (resource.toLowerCase() === 'functioncontext') {
    owner = await context.prisma.functionContext({ id: resourceId }).createdBy();
  } else if (resource.toLowerCase() === 'graph') {
    owner = await context.prisma.graph({ id: resourceId }).createdBy();
  } else if (resource.toLowerCase() === 'linegenerator') {
    owner = await context.prisma.lineGenerator({ id: resourceId }).createdBy();
  }
  if (context.user && owner && context.user.id === owner.id) {
    return next();
  }
  throw new Error(`User must be the owner of the ${resource.toLowerCase()}.`);
}

export default {
  hasRole,
  isOwner
}
