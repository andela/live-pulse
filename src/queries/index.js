import gql from "graphql-tag";

/**
 * get lists of Dashboards from an authenticated user
 */
export const DASHBOARDS_QUERY = gql`
query dashboards ($uid: ID!) {
  dashboards (where: { createdBy: { id:$uid } }) {
    id,
    title,
    icon,
    updatedAt,
    updateInterval
  }
}
`;

export const DASHBOARD_QUERY = gql`
query dashboard ($id: ID!) {
  dashboard (id:  $id) {
    id,
    title,
    graphs {
      id,
      title,
      updateTime,
      updateInterval,
      xAxisLabel,
      yAxisLabel,
      lineGenerators {
        id,
        name,
        color,
        state,
        line {
          id,
          points {
            id,
            x,
            y,
            hidden
          }
        }
      }
    }
  }
}
`;
