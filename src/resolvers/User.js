import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  dashboards: async (root, args, context, info) => await context.prisma.user({ id: root.id }).dashboards(),
  funcs: async (root, args, context, info) => await context.prisma.user({ id: root.id }).funcs(),
  functionContexts: async (root, args, context, info) => await context.prisma.user({ id: root.id }).functionContexts(),
  graphs: async (root, args, context, info) => await context.prisma.user({ id: root.id }).graphs(),
  lineGenerators: async (root, args, context, info) => await context.prisma.user({ id: root.id }).lineGenerators(),
  settings: async (root, args, context, info) => await context.prisma.user({ id: root.id }).settings(),
  signedInUser: async (root, args, context, info) => context.user,
  signIn: async (root, args, context, info) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user,
    }
  },
  signUp: async (root, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    // if there's no ADMIN in the system, make this user an ADMIN
    let role = 'MEMBER';
    const adminExists = await context.prisma.$exists.user({
      role: 'ADMIN'
    });
    if (!adminExists) {
      role = 'ADMIN';
    }

    const user = await context.prisma.createUser({
      email: args.email,
      ...args.data,
      displayName: args.data.displayName || args.email,
      password,
      role
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user,
    }
  },
  user: async (root, args, context, info) => await context.prisma.user(args),
  users: async (root, args, context, info) => await context.prisma.users(args),
}
