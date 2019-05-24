import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

export default () => {
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
