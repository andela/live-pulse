import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input, Select, MenuItem } from '@material-ui/core';

export default () => {
  const [color, setColor] = useState('');
  const [lgName, setLGName] = useState();
  const [lgState, setLGState] = useState('');
  return (
    <div>
      <FormControl margin="normal" required fullWidth>
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
      </FormControl>
      <Button color="primary">
        Update
      </Button>
    </div>
  )
}
