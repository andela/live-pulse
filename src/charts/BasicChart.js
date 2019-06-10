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
  const { line } = lineGenerators;
  
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

  //   series:
  //   lineGenerators.map(lineGenerator => (
  //   `name: ${lineGenerator.name}`,
  //   lineGenerator.line.map(line => (
  //     `data: ${line.points.y}`
  //   ))
  // ))
   
    series: [
    {
      name: 'data.graph.lineGenerators.name',
      data: [945, 264, 292, 51, 490, 3282, 321, 44]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
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
