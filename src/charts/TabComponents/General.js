import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input } from '@material-ui/core';

export default () => {
  const [title, setTitle] = useState('');
  const [interval, setInterval] = useState();
  const [icon, setIcon] = useState('');
  const [publicUrl, setPublicUrl] = useState('');
  const [xaxis, setXAxis] = useState('');
  const [yaxis, setYAxis] = useState('');
  return (
    <div>
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
          onChange={e => setInterval(Number(e.target.value))}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="icon">Uplaod Icon</InputLabel>
        <Input type="file" id="icon" name="icon" autoFocus 
          value={icon}
          onChange={e => setIcon(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="url">Public Url</InputLabel>
        <Input type="text" id="setPublicUrl" name="setPublicUrl" autoFocus 
          value={publicUrl}
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
