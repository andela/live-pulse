import { gql } from 'apollo-boost';

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
