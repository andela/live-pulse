import React, { useState } from 'react'
import { Paper, Button, Input, Select, MenuItem, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default () => {
  const [color, setColor] = useState('');
  const [lgName, setLGName] = useState();
  const [lgState, setLGState] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(1);

  const useStyles = () => ({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'red',
    },
  });
  
    const classes = useStyles();
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    }

  return (
    <div className={classes.root}>
      <Grid container item xs={12} spacing={16}>
        <Grid item xs={4}>
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
        <Button >
          <AddIcon /> Add Line
        </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography>Data source</Typography>
          <Select>
            <MenuItem>gitprime</MenuItem>
            <MenuItem>github</MenuItem>
            <MenuItem>slack</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography>Hooks</Typography>
          <Paper>
            <Select>
              <MenuItem>hook</MenuItem>
              <MenuItem>github</MenuItem>
              <MenuItem>slack</MenuItem>
            </Select>
          </Paper>
          <Paper>
            <Select>
              <MenuItem>gitprime</MenuItem>
              <MenuItem>github</MenuItem>
              <MenuItem>slack</MenuItem>
            </Select>
          </Paper>
        </Grid>
      </Grid>
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
