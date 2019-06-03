import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

export default (graphData) => {
  const [title, setTitle] = useState('');
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">title</InputLabel>
                <Input type="text" id="title" name="title" autoFocus required 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button color="primary">
        Update
      </Button>
    </div>
  )
}
