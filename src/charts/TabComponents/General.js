import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { UPDATE_GRAPH_GENERAL_MUTATION } from '../../mutations/graphMutation';

export default (graphData) => {
  const {
    id, 
    title,
    xAxisLabel,
    yAxisLabel,
    updateInterval,
  } = graphData.graphData;
  const [newTitle, setTitle] = useState(title);
  const [newInterval, setInterval] = useState(updateInterval || '');
  const [xaxis, setXAxis] = useState(xAxisLabel || '');
  const [yaxis, setYAxis] = useState(yAxisLabel || '');
  
  return (
    <div>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="title">title</InputLabel>
        <Input type="text" id="title" name="title" autoFocus required 
          value={newTitle}
          onChange={e => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="interval">Interval in minutes</InputLabel>
        <Input type="number" id="interval" name="interval" autoFocus required 
          value={newInterval}
          onChange={e => setInterval(Number(e.target.value))}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="xaxis">xAxisLabel</InputLabel>
        <Input type="text" id="xaxis" name="xaxis" autoFocus 
          value={xaxis}
          onChange={e => setXAxis(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="yaxis">yAxisLabel</InputLabel>
        <Input type="text" id="yaxis" name="yaxis" autoFocus 
          value={yaxis}
          onChange={e => setYAxis(e.target.value)}
        />
      </FormControl>
      <Mutation
        mutation={UPDATE_GRAPH_GENERAL_MUTATION}
        variables={{
          id,
          data: {
            title: newTitle,
            updateInterval: newInterval,
            xAxisLabel: xaxis,
            yAxisLabel: yaxis
          }
        }}
        onCompleted={() => window.alert('updated successful')}
        onError={error => console.log(error)}
      >
        {(updateGeneral, {data, loading, error}) => (
          <Button color="primary"
            onClick={updateGeneral}
          >
            Update
          </Button>
        )}
      </Mutation>
    </div>
  )
}
