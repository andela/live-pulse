import React, { useState } from 'react'
import { Modal, Button } from '@material-ui/core';
import ModalContent from './ModalContent';

const GraphModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ textAlign: 'right', }}>
      <Button
        onClick={() => setOpen(true)} 
        variant="contained" 
        color="primary" 
        size="large">
        Create Graph 
      </Button>
      <Modal
        arial-labelledby="Create Graph"
        arial-describedby="Create a new Graph data"
        open={open}
        onClose={() => setOpen(!open)}>
        <ModalContent />
      </Modal>
    </div>
    
  );
}

export default GraphModal;
