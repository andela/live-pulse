import React from 'react'
import { DialogTitle, DialogContent } from '@material-ui/core';
import TabContainer from './TabComponents/TabContainer';

const PreferenceDialog = () => {  
  return (
    <div>
      <DialogTitle id="form-dialog-title">Configure Graph</DialogTitle>
          <DialogContent>
            <TabContainer />              
          </DialogContent>
    </div>
  )

}

export default PreferenceDialog;
