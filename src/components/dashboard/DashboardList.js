import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardCard from './DashboardCard';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';

const styles = () => ({
  root: { flexGrow: 1 },
});

const DASHBOARD_QUERYS = gql`
  {
    dashboards {
      title,
      icon,
      updatedAt,
      updateInterval
    }
  }
`;

class DashboardList extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Query query={DASHBOARD_QUERYS}>
            {({ loading, error, data }) => {
              if (loading) return <Typography>Fetching...</Typography>
              if (error) return <Typography>Error! no dashboard created yet.</Typography>
              
              const dashboards = data.dashboards;
              return (
                <Grid container spacing={16} justify="center">
                  {dashboards.map(dashboard => (
                    <Grid item xs={4}>
                      <DashboardCard key={dashboard.id} dashboard={dashboard} />
                    </Grid>
                  ))}
                </Grid>
              )
            }}
          </Query>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DashboardList);
