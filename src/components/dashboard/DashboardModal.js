import React, { useState } from 'react'
import { Modal, Button } from '@material-ui/core';

import DashModalElement from './DashModalElement';

const DashboardModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary" size="large">
        Add graph 
      </Button>
      <Modal
      arial-labelledby="Create Dashboard"
      arial-describedby="Create a new Dashboard"
      open={open}
      onClose={() => setOpen(!open)}
    >
      <DashModalElement />
    </Modal>
    </div>
    
  );
}

export default DashboardModal;
