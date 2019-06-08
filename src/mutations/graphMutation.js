import gql from "graphql-tag";

/**
 * Update graph's general properties
 */
export const UPDATE_GRAPH_GENERAL_MUTATION = gql`
  mutation updateGeneral($id:ID!, $data:GraphUpdateInput!) {
    updateGraph(id:$id, data:$data) {
      id,
      title,
      updateInterval,
      xAxisLabel,
      yAxisLabel
    }
  }
`;

/**
 * Updates graph's Viaribles properties
 */
export const UPDATE_GRAPH_VARIABLES_MUTATION = gql`
mutation updateVariables($id:ID!, $data:GraphUpdateInput!) {
  updateGraph(id:$id, data:$data) {
    variables
  }
}
`;

/**
 * Update graph's LineGenerator properties
 */
// export const UPDATE_GRAPH_LINE_G_MUTATION = gql`
//   mutation 
// `;
