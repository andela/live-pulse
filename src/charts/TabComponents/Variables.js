import React, { useState } from 'react'
import { FormControl, InputLabel, Button, Input, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { UPDATE_GRAPH_VARIABLES_MUTATION } from '../../mutations/graphMutation';

export default (graphData) => {
  const { id, variables } = graphData.graphData;
  
  let _key1 = '';
  let _key2 = '';
  let _key3 = '';

  let _value1 = '';
  let _value2 = '';
  let _value3 = '';

  // convert object to arrays.
  let arrVariables;
  if(variables) {
    arrVariables = Object.entries(variables).map(arrv => ({[arrv[0]]: arrv[1]}) );
    _key1 = Object.keys(arrVariables[0]).map(key => [key].toString());
    _key2 = Object.keys(arrVariables[1]).map(key => [key].toString());
    _key3 = Object.keys(arrVariables[2]).map(key => [key].toString());
    _value1 = Object.keys(arrVariables[0]).map(key => arrVariables[0][key].toString());
    _value2 = Object.keys(arrVariables[1]).map(key => arrVariables[1][key].toString());
    _value3 = Object.keys(arrVariables[2]).map(key => arrVariables[2][key].toString());
  }

  const [key1, setKey1] = useState(_key1);
  const [key2, setKey2] = useState(_key2);
  const [key3, setKey3] = useState(_key3);

  const [value1, setValue1] = useState(_value1);
  const [value2, setValue2] = useState(_value2);
  const [value3, setValue3] = useState(_value3);

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
                <InputLabel htmlFor="key1">Key1</InputLabel>
                <Input type="text" id="key1" name="key1" autoFocus required 
                  value={key1}
                  onChange={e => setKey1(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="value1">Value</InputLabel>
                <Input type="text" id="value1" name="value1" autoFocus required 
                  value={value1}
                  onChange={e => setValue1(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="key2">Key2</InputLabel>
                <Input type="text" id="key2" name="key2" autoFocus required 
                  value={key2}
                  onChange={e => setKey2(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="value2">Value</InputLabel>
                <Input type="text" id="value2" name="value2" autoFocus required 
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="key3">Key3</InputLabel>
                <Input type="text" id="key3" name="key3" autoFocus required 
                  value={key3}
                  onChange={e => setKey3(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="value3">Value</InputLabel>
                <Input type="text" id="value3" name="value3" autoFocus required 
                  value={value3}
                  onChange={e => setValue3(e.target.value)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Mutation
        mutation={UPDATE_GRAPH_VARIABLES_MUTATION}
        variables={{
          id,
          data: {
            variables : {
              [key1]: value1,
              [key2]: value2,
              [key3]: value3,
            }
          }
        }}
        onCompleted={() => window.alert('updated successful')}
        onError={error => console.log(error)}
      >
        {updateVariables => (
          <Button color="primary" onClick={updateVariables}>
            Update
          </Button>
        )}
      </Mutation>
    </div>
  )
}
