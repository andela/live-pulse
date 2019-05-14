import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: { minWidth: 100, margin: 12 },
  title: { fontSize: 14 },
  interval: { fontSize: 10,}
})

const DashboardCard = (props) => {
  const { dashboard, classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">Title</Typography>
        <Divider />
        <Typography className={classes.title}>{dashboard.title}</Typography>
        <Typography className={classes.title}>{dashboard.updateInterval}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">view</Button>
        <Typography className={classes.interval} color="textSecondary">{dashboard.updatedAt}</Typography>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(DashboardCard);
