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
  mutation createDashboard ($title: String!, $updateInterval: Int, $icon: String) {
    createDashboard (data: {
      title:$title,
      updateInterval:$updateInterval,
      icon:$icon
    })
    {
      id,
      title,
      updateInterval,
      updatedAt
    }
  }
`;

/**
 * hanles graph creating mutation to the server
 * @param title [string] - required, to be suplied to the mutation handler
 * @param updateInterval [integer]
 * 
 * @returns created graph
 */
export const GRAPH_MUTATION = gql`
  mutation createGraph($dashboardId:ID! $data:GraphUpdateInput!) {
    createGraph (dashboardId:$dashboardId, data:$data) {
      id,
      title,
      updateInterval,
      xAxisLabel,
      yAxisLabel,
      publicUrl,
      updateTime
    }
  }
`;
