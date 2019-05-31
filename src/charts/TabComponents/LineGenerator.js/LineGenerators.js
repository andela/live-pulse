import React, { useState } from 'react'
import { Paper, TextField, Button, Select, MenuItem, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default () => {
  const [showLineText, setShowLineText] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDataSource, setShowDataSource] = useState(false);
  const [DataSourceProps, setDataSourceProps] = useState({});

  const useStyles = () =>  ({ 
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'red',
    },
  });
  
    const classes = useStyles();
  
    const handleListItemClick = (event, index, dataValue) => {
      setSelectedIndex(index);
      setDataSourceProps(dataValue);
      setShowDataSource(true);
    }

    const DatasourceComponent = () => (
      <React.Fragment>
        <Grid item xs={4}>
          <Typography>Data source</Typography>
          <Select
            value={DataSourceProps.name}
            onChange={() => console.log(DataSourceProps.name)}
          >
            <MenuItem>{DataSourceProps.name}</MenuItem>
            <MenuItem>github</MenuItem>
            <MenuItem>slack</MenuItem>
          </Select>
        </Grid>
        <HooksComponent />
        </React.Fragment>
    );

    const HooksComponent = () => (
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
    );

    const AddNewLine = () => (
      <form onSubmit={() => (console.log('line added'), setShowLineText(false))}>
        <TextField
        label="Line Text"
      />
      </form>
      
    );

  return (
    <div className={classes.root}>
      <Grid container item xs={12} spacing={16}>
        <Grid item xs={4}>
          <List>
            <ListItem 
              button
              selected={selectedIndex === 1}
              onClick={
                event => handleListItemClick(
                event, 1, {name: 'second line'}
                )
              }
            >
              <ListItemText primary="A line" />
            </ListItem>
            <ListItem 
              button
              selected={selectedIndex === 2}
              onClick={event => handleListItemClick(event, 2, {name: '3rd line'})}
            >
              <ListItemText primary="A line" />
            </ListItem>
            { showLineText ? <AddNewLine /> : null }
        </List>
        <Button onClick={() => setShowLineText(true)}>
          <AddIcon /> Add Line
        </Button>
        </Grid>
        { showDataSource ? (
            <DatasourceComponent />
          ) : 
          null 
        }
        
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
