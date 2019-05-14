import gql from "graphql-tag";

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
