import React from 'react';
import { createBrowserHistory } from 'history';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { styles } from '../../appStyle';
import GraphModal from '../graph/GraphModal';
import { Paper, Grid, Select, OutlinedInput, MenuItem, Button } from '@material-ui/core';

import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { employmentOption } from '../../HighChartSamples';
import { Query } from 'react-apollo';
import { DASHBOARD_QUERY } from '../../queries';

const history = createBrowserHistory();

let graphData;

const DashboardSingleView = (props) => {
  const { match, classes } = props
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar> 
      {/* Header menu-tool bar */}
        <Toolbar disableGutters={false} className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Live-Pulse
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ margin:20 }} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Button size="big" onClick={() => history.goBack()} color="primary">
           {`<< Back to Dashbaords`}
        </Button>
          <div> {/* Dashboard Modal button and form */}
            <div style={{ flexDirection: 'row'}}>
              <Paper style={{ maxWidth: 300 }} variant="h6" color="textSecondary" >
                Dashboard: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.title} </span> <br />
                Update Interval: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.updateInt}</span> <br />
                Date updated: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.date}</span>
              </Paper>
              <Typography> <GraphModal /> </Typography>
            </div>
            <Typography style={{ marginTop:20}} variant="h3" color="textSecondary">Graphs</Typography>
          </div>
          <Grid  item xs="auto">
            <Query query={DASHBOARD_QUERY} variables={{id: match.params.id}}>
              {({ loading, error, data }) => {
                if (loading) return <Typography>Fetching dashboard details...</Typography>
                if (error) return <Typography>Can't fetch graphs at this time, try again!</Typography>

                const graphs = data.dashboard.graphs;
                return (
                  <Select style={{ minWidth: 200}}
                    input={
                      <OutlinedInput
                        labelWidth="auto"
                        name="age"
                        id="outlined-age-simple"
                      />
                    }
                  >
                    {graphs.map(graph => (
                      <MenuItem key={graph.id} value={graph.id}>{graph.title}</MenuItem>
                    ))}
                  </Select>
                )
              }}
            </Query>
              {/* List of Graphs attached to this dashboard */}
              <HighChartsReact highcharts={Highcharts} options={employmentOption} />
          </Grid>
        </main>
    </div>
  )
}

export default withStyles(styles)(DashboardSingleView);
