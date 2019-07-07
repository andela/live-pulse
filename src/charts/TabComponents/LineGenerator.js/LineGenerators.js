import React, { useState } from 'react'
import { Input, Button, Select, MenuItem, List, ListItem, ListItemText, Typography, Grid, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CREATE_GRAPH_LINE_G_MUTATION } from '../../../mutations/graphMutation';
import { Mutation, Query } from 'react-apollo';
import { GET_FUNCTIONS } from '../../../queries';

export default (graphData) => {
  const { id, lineGenerators } = graphData.graphData;

  const [showLineText, setShowLineText] = useState(false);
  const [newLineText, setNewLineText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDataSource, setShowDataSource] = useState(false);
  const [DataSourceProps, setDataSourceProps] = useState(lineGenerators.dataSource ? lineGenerators.dataSource.func.id : 'None');
  const [HooksProps, setHooksProps] = useState(lineGenerators.dataSource ? lineGenerators.dataSource.func.id : 'None');

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

    const DatasourceComponent = () => {
      return (
        <React.Fragment>
        <Grid item xs={4}>
          <Typography>Data source</Typography>
          <em> {lineGenerators.dataSource ? lineGenerators.dataSource.func.name : 'no datasource' } </em>
          <Query query={GET_FUNCTIONS}>
              {({ loading, error, data}) => {
                if(data.funcs) return (
                  <Select
                    value={DataSourceProps}
                    onChange={e => setDataSourceProps(e.target.value)}
                  >
                    {data.funcs.map(func => (
                      <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                    ))}
                  </Select>
                )
                return ( <MenuItem value={DataSourceProps}></MenuItem> )
              }}
            </Query>
        </Grid>
        <HooksComponent />
        </React.Fragment>
      );
    };

    const HooksComponent = () => (
      <Grid item xs={4}>
        <Typography>Hooks</Typography>
        <em> {lineGenerators.dataSource ? lineGenerators.dataSource.func.name : 'no hooks' } </em>
          <Query query={GET_FUNCTIONS}>
              {({ loading, error, data}) => {
                if(data.funcs) return (
                  <div>
                    <Select
                    value={HooksProps}
                    onChange={e => setHooksProps(e.target.value)}
                    >
                      {data.funcs.map(func => (
                        <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                      ))}
                    </Select>
                    <Select
                      value={HooksProps}
                      onChange={e => setHooksProps(e.target.value)}
                    >
                      {data.funcs.map(func => (
                        <MenuItem key={func.id} value={func.id}>{func.name}</MenuItem>
                      ))}
                    </Select>
                  </div>
                )
                return ( <MenuItem value={HooksProps}></MenuItem> )
              }}
            </Query>
      </Grid>
    );
    
    const AddNewLineComponent = () => (
      <Mutation mutation={CREATE_GRAPH_LINE_G_MUTATION}
        variables={{
          graphId: id,
          data: {
            name: newLineText,
            color: '#000000'
          }
        }}
      >
        {(lineGenerator, {data, loading, error}) => (
          <form onSubmit={e => {
            e.preventDefault();
            lineGenerator();
          }}>
            <Input type="text" id="newline" name="newline" autoFocus 
              value={newLineText}
              onChange={e => setNewLineText(e.target.value)}
            />
            {loading && console.log('loading')}
            {data &&  setShowLineText(false)}
            {error && console.log(error)}
          </form>
        )}
      </Mutation>
    );

  return (
    <div className={classes.root}>
      <Grid container item xs={12} spacing={16}>
        <Grid item xs={4}>
          <List>
            {lineGenerators && lineGenerators.map(line => (
              <ListItem 
                button
                selected={selectedIndex === line.id}
                onClick={
                  event => handleListItemClick(
                  event, line.id, {name: line.name, id: line.id}
                  )
                }
                key={line.id}
              >
              <ListItemText primary={line.name} />
            </ListItem>
            ))}
            { showLineText ? <AddNewLineComponent /> : null }
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
