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

/**
 * Get a single dashboard data.
 * @param $id
 * @returns Dashboard data.
 */
export const GET_DASHBOARD_QUERY = gql`
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

/**
 * Get a single graph data from the 
 * @param $id - graph ID
 * @returns - Complete Graph data with [Lines, dataSource, Hooks]
 */
export const GET_GRAPH_QUERY = gql`
  query graph ($id: ID!) {
    graph(id: $id) {
      id,
      title,
      icon,
      publicUrl,
      xAxisLabel,
      yAxisLabel,
      updateInterval,
      updateTime,
      variables,
      lineGenerators {
        id,
        color,
        name,
        state,
        line {
          points {
            x
            y
          }
        }
        dataSource {
          id,
          func {
            id,
            name,
            description,
            source,
            type
          }
        },
        hooks {
          id,
          func {
            id,
            name,
            description,
            source,
            type
          }
        }
      }
    }
  }
`;
