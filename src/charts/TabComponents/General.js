import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input } from '@material-ui/core';

export default (graphData) => {
  const { 
    title,
    icon,
    publicUrl,
    xAxisLabel,
    yAxisLabel,
    updateInterval,
  } = graphData.graphData;
  const [newTitle, setTitle] = useState(title);
  const [newInterval, setInterval] = useState(updateInterval || '');
  const [newIcon, setIcon] = useState(icon || '');
  const [newPublicUrl, setPublicUrl] = useState(publicUrl || '');
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
        <InputLabel htmlFor="icon">Uplaod Icon</InputLabel>
        <Input type="file" id="icon" name="icon" autoFocus 
          value={newIcon}
          onChange={e => setIcon(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="url">Public Url</InputLabel>
        <Input type="text" id="setPublicUrl" name="setPublicUrl" autoFocus 
          value={newPublicUrl}
          onChange={e => setPublicUrl(e.target.value)}
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
      <Button color="primary">
        Update
      </Button>
    </div>
  )
}
