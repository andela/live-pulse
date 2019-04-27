import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from 'graphql-tools';

export default class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field._auth = "YES";
    this.ensureFieldsWrapped(details.objectType);
  }

  visitObject(type) {
    type._auth = "YES";
    this.ensureFieldsWrapped(type);
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping
    if (objectType._fieldsWrapped) return;
    objectType._fieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        // Get the auth flag from the field first, falling back
        // to the objectType if no Role is required by the field
        const auth = field._auth || objectType._auth;

        if (!auth) {
          return resolve.apply(this, args);
        }

        const [, , context] = args;
        if (context.user) {
          return resolve.apply(this, args);
        } else {
          throw new Error(`User must be authenticated.`);
        }
      }
    });
  }
}
