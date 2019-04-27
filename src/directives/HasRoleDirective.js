import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from 'graphql-tools';

export default class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    field._roles = this.args.roles;
    this.ensureFieldsWrapped(details.objectType);
  }

  visitObject(type) {
    type._roles = this.args.roles;
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
        // Get the required Roles from the field first, falling back
        // to the objectType if no Role is required by the field
        const roles = field._roles || objectType._roles;

        if (!roles) {
          return resolve.apply(this, args);
        }

        const [, , context] = args;
        if (context.user && roles.includes(context.user.role)) {
          return resolve.apply(this, args);
        } else {
          throw new Error(
            `User must have one of the following roles: ${roles.join(', ')}`
          );
        }
      }
    });
  }
}
