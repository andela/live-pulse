import { gql } from 'apollo-boost';

/**
 * hanles user signup mutation to the server
 * @param email - required, to be suplied to the mutation handler
 * @param password - required, to be suplied to the mutation handler
 * @param data: { confirmEmail } required, to be suplied to the mutation handler
 * 
 * @returns user{object} & dashboards associated with the user;
 */
export const SIGNUP_MUTATION = gql `
  mutation signup ($email: String!, $password: String!, $data: UserUpdateInput!) {
    signUp (email:$email, password:$password, data: $data) {
      token,
      user {
        email,
        displayName,
        updatedAt,
        dashboards {
          icon,
          publicUrl,
          title
        }
      }
    }
  }
`

/**
 * hanles user signin mutation to the server
 * @param email - required, to be suplied to the mutation handler
 * @param password - required, to be suplied to the mutation handler
 * @returns user{object} & dashboards associated with the user;
 */
export const SIGNIN_MUTATION = gql`
  mutation signin ($email: String!, $password: String!) {
    signIn (email:$email, password:$password) {
      token,
      user {
        email,
        displayName,
        dashboards {
          icon,
          publicUrl,
          title
        }
        updatedAt
      }
    }
  }
`
