import React, { useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardHeader, IconButton, Menu, MenuItem, Dialog } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PreferenceDialog from './PreferenceDialog';

const BasicChart = ({data}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  if(data === null ){
    return (
      <div>
        No charts data
      </div>
    )
  }else {
  
  const { lineGenerators } = data.graph;
  //const { line } = lineGenerators;
  
  const chartOptions = {
    title: {
      text: data.graph.title
    },
    yAxis: {
      title: {
        text: data.graph.yAxisLabel
      }
    },
    xAxis: {
      title: {
        text: data.graph.xAxisLabel
      }
    },

    series: lineGenerators.map(lineGenerator => (
      {
        name: lineGenerator.name,
        data: [945, 264, 292, 51, 490, 3282, 321, 44]
      }
    )),
  }

  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const MenuAction = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  }

  

  const open = Boolean(anchorEl);
  return (
    <Card>
      <CardHeader 
        action={
          <IconButton onClick={showMenu} 
            aria-label="More" 
            aria-haspopup={true}
            aria-owns={open ? 'long-menu' : undefined}
            >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        open={open}
        onClose={closeMenu}
        anchorEl={anchorEl}
        >
        <MenuItem onClick={() => MenuAction()}>Settings</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
      {/* Preference Dialog JSX */}
      <div>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="preference dialog"
        >
          <PreferenceDialog graphData={data} />
        </Dialog>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Card>
  )
  }
}

export default BasicChart;
