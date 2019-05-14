import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardCard from './DashboardCard';

const styles = theme => ({
  root: { flexGrow: 1 },
});


class DashboardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iterate: ['a', 'b', 'c']
    }
  }

  render() {
    const { classes } = this.props;
    const { iterate, spacing } = this.state;
    
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container spacing={16} justify="center" spacing={Number(spacing)} >
            {iterate.map(value => (
              <Grid item xs={4}>
                <DashboardCard key={value} val={value} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DashboardList);
