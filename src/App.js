import React from 'react';
import PropTypes from 'prop-types';
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
import { styles } from './appStyle';

// import Highcharts from 'highcharts';
// import HighChartsReact from 'highcharts-react-official';
// import { employmentOption } from './HighChartSamples';
import { AUTH_TOKEN } from './constants';
import DashboardModal from './components/dashboard/DashboardModal';
import DashboardList from './components/dashboard/DashboardList';

// import { mainListItems, secondaryListItems } from './listItems';
// import SimpleLineChart from './SimpleLineChart';
// import SimpleTable from './SimpleTable';


class App extends React.Component {
  constructor(props) {
    super(props);
    // check if user has token else redirect to login page
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (!authToken) {
      window.location.href = '/'
    }
  }

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        > 
        {/* Header menu-tool bar */}
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboards
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              =
            </IconButton>
          </div>
          <Divider />
          <List>Menu list</List>
          <Divider />
          <List></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div> {/* Dashboard Modal button and form */}
            <Typography variant="h4" color="textSecondary" >My Dashboards</Typography>
            <DashboardModal /> 
          </div>
          <Typography component="div" className={classes.chartContainer}>
            <DashboardList /> {/* List of Dashboards owned by a user */}
            {/* <HighChartsReact highcharts={Highcharts} options={employmentOption} />  Higchart component */}
          </Typography>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
