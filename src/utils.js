import jwt from 'jsonwebtoken';

const APP_SECRET = 'GraphQL-is-aw3some';

export default {
  APP_SECRET,
  getUserId: async (context) => {
    const Authorization = context.request.get('Authorization');

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token, APP_SECRET);
      return userId;
    }

    throw new Error('Not authenticated');
  }
}
