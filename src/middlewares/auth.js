import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  authentication: async (resolve, root, args, context, info) => {
    if (!context.user) {
      const Authorization = context.request.get('Authorization');
      let user = null;
      if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        if (userId) {
          user = await context.prisma.user({ id: userId });
        }
      }
      context.user = user;
    }
    return await resolve(root, args, context, info);
  }
}