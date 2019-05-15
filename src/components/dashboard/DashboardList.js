import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardCard from './DashboardCard';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import { DASHBOARDS_QUERY } from '../../queries';

const styles = () => ({
  root: { flexGrow: 1 },
});

/**
 * An iterable component to display a list of queried dashboards
 * for an authenticated user
 */
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
          <Query query={DASHBOARDS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <Typography>Fetching...</Typography>
              if (error) return <Typography>Error! no dashboard created yet.</Typography>
              
              const dashboards = data.dashboards;
              return (
                <Grid container spacing={16} justify="center">
                  {dashboards.map(dashboard => (
                    <Grid key={dashboard.id} item xs="auto">
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
