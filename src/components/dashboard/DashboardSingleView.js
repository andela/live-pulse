import React from 'react';
import { createBrowserHistory } from 'history';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styles } from '../../appStyle';
import GraphModal from '../graph/GraphModal';
import { Paper, Grid, Card, Select, OutlinedInput, MenuItem, Button } from '@material-ui/core';

import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { employmentOption } from '../../HighChartSamples';

const history = createBrowserHistory();


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
            <div style={{ display: 'flex' }}>
              <Paper style={{ maxWidth: 300 }} variant="h6" color="textSecondary" >
                Dashboard: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.title} </span> <br />
                Update Interval: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.updateInt}</span> <br />
                Date updated: <span style={{fontSize: 15, color: 'grey'}} color="textSecondary">{match.params.date}</span>
              </Paper>
              <GraphModal />
            </div>
            <Typography style={{ marginTop:20}} variant="h3" color="textSecondary">Graphs</Typography>
          </div>
          <Grid  item xs="auto">
            <Select style={{ minWidth: 200}}
              input={
                <OutlinedInput
                  labelWidth="auto"
                  name="age"
                  id="outlined-age-simple"
                />
              }
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
              {/* List of Graphs attached to this dashboard */}
              <HighChartsReact highcharts={Highcharts} options={employmentOption} />
          </Grid>
        </main>
    </div>
  )
}

export default withStyles(styles)(DashboardSingleView);
