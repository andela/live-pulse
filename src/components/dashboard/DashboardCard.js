import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DashboardSingleView from './DashboardSingleView';

const styles = () => ({
  card: { minWidth: 100, margin: 12 },
  title: { fontSize: 14 },
  interval: { fontSize: 10,}
})

const showDashboard = (dashboard) => {
  return (
    <DashboardSingleView dashboad={dashboard} />
  );
}

/**
 * Card component for displaying created dashboards.
 */
const DashboardCard = (props) => {
  const { dashboard, classes } = props;
  const { id, title, updateInterval, updatedAt } = dashboard;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="h3">{title}</Typography>
        <Divider />
        <Typography className={classes.title}>{updateInterval}</Typography>
      </CardContent>
      <CardActions>
        <Link size="small" color="primary" 
          to={`dashboard/${id}/${title}/${updateInterval}/${updatedAt}`}>
          view
        </Link>
        <Typography className={classes.interval} color="textSecondary">{updatedAt}</Typography>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(DashboardCard);
