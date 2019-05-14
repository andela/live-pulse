import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from 'react-apollo';
import { DASHBOARD_MUTATION } from '../../mutations/dashboardMutations';
import { DASHBOARDS_QUERY } from '../../queries';

const rand = () => {
   return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'relative',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
});

const [title, setTitle] = useState('');
const [interval, setInterval] = useState(15);
const [icon, setIcon] = useState('');

const ModalContent = (props) => {
  const { classes } = props;
  return (
    <div style={getModalStyle()} className={classes.paper}>
      <div className={classes.form}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="title">title</InputLabel>
          <Input type="text" id="title" name="title" autoFocus required 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="interval">Interval in minutes</InputLabel>
          <Input type="number" id="interval" name="interval" autoFocus required 
            value={interval}
            onChange={e => setInterval(e.target.vale)}
          />
        </FormControl>
        <Mutation
          mutation={DASHBOARD_MUTATION}
          variables={{ title, updateInterval:interval, icon}}
          onError={error => handleError(error)}
          update={( store, { data: { dashboards } }) => {
            const data = store.readQuery({ query: DASHBOARDS_QUERY})
            data.dashboards.unshift(dashboards)
            store.writeQuery({
              query: DASHBOARDS_QUERY,
              data
            })
          }}
        >
          {createDashboardMutation => (
            <Button
              color="primary"
              onClick={createDashboardMutation}
            >
              create dashboard
            </Button>
          )}
        </Mutation>
      </div>
    </div>
  )
}

const handleError = async error => {
  console.log(error);
}

export default withStyles(styles)(ModalContent)
