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
    const { classes, user } = this.props;
    return (
      <Grid className={classes.root} spacing={16}>
        <Grid >
          <Query query={DASHBOARDS_QUERY} variables={{uid:user}}>
            {({ loading, error, data }) => {
              if (loading) return <Typography>Fetching...</Typography>
              if (error) return <Typography>Error! no dashboard created yet.</Typography>
              
              const dashboards = data.dashboards;
              return (
                <Grid container item xs={12}>
                  {dashboards.map(dashboard => (
                    <Grid key={dashboard.id} item xs={4}>
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
