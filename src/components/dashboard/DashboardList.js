import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardCard from './DashboardCard';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: { flexGrow: 1 },
});

const DASHBOARD_QUERY = gql`
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
  constructor(props) {
    super(props);
    this.state = {
      iterate: ['a', 'b', 'c']
    }
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Query query={DASHBOARD_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <Typography>Fetching...</Typography>
              if (error) return <Typography>Error! no dashboard created yet.</Typography>
              
              const dashboards = data.dashboards;
              return (
                <Grid container spacing={16} justify="center" spacing={Number(spacing)}>
                  {dashboards.map(dashboard => (
                    <Grid item xs={4}>
                      <DashboardCard key={dashboard.id} dashboard={dashboard} />
                    </Grid>
                  ))}
                </Grid>
              )
            }}
            {/* {iterate.map(value => (
              <Grid item xs={4}>
                <DashboardCard key={value} val={value} />
              </Grid>
            ))} */}
          </Query>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DashboardList);
