import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input, Select, MenuItem, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default () => {
  const [color, setColor] = useState('');
  const [lgName, setLGName] = useState();
  const [lgState, setLGState] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(1);

  const useStyles = makeStyles => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'grey',
    },
  });
  
    const classes = useStyles();
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    }

  return (
    <div className={classes.root}>
      <List>
        <ListItem 
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemText primary="A line" />
        </ListItem>
        <ListItem 
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemText primary="A line" />
        </ListItem>
        <ListItem 
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemText primary="A line" />
        </ListItem>
      </List>
      {/* <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="title">Color</InputLabel>
        <Input type="text" id="color" name="color" autoFocus required 
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="lgName">Name</InputLabel>
        <Input type="text" id="lgName" name="lgName" autoFocus required 
          value={lgName}
          onChange={e => setLGName(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="state">State</InputLabel>
        <Select
          value={lgState}
          onChange={e => setLGState(e.target.value)}
          id="lgState" name="lgState" autoFocus
        >
          <MenuItem value={1}>Enabled</MenuItem>
          <MenuItem value={2}>Disabled</MenuItem>
          <MenuItem value={3}>Hidden</MenuItem>
        </Select>
      </FormControl> */}
    </div>
  )
}
