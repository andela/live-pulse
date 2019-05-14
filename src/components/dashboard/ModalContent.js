import React from 'react'
import { FormControl, InputLabel, Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

const ModalContent = (props) => {
  const { classes } = props;
  return (
    <div style={getModalStyle()} className={classes.paper}>
      <div className={classes.form}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="title">title</InputLabel>
          <Input type="text" id="title" name="title" autoFocus required />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="interval">Interval in minutes</InputLabel>
          <Input type="number" id="interval" name="interval" required />
        </FormControl>
        <Button color="primary"> create dashboard</Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(ModalContent)