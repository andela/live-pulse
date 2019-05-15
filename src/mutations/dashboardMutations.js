import gql from "graphql-tag";

/**
 * hanles dashboard creating mutation to the server
 * @param title [string] - required, to be suplied to the mutation handler
 * @param updateInterval [integer]
 * @param icon [string]
 * 
 * @returns created dashboard
 */
export const DASHBOARD_MUTATION = gql`
  mutation createDashboard ($title: String!, $upInt: Int, $icon: String) {
    createDashboard (data: {
      title:$title
      updateInterval:$upInt
      icon:$icon
    })
    {
      id,
      title,
      updateInterval,
      updatedAt
    }
  }
`
